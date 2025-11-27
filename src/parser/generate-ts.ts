/**
 * Generate TypeScript interfaces from sanitized field data
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import type { DocumentedField, SanitizedField } from './types.ts';
import { generateFunction, generateFunctionType, removeSimpleExamples } from './utils.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Generates a TypeScript interface file for a specific scope
 * @param name The name of the interface
 * @param scopeFields Fields belonging to this scope
 */
export function generateInterface(name: string, scopeFields: DocumentedField[]): void {
	console.log(`Generating ${name}`);

	const output = `// Auto-generated file. Do not edit directly.

${scopeFields.filter(f => f.allowed && f.allowed.length > 0).map(f => generateFunctionType(f)).join('\n')}
export interface ${name}Generated {
${scopeFields.map(f => generateFunction(f)).join('\n')}
}
`;

	const outputPath = path.join(__dirname, '..', 'scopes', 'generated', `${name}.generated.ts`);
	fs.writeFileSync(outputPath, output, 'utf-8');
}

function renameArgumentNames(fields: SanitizedField[]) {
	fields.forEach(f => {
		if (f.parameter.name === 'switch') {
			f.parameter.name = 'value';
		}
	});
}

/**
 * Generates all scope interfaces from sanitized data
 * @param sanitized Array of sanitized fields
 */
export function generateAllInterfaces(sanitized: SanitizedField[]): void {
	renameArgumentNames(sanitized);
	removeSimpleExamples(sanitized);

	const configScope = sanitized.filter(f => f.scopes.includes('config'));
	const projectScope = sanitized.filter(f => f.scopes.includes('project'));
	const workspaceScope = sanitized.filter(f => f.scopes.includes('workspace'));
	const ruleScope = sanitized.filter(f => f.scopes.includes('rule'));

	generateInterface('ConfigScope', configScope);
	generateInterface('ProjectScope', projectScope);
	generateInterface('WorkspaceScope', workspaceScope);
	generateInterface('RuleScope', ruleScope);
}
