export interface ConfigScopeGenerated { [key: string]: any; }
export interface ProjectScopeGenerated { [key: string]: any; }
export interface WorkspaceScopeGenerated { [key: string]: any; }

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
 * ```typescript
 * export default workspace("MyWorkspace", (w) => {
 *   w.configurations("Debug", "Release");
 * });
 * ```
 *
 * @param name - A unique name for the workspace. If a workspace with the given name already exists, it is made active and returned. If no name is given, the current workspace scope is returned, and also made active. If '*' is used, the 'root' configuration scope, which applies to all workspaces, is selected and nil is returned.
 * @param func - A function that defines the workspace scope
 */
export function workspace(name: string, func: WorkspaceFunc): {
	name: string;
	func: WorkspaceFunc;
};

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

export type UsageType = 'PUBLIC' | 'PRIVATE' | 'INTERFACE' | string;

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
