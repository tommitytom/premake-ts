import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { DocumentedField, SanitizedField } from './types.ts';
import { generateFunction, generateFunctionType, removeSimpleExamples } from './utils.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function generateInterface(name: string, scopeFields: DocumentedField[], outputDir: string): void {
	const output = `// Auto-generated file. Do not edit directly.

${scopeFields.filter(f => f.allowed && f.allowed.length > 0).map(f => generateFunctionType(f)).join('\n')}
export interface ${name}Generated {
${scopeFields.map(f => generateFunction(f)).join('\n')}
}
`;
	const finalPath = join(outputDir, `${name}.generated.ts`);
	writeFileSync(finalPath, output, 'utf-8');
}

function renameArgumentNames(fields: SanitizedField[]) {
	fields.forEach(f => {
		if (f.parameter.name === 'switch') {
			f.parameter.name = 'value';
		}
	});
}

function removeUnusedFields(fields: SanitizedField[]) {
	const unused = new Set(['filter', 'project', 'group', 'workspace']);
	return fields.filter(f => !unused.has(f.name));
}

/**
 * Generates all scope interfaces from sanitized data
 * @param sanitized Array of sanitized fields
 */
export function generateAllInterfaces(sanitized: SanitizedField[]): void {
	renameArgumentNames(sanitized);
	removeSimpleExamples(sanitized);
	sanitized = removeUnusedFields(sanitized);

	const configScope = sanitized.filter(f => f.scopes.includes('config'));
	const projectScope = sanitized.filter(f => f.scopes.includes('project'));
	const workspaceScope = sanitized.filter(f => f.scopes.includes('workspace'));
	const ruleScope = sanitized.filter(f => f.scopes.includes('rule'));

	const outputDir = join(__dirname, '..', 'scopes', 'generated');

	generateInterface('ConfigScope', configScope, outputDir);
	generateInterface('ProjectScope', projectScope, outputDir);
	generateInterface('WorkspaceScope', workspaceScope, outputDir);
	generateInterface('RuleScope', ruleScope, outputDir);
}
