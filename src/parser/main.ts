import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

interface PremakeField {
    allowed: string[];
    kind: string;
    name: string;
    scope: string;
    scopes: string[];
    tokens: boolean;
	fieldtype?: string;
}

interface PremakeParameters {
	parameters: {
		[paramName: string]: {
			description?: string;
			options: {
				name: string;
				description?: string;
			}[];
		};
	};
	additional?: string;
}

interface DocumentedField extends PremakeField {
	description: string;
	parameters?: string|PremakeParameters;
	availability?: string;
	examples?: string;
	discrepancies?: string;
}

interface SanitizedField extends DocumentedField {
	parameters?: PremakeParameters;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const docsPath = path.join(__dirname, 'docs');
const fieldsPath = path.join(__dirname, 'fields.json');
const documentedPath = path.join(__dirname, 'documented.json');
const sanitizedPath = path.join(__dirname, 'sanitized.json');
const promptsDir = path.join(__dirname, 'prompts');

const fields = (JSON.parse(fs.readFileSync(fieldsPath, 'utf-8')) as PremakeField[]).filter(f => f.fieldtype === undefined);

let documented: DocumentedField[] = [];
if (fs.existsSync(documentedPath)) {
	documented = JSON.parse(fs.readFileSync(documentedPath, 'utf-8'));
}

let sanitized: DocumentedField[] = [];
if (fs.existsSync(sanitizedPath)) {
	//sanitized = JSON.parse(fs.readFileSync(sanitizedPath, 'utf-8'));
}

const undocumented: string[] = [];
for (const field of fields) {
	if (!documented.find(f => f.name === field.name)) {
		undocumented.push(field.name);
	}
}

console.log(`Found ${undocumented.length} undocumented fields`);

const sections: Record<string, string> = {
	parameters: '# Parameters',
	appliesTo: '# Applies To',
	availability: '# Availability',
	examples: '# Examples'
};

function getSection(content: string, section: keyof typeof sections|'description'): string | null {
	let start = 0;

	if (section !== 'description') {
		const sectionHeader = sections[section];
		start = content.indexOf(sectionHeader);
		if (start === -1) return null;
		start = content.indexOf('\n', start) + 1;
	}

	const end = content.indexOf('##', start);
	return content.slice(start, end !== -1 ? end : undefined).trim();
}

for (const fieldName of undocumented) {
	const field = fields.find(f => f.name === fieldName)! as DocumentedField;

	//console.log(`Generating documentation for ${fieldName}`);
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
	field.parameters = params || '';
	field.availability = availability || '';
	field.examples = examples || '';

	documented.push(field);
}

fs.writeFileSync(documentedPath, JSON.stringify(documented, null, 2), 'utf-8');
console.log('Finished extracting documentation. Sanitizing...');

import OpenAI from 'openai';
import { sanitizeText, sanitizeToJson } from './llm.ts';

const client = new OpenAI({
	apiKey: 'not-needed',
	baseURL: 'http://localhost:1234/v1',
});


const unsanitized: string[] = [];
for (const field of documented) {
	if (!sanitized.find(f => f.name === field.name)) {
		unsanitized.push(field.name);
	}
}

console.log(`Found ${unsanitized.length} unsanitized files`);

const namePrompt = fs.readFileSync(path.join(promptsDir, 'name.md'), 'utf-8');
const parametersPrompt = fs.readFileSync(path.join(promptsDir, 'parameters.md'), 'utf-8');

const MAX_FIELDS = 100;

let fieldCount = 0;
for (const fieldName of unsanitized) {
	const field = documented.find(f => f.name === fieldName)! as SanitizedField;

	// Sometimes documentation starts with the field name, remove it
	if (field.description.startsWith(fieldName)) {
		field.description = field.description.slice(fieldName.length).trim();
	}

	// Find the first lua example in the description, this is mostly useless for inline documentation, remove it.
	const exampleStart = field.description.indexOf('```lua');
	if (exampleStart !== -1) {
		const exampleEnd = field.description.indexOf('```', exampleStart + 5);
		if (exampleEnd !== -1) {
			field.description = (field.description.slice(0, exampleStart).trim() + '\n' + field.description.slice(exampleEnd + 3).trim()).trim();
		}
	}

	const LLM_MODEL = 'qwen2.5-coder-14b-instruct';

	const newName = await sanitizeText(client, LLM_MODEL, namePrompt, field.name!) as string;
	if (newName && field.name.length === newName.length) {
		field.name = newName;
	}

	const params = (field as DocumentedField).parameters! as string;
	if (params.trim() === '') {
		field.parameters = { parameters: { value: { description: '', options: [] } } };
	} else {
		field.parameters = await sanitizeToJson(client, LLM_MODEL, parametersPrompt, (field as DocumentedField).parameters! as string) as any;
		if (!field.parameters) {
			field.parameters = { parameters: { value: { description: '', options: [] } } };
		}
	}

	sanitized.push(field);

	fieldCount++;

	if (fieldCount >= MAX_FIELDS) {
		break;
	}
}

fs.writeFileSync(sanitizedPath, JSON.stringify(sanitized, null, 2), 'utf-8');
console.log('Finished sanitizing. Generating interfaces...');

function jsdocFormat(text: string): string {
	const lines = text.split('\n').map(line => `\t * ${line}`);
	return lines.join('\n');
}

function jsdocFormatParams(params: PremakeParameters): string {
	const lines: string[] = [];

	for (const key in params.parameters!) {
		const param = params.parameters![key];
		const hasOptions = param.options && param.options.length > 0;

		lines.push(`\t * @param ${key}${param.description ? ' ' + param.description : ''}${hasOptions ? ' Available options:' : ''}`);

		if (hasOptions) {
			param.options.forEach(option => {
				lines.push(`\t * - \`${option.name}\`${option.description ? ': ' + option.description : ''}`);
			});
		}
	}

	return lines.join('\n');
}

function getParamType(field: DocumentedField): string {
	const { kind, allowed } = field;
	if (allowed && allowed.length > 0) {
		const typeName = toUpperCamelCase(field.name) + 'Type';
		if (kind.startsWith('list:')) {
			return `${typeName}[]`;
		}

		return typeName;
	}

	switch (kind) {
		case 'string':
			return 'string';
		case 'list:string':
			return 'string[]';
		case 'boolean':
			return 'boolean';
		default:
			return 'any';
	}
}

function generateFunctionDefinition(field: DocumentedField): string {
	const parameters = (field.parameters as PremakeParameters);

	if (!parameters || !parameters.parameters || Object.keys(parameters.parameters).length === 0) {
		throw new Error(`Field ${field.name} has no parameters`);
	}

	const parameterKey = Object.keys(parameters.parameters)[0];
	return `${field.name}(${parameterKey}: ${getParamType(field)}): this;`;
}

// Convert from lowerCamelCase to UpperCamelCase
function toUpperCamelCase(str: string): string {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

function generateFunctionType(field: DocumentedField): string {
	return `export type ${toUpperCamelCase(field.name)}Type = ${field.allowed.map(a => `'${a}'`).join(' | ')}`;
}

// Generate a typescript function definition with jsdoc comments
function generateFunction(field: DocumentedField): string {
    return `\t/**
${jsdocFormat(field.description + '\n')}
${jsdocFormat(field.availability ? '\n' + field.availability : '')}
${jsdocFormatParams(field.parameters as PremakeParameters)}
${jsdocFormat(field.examples ? '\n### Examples\n' + field.examples : '')}
	 */
	${generateFunctionDefinition(field)}
`;
}

const configScope: DocumentedField[] = sanitized.filter(f => f.scopes.includes('config'));
const projectScope: DocumentedField[] = sanitized.filter(f => f.scopes.includes('project'));
const workspaceScope: DocumentedField[] = sanitized.filter(f => f.scopes.includes('workspace'));
const ruleScope: DocumentedField[] = sanitized.filter(f => f.scopes.includes('rule'));

function generateInterface(name: string, scopeFields: DocumentedField[]) {
	console.log(`Generating ${name}`);

	const output = `// Auto-generated file. Do not edit directly.

${scopeFields.filter(f => f.allowed && f.allowed.length > 0).map(f => generateFunctionType(f)).join('\n')}

export interface ${name}Generated {
${scopeFields.map(f => generateFunction(f)).join('\n')}
}
`;

	fs.writeFileSync(path.join(__dirname, '..', 'scopes', 'generated', `${name}.generated.ts`), output, 'utf-8');
}

generateInterface('ConfigScope', configScope);
generateInterface('ProjectScope', projectScope);
generateInterface('WorkspaceScope', workspaceScope);
generateInterface('RuleScope', ruleScope);
