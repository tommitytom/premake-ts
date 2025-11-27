// Auto-generated file. Do not edit directly.

export type ResourceGeneratorType = 'internal' | 'public'
export type SharedLibTypeType = 'OSXBundle' | 'OSXFramework' | 'XCTest'
export type LanguageType = 'C' | 'C++' | 'C#' | 'F#'
export type JustMyCodeType = 'On' | 'Off'
export type OpenMpType = 'On' | 'Off'
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
	icon(name: string): this;

	/**
	 * 
	 * 
	 * 
	 * Premake 5.0.0 alpha 12 or later.
	 * @param value
	 * Available options:
	 * - `internal`
	 * - `public`
	 * 
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
	configurations(...names: string[]): this;

	/**
	 * 
	 * 
	 * 
	 * Premake 5.0.0 alpha 12 or later.
	 * @param value
	 * Available options:
	 * - `OSXBundle`: needs documentation.
	 * - `OSXFramework`: needs documentation.
	 * - `XCTest`: needs documentation.
	 * 
	 */
	sharedLibType(value: SharedLibTypeType): this;

	/**
	 * Sets the programming language used by a project.
	 * 
	 * 
	 * `C`, `C++`, and `C#` are available in Premake 4.0 or later. Others are 5.0 or later.
	 * @param lang The language identifier used by the project.
	 * Available options:
	 * - `C`: Built-in; always available.
	 * - `C++`: Built-in; always available.
	 * - `C#`: Built-in; always available.
	 * - `F#`: Built-in; always available.
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
	 * @param value
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
	configMap(value: any): this;

	/**
	 * Sets the base directory for a configuration, from with other paths contained by the configuration will be made relative at export time.
	 * You do not normally need to set this value, as it is filled in automatically with the current working directory at the time the configuration block is created by the script.
	 * 
	 * 
	 * Premake 4.4 or later.
	 * @param value An absolute path from which other paths contained by the configuration should be made relative.
	 * 
	 */
	baseDir(value: string): this;

	/**
	 * - This page was auto-generated. Feel free to help us improve the documentation by creating a pull request.
	 * 
	 * 
	 * Premake 5.0.0 beta 1 or later.
	 * @param value Needs documentation.
	 * 
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
	 * @param value Needs documentation.
	 * 
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
	location(path: string): this;

	/**
	 * Specifies a set of build platforms, which act as another configuration axis when building.
	 * The platforms listed here are just names to be displayed in the IDE, with no intrinsic meaning. A platform named "x86_64" will not create a 64-bit build; the appropriate architecture still must be specified. For more information, see [Configurations and Platforms](Configurations-and-Platforms.md).
	 * 
	 * 
	 * Premake 5.0 or later.
	 * @param names A list of platform names. Spaces are allowed, but may make using certain Premake features, such as command-line configuration selection, more difficult.
	 * 
	 * ### Examples
	 * Specify debug and release configurations for a workspace, with static and shared library "platforms" in 32- and 64-bit variations.
	 * 
	 * ```lua
	 * workspace "MyWorkspace"
	 *   configurations { "Debug", "Release" }
	 *   platforms { "Static32", "Shared32", "Static64", "Shared64" }
	 * 
	 *   filter "platforms:Static32"
	 *     kind "StaticLib"
	 *     architecture "x32"
	 * 
	 *   filter "platforms:Static64"
	 *     kind "StaticLib"
	 *     architecture "x64"
	 * 
	 *   filter "platforms:Shared32"
	 *     kind "SharedLib"
	 *     architecture "x32"
	 * 
	 *   filter "platforms:Shared64"
	 *     kind "SharedLib"
	 *     architecture "x64"
	 * ```
	 */
	platforms(...names: string[]): this;

	/**
	 * Specifies the default build platform for a workspace.
	 * If `platform_name` has not been defined using [`platforms`](platforms.md) the default platform will not change from the generic one i.e. the first one passed to [`platforms`](platforms.md).
	 * 
	 * 
	 * Premake 5.0.0 alpha 12 or later.
	 * @param platform_name Is the name of the platform you want to use as default.
	 * 
	 * ### Examples
	 * ```lua
	 * workspace "MyWorkspace"
	 *   configurations { "Debug", "Release" }
	 *   platforms { "Static32", "Shared32", "Static64", "Shared64" }
	 *   defaultplatform "Shared64" -- Default platform from "Static32" to "Shared64"
	 * 
	 *   filter "platforms:Static32"
	 *     kind "StaticLib"
	 *     architecture "x32"
	 * 
	 *   filter "platforms:Static64"
	 *     kind "StaticLib"
	 *     architecture "x64"
	 * 
	 *   filter "platforms:Shared32"
	 *     kind "SharedLib"
	 *     architecture "x32"
	 * 
	 *   filter "platforms:Shared64"
	 *     kind "SharedLib"
	 *     architecture "x64"
	 * 
	 * ```
	 */
	defaultPlatform(platform_name: string): this;

	/**
	 * Imports one or more [custom rules](Custom-Rules.md) into a project.
	 * 
	 * 
	 * Premake 5.0 or later.
	 * @param rule_names Specifies a list of one or more names of custom rules, which must be defined elsewhere in the project scripts.
	 * 
	 */
	rules(...rule_names: string[]): this;

	/**
	 * Selects the tools version which is used to build a project.
	 * If no version is specified for a configuration, the build tool will define the a default version.
	 * 
	 * 
	 * Premake 5.0 and later. Versions are currently only implemented for Visual Studio 2017+.
	 * @param identifier A string identifier for the toolset version.
	 * 
	 * ### Examples
	 * Specify tool version 14.27.29110 of the toolset.
	 * 
	 * ```lua
	 * toolsversion "14.27.29110"
	 * ```
	 */
	toolsVersion(identifier: string): this;

	/**
	 * Sets the [Universally Unique Identifier](http://en.wikipedia.org/wiki/UUID) (UUID) for a project.
	 * UUIDs are synonymous (for Premake's purposes) with [Globally Unique Identifiers](http://en.wikipedia.org/wiki/Globally_Unique_Identifier) (GUID).
	 * 
	 * Premake automatically assigns a UUID to each project, which is used by the Visual Studio generators to identify the project within a workspace. This UUID is essentially random and will change each time the project file is generated. If you are storing the generated Visual Studio project files in a version control system, this will create a lot of unnecessary deltas. Using the `uuid` function, you can assign a fixed UUID to each project which never changes, removing the randomness from the generated projects.
	 * 
	 * 
	 * Premake 4.0 or later.
	 * @param project_uuid The UUID for the current project. It should take the form '01234567-ABCD-ABCD-ABCD-0123456789AB'. You can use the Visual Studio guidgen tool to create new UUIDs, or a website like www.famkruithof.net/uuid/uuidgen, or run Premake once to generate Visual Studio files and copy the assigned UUIDs.
	 * 
	 * ### Examples
	 * Set the UUID for a current project.
	 * 
	 * ```lua
	 * uuid "BE2461B7-236F-4278-81D3-F0D476F9A4C0"
	 * ```
	 */
	uuid(project_uuid: string): this;

	/**
	 * Places files into groups or "virtual paths", rather than the default behavior of mirroring the filesystem in IDE-based projects. So you could, for instance, put all header files in a group called "Headers", no matter where they appeared in the source tree.
	 * Note that Lua tables do not maintain any ordering between key-value pairs, so there is no precedence between the supplied rules. That is, you can't write a rule that rewrites the results of an earlier rule, since there is no guarantee in which order the rules will run.
	 * 
	 * 
	 * Premake 4.4 or later.
	 * @param file_patterns A list of key/value pairs that map file patterns to the group in which they should appear.
	 * 
	 * ### Examples
	 * Place all header files into a virtual path called "Headers". Any directory information is removed, so a path such as `src/lua/lua.h` will appear in the IDE as `Headers/lua.h`.
	 * 
	 * ```lua
	 * vpaths { ["Headers"] = "**.h" }
	 * ```
	 * 
	 * You may also specify multiple file patterns using the table syntax.
	 * 
	 * ```lua
	 * vpaths {
	 *    ["Headers"] = { "**.h", "**.hxx", "**.hpp" }
	 * }
	 * ```
	 * 
	 * It is also possible to include the file's path in the virtual group. Using the same example as above, this rule will appear in the IDE as `Headers/src/lua/lua.h`.
	 * 
	 * ```lua
	 * vpaths { ["Headers/*"] = "**.h" }
	 * ```
	 * 
	 * Any directory information explicitly provided in the pattern will be removed from the replacement. This rule will appear in the IDE as `Headers/lua/lua.h`.
	 * 
	 * ```lua
	 * vpaths { ["Headers/*"] = "src/**.h" }
	 * ```
	 * 
	 * You can also use virtual paths to remove extra directories from the IDE. For instance, this rule will cause the previous example to appear as `lua/lua.h`, removing the `src` part of the path from *all* files.
	 * 
	 * ```lua
	 * vpaths { ["*"] = "src" }
	 * ```
	 * 
	 * And of course, you can specify more than one rule at a time.
	 * 
	 * ```lua
	 * vpaths {
	 *    ["Headers"] = "**.h",
	 *    ["Sources/*"] = {"**.c", "**.cpp"},
	 *    ["Docs"] = "**.txt"
	 * }
	 * ```
	 */
	vPaths(file_patterns: any): this;

	/**
	 * Sets the root namespace of a project.
	 * By default, the root namespace for a project which match the target (assembly) name. This function allows you to override that default.
	 * 
	 * Currently, this is only applicable to Visual Studio C# projects.
	 * 
	 * 
	 * Premake 5.0 or later.
	 * @param name The desired root namespace for the project.
	 * 
	 * ### Examples
	 * ```lua
	 * project "MyProject"
	 *    namespace "MyCompany.MyProject"
	 * ```
	 */
	namespace(name: string): this;

	/**
	 * Enables or disables Visual Studio Just My Code debugging feature by passing /JMC option to the compiler. This applies only to VS C++ projects.
	 * If no value is set for a configuration, the toolset's default option (usually "On") will be performed.
	 * 
	 * 
	 * Premake 5.0 or later.
	 * 
	 * Visual Studio 2017 version 15.8 or later.
	 * @param value
	 * Available options:
	 * - `On`: Turn on JustMyCode debugging support.
	 * - `Off`: Turn off JustMyCode debugging support.
	 * 
	 */
	justMyCode(value: JustMyCodeType): this;

	/**
	 * Imports custom .props files for Visual Studio.
	 * 
	 * 
	 * Premake 5.0.0 alpha 12 or later.
	 * @param value Needs documentation.
	 * 
	 */
	buildCustomizations(...value: string[]): this;

	/**
	 * Enables or disables [OpenMP](https://en.wikipedia.org/wiki/OpenMP).
	 * If no value is set for a configuration, the toolset's default OpenMP option (usually "Off") will be performed.
	 * 
	 * 
	 * Premake 5.0-beta1 or later for Visual Studio 2010+ and the MSC toolset.
	 * Premake 5.0-beta2 or later for the GCC and Clang toolsets and for xcode.
	 * @param value Enables or disables OpenMP.
	 * Available options:
	 * - `On`: Turn on OpenMP.
	 * - `Off`: Turn off OpenMP.
	 * 
	 */
	openMp(value: OpenMpType): this;

	/**
	 * Used to specify the NuGet package source. Only NuGet "galleries" are currently supported. Defaults to the official NuGet Gallery at nuget.org.
	 * 
	 * 
	 * Premake 5.0.0 alpha 12 or later.
	 * @param url The NuGet v3 feed URL.
	 * 
	 * ### Examples
	 * ```lua
	 * nugetsource "https://api.nuget.org/v3/index.json"
	 * ```
	 */
	nuGetSource(url: string): this;

}
