/**
 * Main orchestrator for the parser pipeline
 * Coordinates three steps: load data, extract documentation, sanitize with LLM
 */

// Step 1: Load initial data
import { loadExistingData, findMissingFields } from './load.ts';
import type { DocumentedField, SanitizedField } from './types.ts';

// Step 2: Extract documentation
import { extractDocumentation, saveDocumented } from './documentation.ts';

// Step 3: Sanitize with LLM
import { createLLMClient, sanitizeFields, saveSanitized } from './sanitize.ts';

// Generate TypeScript interfaces
import { generateAllInterfaces } from './generate-ts.ts';
import { generateLuaDefinitions } from './generate-lua.ts';
import { runPremake } from '../generator/util.ts';

const LLM_MODEL = 'qwen2.5-coder-14b-instruct';
const MAX_FIELDS = 500;

const ENABLE_DOC_EXTRACTION = true;
const ENABLE_SANITIZATION = false;

async function main() {
	await runPremake(['--file=dumpfields.lua'])

	// Step 1: Load initial data
	console.log('Step 1: Loading initial data...');
	const fields = loadExistingData<DocumentedField>('data/fields.json').filter(f => f.fieldtype === undefined);
	const documented = loadExistingData<DocumentedField>('data/documented.json');
	const sanitized = loadExistingData<SanitizedField>('data/sanitized.json');

	// Step 2: Extract documentation
	let undocumented: string[] = [];
	if (ENABLE_DOC_EXTRACTION) {
		undocumented = findMissingFields(fields, documented);

		console.log(`Found ${undocumented.length} undocumented fields`);

		if (undocumented.length > 0) {
			console.log('Step 2: Extracting documentation...');
			const newlyDocumented = extractDocumentation(fields, undocumented);
			documented.push(...newlyDocumented);
			saveDocumented(documented, 'data/documented.json');
			console.log('Finished extracting documentation.');
		}
	}

	// Step 3: Sanitize with LLM
	let unsanitized: string[] = [];
	if (ENABLE_SANITIZATION) {
		unsanitized = findMissingFields(documented, sanitized);
		console.log(`Found ${unsanitized.length} unsanitized fields`);

		if (unsanitized.length > 0) {
			console.log('Step 3: Sanitizing with LLM...');
			const client = createLLMClient();
			const newlySanitized = await sanitizeFields(client, LLM_MODEL, documented, unsanitized, MAX_FIELDS);
			sanitized.push(...newlySanitized);
			saveSanitized(sanitized, 'data/sanitized.json');
			console.log('Finished sanitizing.');
		}
	}

	console.log('Generating TypeScript interfaces...');
	generateAllInterfaces(structuredClone(sanitized));
	console.log('Done!');

	console.log('Generating lua definitions...');
	generateLuaDefinitions(structuredClone(sanitized));
	console.log('Done!');
}

main().catch(console.error);
