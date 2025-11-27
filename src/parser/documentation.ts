/**
 * Step 2: Extract documentation from markdown files
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import type { PremakeField, DocumentedField } from './types.ts';
import { countOccurrences, getSection } from './utils.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Extracts documentation from markdown files for undocumented fields
 * @param fields All fields to potentially document
 * @param undocumentedNames Names of fields that need documentation
 * @returns Array of newly documented fields
 */
export function extractDocumentation(fields: PremakeField[], undocumentedNames: string[]): DocumentedField[] {
	const docsPath = path.join(__dirname, 'docs');
	const documented: DocumentedField[] = [];

	for (const fieldName of undocumentedNames) {
		const field = fields.find(f => f.name === fieldName)! as DocumentedField;

		const docPath = path.join(docsPath, `${fieldName}.md`);
		if (!fs.existsSync(docPath)) {
			console.warn(`  Documentation file not found: ${docPath}`);
			continue;
		}

		let docContent = fs.readFileSync(docPath, 'utf-8');
		docContent = docContent.replace(/\r\n/g, '\n');

		const desc = getSection(docContent, 'description');
		const params = getSection(docContent, 'parameters');
		const availability = getSection(docContent, 'availability');
		const examples = getSection(docContent, 'examples');

		field.description = desc || '';
		field.parameter = params || '';
		field.availability = availability || '';
		field.examples = examples || '';

		documented.push(field);
	}

	return documented;
}

/**
 * Saves documented fields to a JSON file
 * @param documented The documented fields to save
 * @param filename The output filename
 */
export function saveDocumented(documented: DocumentedField[], filename: string = 'documented.json'): void {
	const outputPath = path.join(__dirname, filename);
	fs.writeFileSync(outputPath, JSON.stringify(documented, null, 2), 'utf-8');
}
