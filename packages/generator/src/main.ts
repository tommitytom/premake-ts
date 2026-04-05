import { OpenAI } from 'openai';
import { copyFileSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execPremake } from './util.ts';
import { extractFieldDocumentation, extractGlobalDocumentation, type IClass } from './documentation.ts';
import { generateLuaDefinitions } from './generate-lua.ts';
import { generateAllInterfaces } from './generate-ts.ts';
import { findMissingFields, loadData, saveData } from './load.ts';
import { convertExamplesToTypeScript, sanitizeFields } from './sanitize.ts';
import type { DocumentedField, SanitizedField } from './types.ts';
import { bundleTypes } from './bundle-types.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LLM_TOKEN = process.env.LLM_TOKEN = process.env.LLM_TOKEN || '';
if (!LLM_TOKEN) {
	console.warn('LLM_TOKEN is not set. Sanitization will be disabled.');
}

/** Path to the @orb/premake-ts package (output target) */
const PREMAKE_TS_PACKAGE = path.resolve(__dirname, '..', '..', 'premake-ts');

interface ParserConfig {
	model: string;
	modelEndpointUrl: string;
	maxFields: number;
	enableDocExtraction: boolean;
	enableSanitization: boolean;
}

function loadConfig(): ParserConfig {
	const configPath = path.resolve(__dirname, '..', 'parser.config.json');
	if (!existsSync(configPath)) {
		throw new Error(`parser.config.json not found at ${configPath}`);
	}
	return JSON.parse(readFileSync(configPath, 'utf-8')) as ParserConfig;
}

const VALID_SECTIONS = new Set([
	'description',
	'parameters',
	'returns',
	'availability',
	'see also',
	'examples',
	'remarks',
	'tags'
]);

