// Auto-generated file. Do not edit directly.

export type PreferredToolArchitectureType = 'Default' | 'x86' | 'x86_64'
export interface WorkspaceScopeGenerated {
	/**
	 * Turns the Editor Integration feature on. This is simply a hint to the action to add extra information into the generated workspace that allows an IDE to know which/where and how premake was executed. This is currently really only implemented for the Visual Studio action, but other actions may use this too in the future.
	 * 
	 * There is a plugin that allows re-execution of the premake step from within Visual Studio, which can be found here:
	 * https://github.com/tvandijck/PremakeExtension
	 * If no value is set for a configuration, the toolset's default setting (usually "Off") will be used.
	 * 
	 * 
	 * Premake 5.0 or later.
	 * @param value A boolean value that can be set to 'On' or 'Off'.
	 * Available options:
	 * - `On`
	 * - `Off`
	 * 
	 * ### Examples
	 * ```lua
	 * -- Turn on IDE integration
	 * editorintegration "On"
	 * ```
	 */
	editorIntegration(value: boolean): this;

	/**
	 * 
	 * 
	 * 
	 * Premake 5.0.0 alpha 12 or later.
	 * @param value
	 * Available options:
	 * - `Default`: needs documentation.
	 * - `x86`: needs documentation.
	 * - `x86_64`: needs documentation.
	 * 
	 */
	preferredToolArchitecture(value: PreferredToolArchitectureType): this;

	/**
	 * Specify the startup project for a workspace.
	 * Startup projects are currently only supported by Visual Studio.
	 * 
	 * 
	 * 5.0 or later.
	 * @param name The name of the startup project, which should match the name provided in the call to project() when the project is defined.
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

}
