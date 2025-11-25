// Auto-generated file. Do not edit directly.

export type PreferredToolArchitectureType = 'Default' | 'x86' | 'x86_64'

export interface WorkspaceScopeGenerated {
	/**
	 * Specify the startup project for a workspace.
	 * Startup projects are currently only supported by Visual Studio.
	 * 
	 * 
	 * 5.0 or later.
	 * @param name The name of the startup project. This should match the name provided in the call to project(), where the project is defined.
	 * 
	 * ### Examples
	 * ```lua
	 * workspace "MyWorkspace"
	 *     configurations { "Debug", "Release" }
	 *     startproject "MyProject2"
	 * 
	 * project "MyProject1"
	 *     -- define project 1 here
	 * 
	 * project "MyProject2"
	 *     -- define project 2 here
	 * ```
	 */
	startProject(name: string): this;

	/**
	 * 
	 * 
	 * 
	 * Premake 5.0.0 alpha 12 or later.
	 * @param value Available options:
	 * - `Default`: needs documentation.
	 * - `x86`: needs documentation.
	 * - `x86_64`: needs documentation.
	 * 
	 * ### Examples
	 * ```lua
	 * preferredtoolarchitecture "value"
	 * ```
	 */
	preferredToolArchitecture(value: PreferredToolArchitectureType): this;

}