async function main() {
	const config = loadConfig();

	// Snapshot existing data for report generation
	const prevFields = loadData<DocumentedField>('data/fields.json');
	const prevDocumented = loadData<DocumentedField>('data/documented.json');

	const filePath = path.join(__dirname, 'dump-fields.lua');
	await execPremake([`--file=${filePath}`]);
	const fields = loadData<DocumentedField>('data/fields.json');
	fields.sort((a, b) => a.name.localeCompare(b.name));
	saveData(fields, 'data/fields.json');

	const documented = loadData<DocumentedField>('data/documented.json');
	const sanitized = loadData<SanitizedField>('data/sanitized.json');
	const sanitizedTs = loadData<SanitizedField>('data/sanitized-typescript.json');

	// Prune entries for fields that no longer exist in fields.json
	// Use case-insensitive comparison to match the convention in findMissingFields
	const fieldNamesLower = new Set(fields.map(f => f.name.toLowerCase()));
	const prunedDocumented = documented.filter(f => fieldNamesLower.has(f.name.toLowerCase()));
	const prunedSanitized = sanitized.filter(f => fieldNamesLower.has(f.name.toLowerCase()));
	const prunedSanitizedTs = sanitizedTs.filter(f => fieldNamesLower.has(f.name.toLowerCase()));
	if (prunedDocumented.length < documented.length) {
		console.log(`Pruning ${documented.length - prunedDocumented.length} removed fields from documented.json`);
		documented.splice(0, documented.length, ...prunedDocumented);
		saveData(documented, 'data/documented.json');
	}
	if (prunedSanitized.length < sanitized.length) {
		console.log(`Pruning ${sanitized.length - prunedSanitized.length} removed fields from sanitized.json`);
		sanitized.splice(0, sanitized.length, ...prunedSanitized);
		saveData(sanitized, 'data/sanitized.json');
	}
	if (prunedSanitizedTs.length < sanitizedTs.length) {
		console.log(`Pruning ${sanitizedTs.length - prunedSanitizedTs.length} removed fields from sanitized-typescript.json`);
		sanitizedTs.splice(0, sanitizedTs.length, ...prunedSanitizedTs);
		saveData(sanitizedTs, 'data/sanitized-typescript.json');
	}

	// Extract documentation
	let undocumented: string[] = [];
	let globalDocs: IClass[] = [];
	if (config.enableDocExtraction) {
		undocumented = findMissingFields(fields, documented);

		if (undocumented.length > 0) {
			console.log(`Found ${undocumented.length} undocumented fields`);
			console.log('Extracting field documentation...');
			const newlyDocumented = extractFieldDocumentation(fields, undocumented);
			documented.push(...newlyDocumented);
			documented.sort((a, b) => a.name.localeCompare(b.name));
			saveData(documented, 'data/documented.json');
		}

		console.log('Extracting global documentation...');
		globalDocs = extractGlobalDocumentation();

		for (const d of globalDocs) {
			d.functions.sort((a, b) => a.name.localeCompare(b.name));

			for (const f of d.functions) {
				const sections: Record<string, string> = {};
				for (const k in f.sections) {
					if (k === 'backward compatible function signature') continue;

					let key = k;
					if (k.startsWith('return')) key = 'returns';
					if (k.startsWith('example')) key = 'examples';

					if (!VALID_SECTIONS.has(key)) {
						console.warn(`Unknown section "${key}" in function ${d.name}.${f.name}`);
					}

					sections[key] = f.sections[k];

					if (sections[key].startsWith("None")) {
						delete sections[key];
					}
				}

				f.sections = sections;
			}
		}

		saveData(globalDocs, 'data/global-docs.json');
	}

	// Sanitize with LLM
	let unsanitized: string[] = [];
	if (LLM_TOKEN && config.enableSanitization) {
		unsanitized = findMissingFields(documented, sanitized);
		console.log(`Found ${unsanitized.length} unsanitized fields`);

		const client = new OpenAI({ baseURL: config.modelEndpointUrl, apiKey: LLM_TOKEN });

		if (unsanitized.length > 0) {
			console.log('Sanitizing with LLM...');
			const newlySanitized = await sanitizeFields(client, config.model, documented, unsanitized, config.maxFields);
			sanitized.push(...newlySanitized);
			sanitized.sort((a, b) => a.name.localeCompare(b.name));
			saveData(sanitized, 'data/sanitized.json');
			console.log('Finished sanitizing.');
		}

		// Convert Lua examples to TypeScript for any sanitized fields missing from sanitizedTs,
		// or where the documentation (non-examples fields) has changed since last conversion.
		const sanitizedTsMap = new Map(sanitizedTs.map(f => [f.name, f]));
		const needsTsConversion = sanitized
			.filter(f => {
				if (!f.examples) return false;
				const tsEntry = sanitizedTsMap.get(f.name);
				if (!tsEntry) return true;
				// Compare all fields except `examples` (which is TS in sanitizedTs vs Lua in sanitized)
				const { examples: _a, ...sanitizedRest } = f;
				const { examples: _b, ...tsRest } = tsEntry;
				return JSON.stringify(sanitizedRest) !== JSON.stringify(tsRest);
			})
			.map(f => f.name);

		if (needsTsConversion.length > 0) {
			console.log(`Found ${needsTsConversion.length} fields needing TypeScript example conversion`);
			const newlyConverted = await convertExamplesToTypeScript(client, config.model, sanitized, needsTsConversion);
			sanitizedTs.push(...newlyConverted);
			sanitizedTs.sort((a, b) => a.name.localeCompare(b.name));
			saveData(sanitizedTs, 'data/sanitized-typescript.json');
			console.log('Finished converting examples to TypeScript.');
		}
	}

	console.log('Generating TypeScript interfaces...');
	generateAllInterfaces(structuredClone(sanitizedTs));

	console.log('Bundling TypeScript definitions...');
	bundleTypes();

	// Copy fields.json to the premake-ts package for runtime use
	console.log('Copying fields.json to @orb/premake-ts...');
	const fieldsSource = path.join(__dirname, 'data', 'fields.json');
	const fieldsTarget = path.join(PREMAKE_TS_PACKAGE, 'data', 'fields.json');
	copyFileSync(fieldsSource, fieldsTarget);

	// Generate report
	console.log('Generating report...');
	const prevFieldNames = new Set(prevFields.map(f => f.name));
	const newFieldNames = new Set(fields.map(f => f.name));

	const addedFields = fields.filter(f => !prevFieldNames.has(f.name)).map(f => f.name);
	const removedFields = prevFields.filter(f => !newFieldNames.has(f.name)).map(f => f.name);

	const prevFieldMap = new Map(prevFields.map(f => [f.name, f]));
	const changedFields: { name: string; before: unknown; after: unknown }[] = [];
	for (const field of fields) {
		const prev = prevFieldMap.get(field.name);
		if (!prev) continue;
		if (JSON.stringify(prev) !== JSON.stringify(field)) {
			changedFields.push({ name: field.name, before: prev, after: field });
		}
	}

	const prevDocMap = new Map(prevDocumented.map(f => [f.name, f.description]));
	const changedDocs: { name: string; before: string; after: string }[] = [];
	for (const field of documented) {
		const prevDesc = prevDocMap.get(field.name);
		if (prevDesc !== undefined && prevDesc !== field.description) {
			changedDocs.push({ name: field.name, before: prevDesc, after: field.description });
		}
	}

	const report = {
		generated: new Date().toISOString(),
		fields: {
			added: addedFields,
			removed: removedFields,
			changed: changedFields,
		},
		documentation: {
			changed: changedDocs,
		},
	};

	const reportPath = path.resolve(__dirname, '..', 'report.json');
	writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf-8');
	console.log(`Report saved to ${reportPath}`);

	//console.log('Generating lua definitions...');
	generateLuaDefinitions(structuredClone(sanitized), structuredClone(globalDocs));
}

main().catch(console.error);
