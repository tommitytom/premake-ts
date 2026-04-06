import type { WorkspaceFunc } from "premake-ts";

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
export function workspace(name: string, func: WorkspaceFunc): { name: string; func: WorkspaceFunc } {
	return { name, func };
}
