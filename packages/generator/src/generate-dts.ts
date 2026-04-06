import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { SanitizedField } from './types.ts';
import { generateFunction, generateFunctionType, removeSimpleExamples, toUpperCamelCase } from './utils.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SCOPES_FILE = resolve(__dirname, 'scopes.d.ts');
const TARGET_DIR = resolve(__dirname, '..', '..', 'cli', 'types');
const TARGET_FILE = resolve(TARGET_DIR, 'premake-ts.d.ts');

function readScopesContent(): string {
	const raw = readFileSync(SCOPES_FILE, 'utf-8');
	// Strip stub interface lines (e.g. "export interface FooGenerated { [key: string]: any; }")
	return raw
		.replace(/^export interface \w+Generated \{[^}]*\}\n*/gm, '')
		.trim();
}

function renameArgumentNames(fields: SanitizedField[]) {
	fields.forEach(f => {
		if (f.parameter.name === 'switch') {
			f.parameter.name = 'value';
		}
	});
}

function removeUnusedFields(fields: SanitizedField[]) {
	const unused = new Set(['filter', 'project', 'group', 'workspace', 'usage']);
	return fields.filter(f => !unused.has(f.name));
}

function generateTypeUnions(scopes: SanitizedField[][]): string {
	const seen = new Map<string, string>();
	for (const fields of scopes) {
		for (const field of fields) {
			if (field.allowed && field.allowed.length > 0) {
				const typeName = toUpperCamelCase(field.name) + 'Type';
				if (!seen.has(typeName)) {
					seen.set(typeName, generateFunctionType(field) + ';');
				}
			}
		}
	}
	return Array.from(seen.values()).join('\n');
}

function generateScopeInterface(name: string, fields: SanitizedField[]): string {
	return `export interface ${name}Generated {
${fields.map(f => generateFunction(f)).join('\n')}
}
`;
}

export function generateDts(sanitized: SanitizedField[]): string {
	renameArgumentNames(sanitized);
	removeSimpleExamples(sanitized);
	sanitized = removeUnusedFields(sanitized);

	const configScope = sanitized.filter(f => f.scopes.includes('config'));
	const projectScope = sanitized.filter(f => f.scopes.includes('project'));
	const workspaceScope = sanitized.filter(f => f.scopes.includes('workspace'));
	const ruleScope = sanitized.filter(f => f.scopes.includes('rule'));

	const scopesContent = readScopesContent();

	const parts: string[] = [
		'declare module "premake-ts" {',
		'',
		scopesContent,
		'',
		generateTypeUnions([configScope, projectScope, workspaceScope, ruleScope]),
		'',
		generateScopeInterface('ConfigScope', configScope),
		generateScopeInterface('ProjectScope', projectScope),
		generateScopeInterface('WorkspaceScope', workspaceScope),
		generateScopeInterface('RuleScope', ruleScope),
		'}',
		'',
	];

	return parts.join('\n');
}

export function generateAndWriteDts(sanitized: SanitizedField[]): void {
	const content = generateDts(sanitized);
	if (!existsSync(TARGET_DIR)) {
		mkdirSync(TARGET_DIR, { recursive: true });
	}
	writeFileSync(TARGET_FILE, content, 'utf-8');
}
