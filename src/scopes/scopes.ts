import type { ConfigScopeGenerated } from "./generated/ConfigScope.generated.ts";
import type { ProjectScopeGenerated } from "./generated/ProjectScope.generated.ts";
import type { WorkspaceScopeGenerated } from "./generated/WorkspaceScope.generated.ts";

export type WorkspaceFunc = (scope: WorkspaceScope) => void;
type FilterType = 'architecture' | 'configurations' | 'files' | 'kind' | 'language' | 'options' | 'platforms' | 'system' | 'tags' | 'toolset';
type FilterString = `${FilterType}:${string}`;

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
	 * Keywords may use the \* and \*\* wildcards to match more than one term or file. You may also use the modifiers `not` and `or` to build more complex conditions.
	 *
	 * @param condition The condition or conditions to evaluate
	 * @param func The callback function that defines the scope of the filter
	 */
	when(conditions: FilterString|FilterString[], func: (scope: ProjectScope) => void): this;
}

export interface ProjectScope extends ProjectScopeGenerated, ConfigScope {}

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
