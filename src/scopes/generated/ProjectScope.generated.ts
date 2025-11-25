// Auto-generated file. Do not edit directly.

export type ResourceGeneratorType = 'internal' | 'public'
export type SharedLibTypeType = 'OSXBundle' | 'OSXFramework' | 'XCTest'
export type LanguageType = 'C' | 'C++' | 'C#' | 'F#'

export interface ProjectScopeGenerated {
	/**
	 * Specifies the application icon resource.
	 * Currently, this is only used by Visual Studio C# projects.
	 * 
	 * 
	 * Premake 5.0 or later.
	 * @param name The resource name of the icon.
	 * 
	 * ### Examples
	 * ```lua
	 * project "MyProject"
	 *    icon "MyProject.ico"
	 * ```
	 */
	icon(name: any): this;

	/**
	 * 
	 * 
	 * 
	 * Premake 5.0.0 alpha 12 or later.
	 * @param value Available options:
	 * - `internal`: needs documentation.
	 * - `public`: needs documentation.
	 * 
	 * ### Examples
	 * ```lua
	 * resourcegenerator "value"
	 * ```
	 */
	resourceGenerator(value: ResourceGeneratorType): this;

	/**
	 * Sets the name of a generated workspace, project, or rules file. Use it in conjunction with [location](location.md) to completely control the generated file destination.
	 * By default, generated workspace, project, and rule files use their name as the name of the generated file. The `filename` function allows you to change this.
	 * 
	 * 
	 * @param name The desired file name for the generated workspace or project file.
	 * 
	 * ### Examples
	 * Change the workspace name to "Master".
	 * 
	 * ```lua
	 * workspace "MyWorkspace"
	 *   filename "Master"
	 * ```
	 * 
	 * If you plan to build with multiple tools from the same source tree you might want to split up the project files by toolset. The _ACTION global variable contains the current toolset identifier, as specified on the command line.
	 * 
	 * ```lua
	 * workspace "MyWorkspace"
	 *    filename "MyWorkspace_%{_ACTION or ''}"
	 * ```
	 */
	fileName(name: string): this;

	/**
	 * Specifies the set of build configurations, such as "Debug" and "Release", for a workspace or project.
	 * A configuration encapsulates a collection of build settings, allowing the developer to easily switch between them. "Debug" and "Release" are the most common configuration names.
	 * 
	 * For more information, see [Configurations and Platforms](Configurations-and-Platforms.md).
	 * 
	 * 
	 * Premake 4.0 or later. Per-project configuration lists were introduced in Premake 5.0.
	 * @param names A list of configuration names. Spaces are allowed, but may make using certain Premake features, such as a command-line configuration selection, more difficult.
	 * 
	 * ### Examples
	 * Specify debug and release configurations for a workspace.
	 * 
	 * ```lua
	 * workspace "MyWorkspace"
	 *   configurations { "Debug", "Release" }
	 * ```
	 * 
	 * Add additional configurations for a dynamic link library version.
	 * 
	 * ```lua
	 * configurations { "Debug", "Release", "DebugDLL", "ReleaseDLL" }
	 * ```
	 */
	configurations(names: string[]): this;

	/**
	 * 
	 * 
	 * 
	 * Premake 5.0.0 alpha 12 or later.
	 * @param value Available options:
	 * - `OSXBundle`: needs documentation.
	 * - `OSXFramework`: needs documentation.
	 * - `XCTest`: needs documentation.
	 * 
	 * ### Examples
	 * ```lua
	 * sharedlibtype "value"
	 * ```
	 */
	sharedLibType(value: SharedLibTypeType): this;

	/**
	 * Sets the programming language used by a project.
	 * 
	 * 
	 * `C`, `C++`, and `C#` are available in Premake 4.0 or later. Others are 5.0 or later.
	 * @param lang Available options:
	 * - `C`: Built-in; always available
	 * - `C++`: Built-in; always available
	 * - `C#`: Built-in; always available
	 * - `F#`: Built-in; always available
	 * 
	 * ### Examples
	 * Set the project language to C++.
	 * 
	 * ```lua
	 * language "C++"
	 * ```
	 * 
	 * Set the project language to C#
	 * 
	 * ```lua
	 * language "C#"
	 * ```
	 */
	language(lang: LanguageType): this;

