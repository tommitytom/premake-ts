import { OpenAI } from 'openai';
import path from 'path';
import { fileURLToPath } from 'url';
import { execPremake } from '../generator/util.ts';
import { extractFieldDocumentation, extractGlobalDocumentation, type IClass } from './documentation.ts';
import { generateLuaDefinitions } from './generate-lua.ts';
import { generateAllInterfaces } from './generate-ts.ts';
import { findMissingFields, loadData, saveData } from './load.ts';
import { sanitizeFields } from './sanitize.ts';
import type { DocumentedField, SanitizedField } from './types.ts';
import { bundleTypes } from './bundle-types.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LLM_MODEL = 'qwen2.5-coder-14b-instruct';
const MAX_FIELDS = 500;

const ENABLE_DOC_EXTRACTION = true;
const ENABLE_SANITIZATION = false;

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
	const filePath = path.join(__dirname, 'dump-fields.lua');
	await execPremake([`--file=${filePath}`]);
	const fields = loadData<DocumentedField>('data/fields.json');
	fields.sort((a, b) => a.name.localeCompare(b.name));
	saveData(fields, 'data/fields.json');

	const documented = loadData<DocumentedField>('data/documented.json');
	const sanitized = loadData<SanitizedField>('data/sanitized.json');

	// Extract documentation
	let undocumented: string[] = [];
	let globalDocs: IClass[] = [];
	if (ENABLE_DOC_EXTRACTION) {
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
	if (ENABLE_SANITIZATION) {
		unsanitized = findMissingFields(documented, sanitized);
		console.log(`Found ${unsanitized.length} unsanitized fields`);

		if (unsanitized.length > 0) {
			console.log('Sanitizing with LLM...');
			const client = new OpenAI({ baseURL: 'http://localhost:1234/v1', apiKey: 'not-needed' });
			const newlySanitized = await sanitizeFields(client, LLM_MODEL, documented, unsanitized, MAX_FIELDS);
			sanitized.push(...newlySanitized);
			sanitized.sort((a, b) => a.name.localeCompare(b.name));
			saveData(sanitized, 'data/sanitized.json');
			console.log('Finished sanitizing.');
		}
	}

	console.log('Generating TypeScript interfaces...');
	generateAllInterfaces(structuredClone(sanitized));

	console.log('Bundling TypeScript definitions...');
	bundleTypes();

	//console.log('Generating lua definitions...');
	//generateLuaDefinitions(structuredClone(sanitized), structuredClone(globalDocs));
}

main().catch(console.error);
