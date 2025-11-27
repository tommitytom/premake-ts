// Auto-generated file. Do not edit directly.

export type PreferredToolArchitectureType = 'Default' | 'x86' | 'x86_64'
export interface WorkspaceScopeGenerated {
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
	 * Creates a new project within the scope of a workspace.  After a project is invoked, any previous filter settings are cleared (i.e., reset).
	 * Projects contain all of the settings necessary to build a single binary target, and are synonymous with a Visual Studio project. These settings include the list of source code files, the programming language used by those files, compiler flags, include directories, and which libraries to link against.
	 * 
	 * Every project belongs to a workspace.
	 * 
	 * 
	 * Premake 4.0 or later.
	 * @param name The name for the project, which must be unique within the workspace.
	 * Available options:
	 * - `*`: The containing workspace, which applies to all workspaces, is made active and nil is returned.
	 * 
	 * ### Examples
	 * Create a new project named "MyProject". Note that a workspace must exist to contain the project. The indentation is for readability and is optional.
	 * 
	 * ```lua
	 * workspace "MyWorkspace"
	 *    configurations { "Debug", "Release" }
	 * 
	 * project "MyProject"
	 *    kind "ConsoleApp"
	 *    language "C++"
	 * ```
	 */
	project(name: string): this;

	/**
	 * Starts a "workspace group", a virtual folder to contain one or more projects.
	 * 
	 * 
	 * 5.0 or later.
	 * @param name The name of the virtual folder, as it should appear in the IDE. Nested groups may be created by separating the names with forward slashes.
	 * 
	 * ### Examples
	 * ```lua
	 * workspace "MyWorkspace"
	 * 
	 * -- put the projects "Tests1" and "Tests2" in a virtual folder named "Tests"
	 * 
	 * group "Tests"
	 * 
	 *     project "Tests1"
	 *       -- Tests1 stuff goes here
	 * 
	 *    project "Tests2"
	 *       -- Tests2 stuff goes here
	 * 
	 * -- Any project defined after the call to group() will go into that group. The
	 * -- project can be defined in a different script though.
	 * 
	 * group "Tests"
	 * 
	 *     include "tests/tests1"
	 *     include "tests/tests2"
	 * 
	 * -- Groups can be nested with forward slashes, like a file path.
	 * 
	 * group "Tests/Unit"
	 * 
	 * -- To "close" a group and put projects back at the root level use
	 * -- an empty string for the name.
	 * 
	 * group ""
	 * 
	 *    project "TestHarness"
	 * ```
	 * 
	 * The group value is latched the first time a project is declared but it can be overriden later:
	 * 
	 * ```lua
	 * local prj = project "Tests1"
	 * prj.group = "NotActuallyATest"
	 * ```
	 * 
	 * or
	 * 
	 * ```lua
	 * project("Tests1").group = "NotActuallyATest"
	 * ```
	 */
	group(name: string): this;

}
