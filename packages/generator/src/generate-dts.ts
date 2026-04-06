import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { SanitizedField } from './types.ts';
import { generateFunction, generateFunctionType, removeSimpleExamples, toUpperCamelCase } from './utils.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const TARGET_DIR = resolve(__dirname, '..', '..', 'cli', 'types');
const TARGET_FILE = resolve(TARGET_DIR, 'premake-ts.d.ts');

const STATIC_HEADER = `declare module "premake-ts" {

/**
 * Creates a new workspace.
 * Workspaces are the top-level objects in a Premake build script, and are synonymous with a Visual Studio solution. Each workspace contains one or more projects, which in turn contain the settings to generate a single binary target.
 *
 * By default, the project name will be used as the file name of the generated project file; be careful with spaces and special characters. You can override this default with the [filename](filename.md) call.
 *
 * Premake 4.0 or later.
 *
 * #### Examples
 *
 * Create a new workspace named "MyWorkspace", with debug and release build configurations.
 * \`\`\`typescript
 * export default workspace("MyWorkspace", (w) => {
 *   w.configurations("Debug", "Release");
 * });
 * \`\`\`
 *
 * @param name - A unique name for the workspace. If a workspace with the given name already exists, it is made active and returned. If no name is given, the current workspace scope is returned, and also made active. If '*' is used, the 'root' configuration scope, which applies to all workspaces, is selected and nil is returned.
 * @param func - A function that defines the workspace scope
 */
export function workspace(name: string, func: WorkspaceFunc): {
    name: string;
    func: WorkspaceFunc;
};

export function isFile(path: string): boolean;

export type WorkspaceFunc = (scope: WorkspaceScope) => void;
type FilterType = 'architecture' | 'configurations' | 'files' | 'kind' | 'language' | 'options' | 'platforms' | 'system' | 'tags' | 'toolset';
type FilterString = \`\${FilterType}:\${string}\`;
export type UsageType = 'PUBLIC' | 'PRIVATE' | 'INTERFACE' | string;

export interface ConfigScope extends ConfigScopeGenerated {
    action: string;
    premakeVersion: string;
    targetOs: string;
    /**
     * Limits the subsequent build settings to a particular environment.
     *
     * Any settings that appear in the callback function will be applied only to those contexts that match all of the listed keywords.
     *
     * Each keyword must include a prefix to specify which field should be tested. The following field prefixes are currently supported:
     * * action
     * * architecture
     * * configurations
     * * files
     * * kind
     * * language
     * * options
     * * platforms
     * * system
     * * toolset
     *
     * Keywords may use the \\* and \\*\\* wildcards to match more than one term or file. You may also use the modifiers \`not\` and \`or\` to build more complex conditions.
     *
     * @param condition The condition or conditions to evaluate
     * @param func The callback function that defines the scope of the filter
     */
    when(conditions: FilterString | FilterString[], func: (scope: ProjectScope) => void): this;
}
export interface ProjectScope extends ProjectScopeGenerated, ConfigScope {
    usage(name: UsageType, func: (scope: ProjectScope) => void): this;
}
export interface WorkspaceScope extends WorkspaceScopeGenerated, ProjectScope {
    /**
     * Creates a new project within the scope of a workspace.
     *
     * Projects contain all of the settings necessary to build a single binary target, and are synonymous with a Visual Studio project.
     * These settings include the list of source code files, the programming language used by those files, compiler flags, include
     * directories, and which libraries to link against.
     *
     * @param name - The name of the project
     * @param func - A function that defines the project scope
     */
    project(name: string, func: (scope: ProjectScope) => void): this;
    /**
     * Starts a "workspace group", a virtual folder to contain one or more projects.
     * @param name The name of the virtual folder, as it should appear in the IDE. Nested groups may be created by separating the names with forward slashes.
     * @param func A function that defines the group scope
     */
    group(name: string, func: (scope: Omit<WorkspaceScope, 'group'>) => void): this;
}

`;

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

	const parts: string[] = [
		STATIC_HEADER,
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
