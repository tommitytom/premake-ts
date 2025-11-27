import type { ConfigScopeGenerated } from "./generated/ConfigScope.generated.ts";
import type { ProjectScopeGenerated } from "./generated/ProjectScope.generated.ts";
import type { WorkspaceScopeGenerated } from "./generated/WorkspaceScope.generated.ts";

export interface ConfigScope extends ConfigScopeGenerated {
	when(condition: string|string[], func: (scope: ProjectScope) => void): this;
}

export interface ProjectScope extends ProjectScopeGenerated, ConfigScope {

}

export interface WorkspaceScope extends WorkspaceScopeGenerated, ProjectScope {
	/**
	 * Creates a new project within the scope of a workspace.
	 * Projects contain all of the settings necessary to build a single binary target, and are synonymous with a Visual Studio project. These settings include the list of source code files, the programming language used by those files, compiler flags, include directories, and which libraries to link against.

	 * @param name - The name of the project
	 * @param func - A function that defines the project scope
	 */
	project(name: string, func: (scope: ProjectScope) => void): this;
	group(name: string, func: (scope: Omit<WorkspaceScope, 'group'>) => void): this;

	action: string;
}