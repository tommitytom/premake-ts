import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import type { DocumentedField, PremakeField } from './types.ts';
import { getSection } from './utils.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const docsPath = path.join(__dirname, '..', 'docs');

export interface IParameter {
	name: string;
	description: string;
}

export interface IFunction {
	name: string;
	sections: Record<string, string>;
	parameters?: IParameter[];
}

export interface IClass {
	name: string;
	functions: IFunction[];
}

// Extracts field documentation from markdown files for undocumented fields
export function extractFieldDocumentation(fields: PremakeField[], undocumentedNames: string[]): DocumentedField[] {
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

function parseMarkdownSections(markdown: string): Record<string, string> {
	const sections: Record<string, string> = {};

	// Match headings with optional closing hashes
	// Captures: ## or ### at start, title text, optional closing hashes
	const headingRegex = /^(#{2,3})\s+(.+?)(?:\s+\1)?$/gm;

	const matches = Array.from(markdown.matchAll(headingRegex));

	if (matches.length === 0) {
		return sections;
	}

	for (let i = 0; i < matches.length; i++) {
		const match = matches[i];
		const title = match[2].trim();
		const startIndex = match.index! + match[0].length;

		// Find where this section ends (start of next heading or end of document)
		const endIndex = i < matches.length - 1
			? matches[i + 1].index!
			: markdown.length;

		// Extract and trim the content between headings
		const content = markdown.slice(startIndex, endIndex).trim();

		sections[title.toLowerCase()] = content;
	}

	return sections;
}

export function extractGlobalDocumentation(): IClass[] {
	const classes: IClass[] = [];

	const entries = fs.readdirSync(docsPath, { withFileTypes: true });
	for (const entry of entries) {
		if (!entry.isDirectory()) {
			continue;
		}

		const c: IClass = {
			name: entry.name,
			functions: []
		};

		const docPaths = fs.readdirSync(path.join(docsPath, entry.name));
		for (const docPath of docPaths) {
			if (docPath.startsWith('premake_') || docPath.includes('-')) {
				continue;
			}

			const f: IFunction = {
				name: docPath.replace(entry.name + '.', '').replace('.md', ''),
				sections: {}
			};

			const fullDocPath = path.join(docsPath, entry.name, docPath);
			let docContent = fs.readFileSync(fullDocPath, 'utf-8');
			docContent = docContent.replace(/\r\n/g, '\n');

			const descEnd = docContent.indexOf('\n##');
			if (descEnd === -1) {
				console.warn(`  Description section not found in: ${fullDocPath}`);
				continue;
			}

			f.sections['description'] = docContent.substring(0, descEnd).trim();
			Object.assign(f.sections, parseMarkdownSections(docContent));

			c.functions.push(f);
		}

		classes.push(c);
	}

	// Add items missing from documentation
	classes.find(c => c.name === 'json')!.functions.push({
		name: 'encode_pretty',
		sections: {
			"description": "Encodes a table to JSON with spacing and tabulation.\n\n```lua\nresult, err = json.encode_pretty(tbl)\n```",
			"parameters": "`tbl` is the table to encode.",
			"returns": "`result` is the resulting string, or `nil` on failure\n\n`err` is the error message if there is one available, always set to `nil` on success",
			"availability": "Premake 5.0 or later.",
			"see also": "* [json.decode](json.decode.md)"
		}
	});

	return classes;
}