	/**
	 * Map workspace level configuration and platforms to a different project configuration or platform.
	 * You may map multiple configurations in a single configuration map.
	 * 
	 * 
	 * 5.0 or later.
	 * @param wks_cfg The workspace configuration being mapped. Available options:
	 * - `string representing a build configuration`
	 * - `string representing a platform`
	 * - `table holding a build configuration/platform pair`
	 * @param prj_cfg The project configuration to which the workspace configuration should be mapped. Available options:
	 * - `string`
	 * - `build configuration/platform pair`
	 * 
	 * ### Examples
	 * The workspace contains four build configurations, while the project contains only the standard Debug and Release. Map the extra workspace configurations to Debug and Release.
	 * 
	 * 
	 * ```lua
	 * workspace "MyWorkspace"
	 *    configurations { "Debug", "Development", "Profile", "Release" }
	 * 
	 * project "MyProject"
	 *    configmap {
	 *       ["Development"] = "Debug",
	 *       ["Profile"] = "Release",
	 *    }
	 * ```
	 * 
	 * It can be useful to specify a map globally for a workspace, but only apply it if the target configuration is actually present in the project. In this example, host executables can be built for either Windows or Mac, while some projects build for an embedded controller. Any project that uses the special "Embedded" platform will receive the configuration map.
	 * 
	 * 
	 * ```lua
	 * workspace "MyWorkspace"
	 *    configurations { "Debug", "Release" }
	 *    platforms { "Windows", "Mac" }
	 * 
	 *    filter { "platforms:Embedded" }
	 *       configmap {
	 *          ["Windows"] = "Embedded",
	 *          ["Mac"] = "Embedded"
	 *       }
	 * 
	 * -- this project gets the configuration map, because it defines an "Embedded" platform
	 * project "MyEmbeddedProject"
	 *    platforms { "Embedded" }
	 * 
	 * -- this one does not
	 * project "MyHostProject"
	 * ```
	 */
	configMap(wks_cfg: any): this;

	/**
	 * Sets the base directory for a configuration, from with other paths contained by the configuration will be made relative at export time.
	 * You do not normally need to set this value, as it is filled in automatically with the current working directory at the time the configuration block is created by the script.
	 * 
	 * 
	 * Premake 4.4 or later.
	 * @param value An absolute path, from which other paths contained by the configuration should be made relative.
	 * 
	 */
	baseDir(value: any): this;

	/**
	 * - This page was auto-generated. Feel free to help us improve the documentation by creating a pull request.
	 * 
	 * 
	 * Premake 5.0.0 beta 1 or later.
	 * @param value
	 * 
	 * ### Examples
	 * ```lua
	 * fastuptodate (value)
	 * ```
	 */
	fastUpToDate(value: boolean): this;

	/**
	 * Enables C# xmlDocumentationFile
	 * 
	 * The `xmlDocumentationFile` option is used to include [XML comments](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/xmldoc/) in a DLL that has been included in a .NET framework or another C# project. These XML comments can then be referenced by other projects when placed alongside the corresponding SharedLib.
	 * 
	 * This feature sets the [documentationfile](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/compiler-options/output#documentationfile) option in a C# project's .csproj file for each respective [configuration](https://premake.github.io/docs/configurations/)
	 * 
	 * 
	 * Premake 5.0 beta3 or later.
	 * 
	 * Visual studio is the only toolset currently supported.
	 * @param targetdir The directory where the documentation file should be placed after building the project using visual studio.
	 * 
	 * ### Examples
	 * When you set documentationFile to true, the following filepath will be generated:
	 * ```%{targetdir}/%{prj.name}.xml```
	 * ```lua
	 * documentationfile(true)
	 * ```
	 * If you specify a custom target directory like this:
	 * ```lua
	 * documentationfile("%{prj.location}/bin/test")
	 * ```
	 * the following filepath will be generated:
	 * ```bin\test\%{prj.name}.xml```
	 */
	documentationFile(targetdir: string): this;

	/**
	 * - This page was auto-generated. Feel free to help us improve the documentation by creating a pull request.
	 * 
	 * 
	 * Premake 5.0.0 alpha 14 or later.
	 * @param value
	 * 
	 * ### Examples
	 * ```lua
	 * xcodesystemcapabilities (value)
	 * ```
	 */
	xcodeSystemCapabilities(value: boolean): this;

	/**
	 * Sets the destination directory for a generated workspace or project file.
	 * By default, workspace and project files are generated into the same directory as the script that defines them. The `location` function allows you to change this location.
	 * 
	 * Note that unlike other values, `location` does not automatically propagate to the contained projects. Projects will use their default location unless explicitly overridden.
	 * 
	 * 
	 * Premake 4.0 or later.
	 * @param path The directory where the generated files should be stored, specified relative to the currently executing script file.
	 * 
	 * ### Examples
	 * Set the destination directory for a workspace. Setting the location for a project works the same way.
	 * 
	 * ```lua
	 * workspace "MyWorkspace"
	 *   location "../build"
	 * ```
	 * 
	 * If you plan to build with multiple tools from the same source tree you might want to split up the project files by toolset. The [_ACTION](globals/premake_ACTION.md) global variable contains the current toolset identifier, as specified on the command line. Note that Lua syntax requires parenthesis around the function parameters in this case.
	 * 
	 * ```lua
	 * location ("../build/" .. _ACTION)
	 * ```
	 */
	location(path: any): this;

}
