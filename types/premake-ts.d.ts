declare module "premake-ts" {

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
    when(conditions: FilterString | FilterString[], func: (scope: ProjectScope) => void): this;
}
export interface ProjectScope extends ProjectScopeGenerated, ConfigScope {
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
export {};

export type ArchitectureType = 'universal' | 'x86' | 'x86_64' | 'ARM' | 'ARM64' | 'RISCV64' | 'loongarch64' | 'ppc' | 'ppc64' | 'wasm32' | 'wasm64' | 'e2k' | 'armv5' | 'armv7' | 'aarch64' | 'mips' | 'mips64';
export type AtlType = 'Off' | 'Dynamic' | 'Static';
export type BuildStlModulesType = 'On' | 'Off';
export type CallingconventionType = 'Cdecl' | 'FastCall' | 'StdCall' | 'VectorCall';
export type CDialectType = 'Default' | 'C89' | 'C90' | 'C99' | 'C11' | 'C17' | 'C23' | 'gnu89' | 'gnu90' | 'gnu99' | 'gnu11' | 'gnu17' | 'gnu23';
export type CharacterSetType = 'Default' | 'ASCII' | 'MBCS' | 'Unicode';
export type ClrType = 'Off' | 'On' | 'Pure' | 'Safe' | 'Unsafe' | 'NetCore';
export type CompileAsType = 'Default' | 'C' | 'C++' | 'Objective-C' | 'Objective-C++' | 'Module' | 'ModulePartition' | 'HeaderUnit';
export type CppDialectType = 'Default' | 'C++latest' | 'C++98' | 'C++0x' | 'C++11' | 'C++1y' | 'C++14' | 'C++1z' | 'C++17' | 'C++2a' | 'C++20' | 'C++2b' | 'C++23' | 'gnu++98' | 'gnu++0x' | 'gnu++11' | 'gnu++1y' | 'gnu++14' | 'gnu++1z' | 'gnu++17' | 'gnu++2a' | 'gnu++20' | 'gnu++2b' | 'gnu++23';
export type DebugFormatType = 'Default' | 'c7' | 'Dwarf' | 'SplitDwarf';
export type DebuggerType = 'Default' | 'GDB' | 'LLDB' | 'VisualStudioLocal' | 'VisualStudioRemote' | 'VisualStudioWebBrowser' | 'VisualStudioWebService';
export type DebuggerFlavorType = 'Local' | 'Remote' | 'WebBrowser' | 'WebService';
export type DebuggerTypeType = 'Mixed' | 'NativeOnly' | 'ManagedOnly' | 'NativeWithManagedCore';
export type DpiAwarenessType = 'Default' | 'None' | 'High' | 'HighPerMonitor';
export type EditAndContinueType = 'Default' | 'On' | 'Off';
export type EnableModulesType = 'On' | 'Off';
export type EnableUnityBuildType = 'On' | 'Off';
export type EndianType = 'Default' | 'Little' | 'Big';
export type ExceptionHandlingType = 'Default' | 'On' | 'Off' | 'SEH' | 'CThrow' | 'UnwindTables';
export type ExternalAngleBracketsType = 'On' | 'Off';
export type ExternalWarningsType = 'Off' | 'Default' | 'High' | 'Extra' | 'Everything';
export type FlagsType = 'DebugEnvsDontMerge' | 'DebugEnvsInherit' | 'ExcludeFromBuild' | 'FatalCompileWarnings' | 'FatalLinkWarnings' | 'FatalWarnings' | 'LinkTimeOptimization' | 'Maps' | 'MFC' | 'MultiProcessorCompile' | 'No64BitChecks' | 'NoCopyLocal' | 'NoImplicitLink' | 'NoImportLib' | 'NoIncrementalLink' | 'NoManifest' | 'NoMinimalRebuild' | 'NoPCH' | 'NoRuntimeChecks' | 'NoBufferSecurityCheck' | 'OmitDefaultLibrary' | 'RelativeLinks' | 'ShadowedVariables' | 'UndefinedIdentifiers' | 'WPF';
export type FloatAbiType = 'soft' | 'softfp' | 'hard';
export type FloatingPointType = 'Default' | 'Fast' | 'Strict';
export type FpuType = 'Software' | 'Hardware';
export type InlinesvisibilityType = 'Default' | 'Hidden';
export type InliningType = 'Default' | 'Disabled' | 'Explicit' | 'Auto';
export type IosFamilyType = 'iPhone/iPod touch' | 'iPad' | 'Universal';
export type IsaExtensionsType = 'MOVBE' | 'POPCNT' | 'PCLMUL' | 'LZCNT' | 'BMI' | 'BMI2' | 'F16C' | 'AES' | 'FMA' | 'FMA4' | 'RDRND';
export type KindType = 'ConsoleApp' | 'Makefile' | 'None' | 'SharedLib' | 'StaticLib' | 'WindowedApp' | 'Utility' | 'SharedItems' | 'Packaging';
export type LinkerType = 'Default' | 'LLD';
export type LinkGroupsType = 'Off' | 'On';
export type LinkSectionDataType = 'On' | 'Off';
export type LinkSectionFunctionType = 'On' | 'Off';
export type LinkTimeOptimizationType = 'Default' | 'On' | 'Off';
export type MfcType = 'Default' | 'Off' | 'On' | 'Static' | 'Dynamic';
export type NativeWCharType = 'Default' | 'On' | 'Off';
export type OmitFramePointerType = 'Default' | 'On' | 'Off';
export type OptimizeType = 'Off' | 'On' | 'Debug' | 'Size' | 'Speed' | 'Full';
export type PicType = 'Off' | 'On';
export type RttiType = 'Default' | 'On' | 'Off';
export type RunTimeType = 'Debug' | 'Release';
export type SanitizeType = 'Address' | 'Fuzzer' | 'Thread' | 'UndefinedBehavior';
export type ShaderAssemblerType = 'NoListing' | 'AssemblyCode' | 'AssemblyCodeAndHex';
export type ShaderModelType = '2.0' | '3.0' | '4.0_level_9_1' | '4.0_level_9_3' | '4.0' | '4.1' | '5.0' | '5.1' | 'rootsig_1.0' | 'rootsig_1.1' | '6.0' | '6.1' | '6.2' | '6.3' | '6.4' | '6.5' | '6.6';
export type ShaderTypeType = 'Effect' | 'Vertex' | 'Pixel' | 'Geometry' | 'Hull' | 'Domain' | 'Compute' | 'Library' | 'Mesh' | 'Amplification' | 'Texture' | 'RootSignature';
export type StaticRuntimeType = 'Default' | 'On' | 'Off';
export type StlType = 'none' | 'gabi++' | 'stlport' | 'gnu' | 'libc++';
export type StrictAliasingType = 'Off' | 'Level1' | 'Level2' | 'Level3';
export type StructMemberAlignType = '1' | '2' | '4' | '8' | '16';
export type SwiftVersionType = '4.0' | '4.2' | '5.0';
export type SymbolsType = 'Default' | 'On' | 'Off' | 'FastLink' | 'Full';
export type SystemType = 'aix' | 'bsd' | 'emscripten' | 'haiku' | 'ios' | 'linux' | 'macosx' | 'solaris' | 'tvos' | 'uwp' | 'wii' | 'windows' | 'android';
export type ThumbModeType = 'thumb' | 'arm' | 'disabled';
export type ToolChainVersionType = 'remote' | 'wsl' | 'wsl2' | '4.6' | '4.8' | '4.9' | '3.4' | '3.5' | '3.6' | '3.8' | '5.0';
export type UseStandardPreprocessorType = 'On' | 'Off';
export type VectorExtensionsType = 'Default' | 'AVX' | 'AVX2' | 'IA32' | 'SSE' | 'SSE2' | 'SSE3' | 'SSSE3' | 'SSE4.1' | 'SSE4.2' | 'ALTIVEC' | 'NEON' | 'MXU';
export type VisibilityType = 'Default' | 'Hidden' | 'Internal' | 'Protected';
export type WarningsType = 'Off' | 'Default' | 'High' | 'Extra' | 'Everything';
export interface ConfigScopeGenerated {
    /**
     *
     *
     *
     * Visual Studio 2019 and later.
     * Premake 5.0-beta2 or later.
     * @param value
     * Available options:
     * - `On`: All C++ modules in the given project(s) will be public.
     * - `Off`: Not all C++ modules in the given project(s) will be public.
     *
     */
    allModulesPublic(value: boolean): this;
    /**
     * Specifies the target Android API level.
     *
     *
     * Premake 5.0.0 alpha 14 or later.
     * @param value A number specifying the target Android API level.
     *
     */
    androidApiLevel(value: any): this;
    /**
     * Specfies the file name for the output APK.
     * By default, the project name will be used as the file name for the APK.
     *
     *
     * Premake 5.0.0 alpha 14 or later.
     * @param value The new file name for the output APK.
     *
     */
    androidAppLibName(value: string): this;
    /**
     * Specifies the system architecture to be targeted by the configuration.
     *
     *
     * Premake 5.0 or later.
     * @param value Specifies the system architecture to be targeted by the configuration.
     * Available options:
     * - `universal`: The universal binaries supported by iOS and macOS
     * - `x86`
     * - `x86_64`
     * - `ARM`
     * - `ARM64`
     * - `RISCV64`
     * - `loongarch64`
     * - `ppc`
     * - `ppc64`
     * - `wasm32`
     * - `wasm64`
     * - `e2k`
     * - `mips64el`
     * - `armv5`: Only supported in VSAndroid projects
     * - `armv7`: Only supported in VSAndroid projects
     * - `aarch64`: Only supported in VSAndroid projects
     * - `mips`: Only supported in VSAndroid projects
     * - `mips64`: Only supported in VSAndroid projects
     * - `i386`: Alias for `x86`
     * - `amd64`: Alias for `x86_64`
     * - `x32`: Alias for `x86`; There is intent to deprecate this
     * - `x64`: Alias for `x86_64`; There is intent to deprecate this
     *
     * ### Examples
     * Set up 32- and 64-bit Windows builds.
     *
     * ```lua
     * workspace "MyWorkspace"
     *    configurations { "Debug32", "Release32", "Debug64", "Release64" }
     *
     *    filter "configurations:*32"
     *       architecture "x86"
     *
     *    filter "configurations:*64"
     *       architecture "x86_64"
     * ```
     */
    architecture(value: ArchitectureType): this;
    /**
     * - This page was auto-generated. Feel free to help us improve the documentation by creating a pull request.
     *
     *
     * Premake 5.0.0 alpha 16 or later.
     * @param value Needs documentation.
     *
     */
    assemblyDebug(value: boolean): this;
    /**
     * Enables Microsoft's Active Template Library in a project.
     *
     *
     * Premake 5.0 or later.
     * @param value
     * Available options:
     * - `Off`: Do not use ATL (default).
     * - `Dynamic`: Link the ATL libraries dynamically.
     * - `Static`: Link the ATL libraries statically.
     *
     */
    atl(value: AtlType): this;
    /**
     * Specifies extra paths to use when executing build commands
     *
     *
     * Premake 5.0.0 alpha 12 or later.
     * @param directories Paths containing executable to run when building command.
     *
     * ### Examples
     * ```lua
     * bindirs { "bin/", "scripts/" }
     * ```
     */
    binDirs(...directories: string[]): this;
    /**
     * Specifies how a file or set of files should be treated during the compilation process. It is usually paired with a filter to select a file set. If no build action is specified for a file a default action will be used, based on the file's extension.
     *
     *
     * Build actions are currently supported for C/C++ and C# projects.
     *
     * `Compile`, `Copy`, `Embed`, and `None` are available in Premake 4.4 or later. All actions are available in Premake 5.0 or later.
     * @param action
     * Available options:
     * - `ClInclude`: Treat the file as an include file.
     * - `ClCompile`: Treat the file as source code; compile and link it.
     * - `FxCompile`: Treat the file as HLSL shader source code; compile and link it.
     * - `None`: Do nothing with this file.
     * - `ResourceCompile`: Copy/embed the file with the project resources.
     * - `CustomBuild`: Treat the file as custom build code; compile and optionally link it.
     * - `Midl`: Treat the file as MIDL source code; compile and link it.
     * - `Masm`: Treat the file as MASM source code; compile and link it.
     * - `Image`: Treat the file as an Image.
     * - `Natvis`: Treat the file as Natvis source; use it for custom data layouts while debugging.
     * - `AppxManifest`: Treat the file as AppX Manifest; required for UWP applications.
     * - `Copy`: Copy the file to the target directory.
     *
     * ### Examples
     * Embed all PNG images files into the target binary.
     *
     * ```lua
     * filter "files:**.png"
     *    buildaction "Embed"
     * ```
     *
     * [1]: http://msdn.microsoft.com/en-us/library/ms228287(v=vs.90).aspx
     * [2]: http://msdn.microsoft.com/en-us/library/a6h7e207(v=vs.71).aspx
     */
    buildAction(action: string): this;
    /**
     * Specifies one or more shell commands to be executed to build a project or file.
     *
     *
     * Premake 5.0 or later.
     * @param commands Specifies a list of one or more shell commands to be executed. The commands may use tokens.
     *
     * ### Examples
     * Use [per-file custom build commands](Custom-Build-Commands.md) to compile all Lua files in a project to C:
     *
     * ```lua
     * filter 'files:**.lua'
     *    -- A message to display while this build step is running (optional)
     *    buildmessage 'Compiling %[%{file.relpath}]'
     *
     *    -- One or more commands to run (required)
     *    buildcommands {
     *       'luac -o "%[%{!cfg.objdir}/%{file.basename}.out]" "%[%{file.relpath}]"'
     *    }
     *
     *    -- One or more outputs resulting from the build (required)
     *    buildoutputs { '%{cfg.objdir}/%{file.basename}.c' }
     *
     * ```
     *
     * Use a [Makefile project](Makefile-Projects.md) to execute an external makefile.
     *
     * ```lua
     * workspace "Workspace"
     *    configurations { "Debug", "Release" }
     *
     * project "MyProject"
     *    kind "Makefile"
     *
     *    buildcommands {
     *       "make %{cfg.buildcfg}"
     *    }
     *
     *    cleancommands {
     *       "make clean %{cfg.buildcfg}"
     *    }
     *
     * ```
     */
    buildCommands(...commands: string[]): this;
    /**
     * Specifies the source file file inputs of a custom build command or rule.
     *
     *
     * Premake 5.0 or later.
     * @param inputs The list of input source files.
     *
     */
    buildInputs(...inputs: string[]): this;
    /**
     * Specifies the output location of a toolset's build logs.
     * If a build log path has not been specified, the toolset's default path will be used.
     *
     *
     * Premake 5.0 or later. Currently only implemented for Visual Studio 2010+.
     * @param path The output file system location for the build log file.
     *
     */
    buildLog(path: string): this;
    /**
     * Specifies the text to output to the when a custom build command or rule is executed.
     *
     *
     * Premake 5.0 or later.
     * @param message The text to write to standard output.
     *
     */
    buildMessage(message: string): this;
    /**
     * Passes arguments directly to the compiler command line without translation.
     * If a project includes multiple calls to `buildoptions` the lists are concatenated, in the order in which they appear in the script.
     *
     *
     * Premake 4.0 or later.
     * @param options A list of compiler flags and options, specific to a particular compiler.
     *
     * ### Examples
     * Use `pkg-config` style configuration when building on Linux with GCC. Build options are always compiler specific and should be targeted to a particular toolset.
     *
     * ```lua
     * filter { "system:linux", "action:gmake" }
     *   buildoptions { "`wx-config --cxxflags`", "-ansi", "-pedantic" }
     * ```
     */
    buildOptions(...options: string[]): this;
    /**
     * Specifies the file outputs of a custom build command or rule.
     *
     *
     * Premake 5.0 or later.
     * @param output The file that is created or updated by the custom build command or rule.
     *
     */
    buildOutputs(...output: string[]): this;
    /**
     * Sets whether or not the compiler should build STL modules.
     *
     *
     * Premake 5.0.0 beta 3 or later for Visual Studio 2022 and later.
     * @param value
     * Available options:
     * - `On`
     * - `Off`
     *
     */
    buildStlModules(value: BuildStlModulesType): this;
    /**
     * Sets the [function calling convention](https://en.wikipedia.org/wiki/X86_calling_conventions).
     *
     *
     * Premake 5.0 or later.
     * @param value
     * Available options:
     * - `Cdecl`
     * - `FastCall`
     * - `StdCall`
     * - `VectorCall`
     *
     */
    callingconvention(value: CallingconventionType): this;
    /**
     *
     *
     *
     * Premake 5.0.0 alpha 12 or later.
     * @param value
     * Available options:
     * - `Default`: the default C dialect for the toolset
     * - `C89`: ISO C89
     * - `C90`: ISO C90
     * - `C99`: ISO C99
     * - `C11`: ISO C11
     * - `C17`: ISO C17
     * - `C23`: ISO C23
     * - `gnu89`: GNU dialect of ISO C89
     * - `gnu90`: GNU dialect of ISO C90
     * - `gnu99`: GNU dialect of ISO C99
     * - `gnu11`: GNU dialect of ISO C11
     * - `gnu17`: GNU dialect of ISO C17
     * - `gnu23`: GNU dialect of ISO C23
     *
     */
    cDialect(value: CDialectType): this;
    /**
     * Set the character encoding.
     *
     *
     * Premake 5.0 or later.
     * @param value
     * Available options:
     * - `Default`: The default encoding for the toolset; usually `Unicode`.
     * - `MBCS`: Multi-byte Character Set; currently Visual Studio only.
     * - `Unicode`: Unicode character encoding.
     * - `ASCII`: No actual character set.
     *
     */
    characterSet(value: CharacterSetType): this;
    /**
     * Enables clang-tidy code analysis for Visual Studio.
     *
     * The `clangtidy` option enables running clang-tidy code analysis in Visual Studio projects.
     *
     *
     * Premake 5.0.0 beta 3 or later for Visual Studio 2019 and later.
     * @param value
     * Available options:
     * - `On`
     * - `Off`
     *
     */
    clangTidy(value: boolean): this;
    /**
     * Specifies one or more shell commands to be executed to clean a [Makefile project](Makefile-Projects.md).
     *
     *
     * Premake 5.0 or later.
     * @param commands Specifies a list of one or more shell commands to be executed. The commands may use tokens.
     *
     * ### Examples
     * Use a [Makefile project](Makefile-Projects.md) to execute an external makefile.
     *
     * ```lua
     * workspace "MyWorkspace"
     *    configurations { "Debug", "Release" }
     *
     * project "MyProject"
     *    kind "Makefile"
     *
     *    buildcommands {
     *       "make %{cfg.buildcfg}"
     *    }
     *
     *    rebuildcommands {
     *       "make %{cfg.buildcfg} rebuild"
     *    }
     *
     *    cleancommands {
     *       "make clean %{cfg.buildcfg}"
     *    }
     *
     * ```
     */
    cleanCommands(...commands: string[]): this;
    /**
     * Specifies one or more file extensions to find and remove when cleaning the project.
     *
     *
     * Premake 5.0 or later. This function is currently implemented only for Visual Studio 201x.
     * @param file_extensions A list of dot-prefixed file extensions to be cleaned.
     *
     * ### Examples
     * Remove .zip files from the output directory when cleaning.
     *
     * ```lua
     * cleanextensions { ".zip" }
     * ```
     */
    cleanExtensions(...file_extensions: string[]): this;
    /**
     * Enables Microsoft's Common Language Runtime for a project or configuration.
     * See [/clr (Common Language Runtime Compilation)](http://msdn.microsoft.com/en-us/library/k8d11d4s.aspx) in the Visual Studio documentation for more information.
     *
     *
     * Premake 5.0.
     * @param value Specifies the level of Common Language Runtime (CLR) support.
     * Available options:
     * - `Off`: No CLR support.
     * - `On`: Enable CLR support.
     * - `Pure`: Enable pure mode MSIL. Equivalent to 'On' for .NET projects.
     * - `Safe`: Enable verifiable MSIL. Equivalent to 'On' for .NET projects.
     * - `Unsafe`: Enable unsafe operations. Equivalent to 'On' for Managed C++ projects.
     * - `NetCore`
     *
     * ### Examples
     * Set up a managed C++ project.
     *
     * ```lua
     * project "MyProject"
     *   kind "ConsoleApp"
     *   language "C++"
     *   clr "On"
     * ```
     *
     * Enable unsafe code in a C# project.
     *
     * ```lua
     * project "MyProject"
     *   kind "ConsoleApp"
     *   language "C#"
     *   clr "Unsafe"
     * ```
     */
    clr(value: ClrType): this;
    /**
     *
     *
     *
     * Premake 5.0.0 alpha 13 or later. The options **Module**, **ModulePartition** and **HeaderUnit** are only available in Premake 5.0-beta1 or later and only implemented for Visual Studio 2019+.
     * @param value Specifies the compilation mode.
     * Available options:
     * - `Default`: Compile based on file extensions that have been built into premake.
     * - `C`: Compile as a C source file.
     * - `C++`: Compile as a C++ source file.
     * - `Objective-C`: Compile as an Objective-C source file.
     * - `Objective-C++`: Compile as an Objective-C++ source file.
     * - `Module`: Compile as a C++20 module interface unit.
     * - `ModulePartition`: Compile as a C++20 module interface partition.
     * - `HeaderUnit`: Compile as a C++20 header unit.
     *
     * ### Examples
     * ```lua
     * filter { "files:**.c" }
     *     compileas "C++"
     * ```
     */
    compileAs(value: CompileAsType): this;
    /**
     * Specify if generated file from [`buildcommands`](buildcommands.md) should be compiled or not.
     *
     *
     * Premake 5.0.0 alpha 12 or later.
     * @param value
     * Available options:
     * - `on`: Generated file should be compiled.
     * - `off`: Generated file should not be compiled.
     *
     * ### Examples
     * ```lua
     * filter "files:**.cpp.in"
     *   buildmessage "generate %{file.basename} from %{file.relpath}"
     *   buildoutputs { "%{cfg.objdir}/%{file.basename}") }
     *   buildcommands { "MyScript %[%{!file.abspath}] %[%{!cfg.objdir}/%{file.basename}]" }
     *   compilebuildoutputs "on"
     * filter "files:**.h.in"
     *   buildmessage "generate %{file.basename} from %{file.relpath}"
     *   buildoutputs { "%{cfg.objdir}/%{file.basename}") }
     *   buildcommands { "MyScript %[%{!file.abspath}] %[%{!cfg.objdir}/%{file.basename}]" }
     *   compilebuildoutputs "off"
     * filter {}
     * ```
     */
    compileBuildOutputs(value: boolean): this;
    /**
     * - This page was auto-generated. Feel free to help us improve the documentation by creating a pull request.
     *
     *
     * Premake 5.0.0 beta 1 or later.
     * @param value needs documentation.
     *
     */
    conformancemode(value: boolean): this;
    /**
     * Enables the WinRT extension, C++/CX, for the specified projects/files.
     *
     *
     * Premake 5.0.0 Beta 2 or later and only implemented for Visual Studio 2019+.
     * @param value Specifies whether the WinRT extension is enabled for the specified projects/files.
     * Available options:
     * - `Default`: Compiles the file using the default for the toolset. (Default is `Off`)
     * - `On`: Compiles the file with the WinRT extension enabled.
     * - `Off`: Compiles the file without the WinRT extension enabled.
     *
     * ### Examples
     * ```lua
     * filter { "files:**_winrt.cpp" }
     *     consumewinrtextension "On"
     * ```
     */
    consumeWinRtExtension(value: boolean): this;
    /**
     * Specifies a list of libraries or assembly references which should be copied to the target directory as part of the build. Refer to the Visual Studio C# project feature of the same name.
     * If a project includes multiple calls to `copylocal` the lists are concatenated, in the order in which they appear in the script.
     *
     * Note that, by default, all referenced non-system assemblies in a C# project are copied. This function only needs to called when a subset of the referenced assemblies should be copied. To disable copying of *all* references, use the `NoLocalCopy` build flag instead (see Examples, below).
     *
     *
     * Premake 5.0 and later. This feature is currently only supported for Visual Studio C# projects.
     * @param libraries A list of the libraries or assemblies to be copied as part of the build.
     *
     * ### Examples
     * Copy only the **Renderer** and **Physics** assemblies to the target directory; do not copy **nunit.framework**. Note that the links may refer to project or assembly references.
     *
     * ```lua
     * links { "Renderer", "Physics", "nunit.framework" }
     * copylocal { "Renderer", "Physics" }
     * ```
     *
     * The link should be specified in exactly the same way in both `links()` and `copylocal()`.
     *
     * ```lua
     * links { "Renderer", "../ThirdParty/nunit.framework" }
     * copylocal { "../ThirdParty/nunit.framework" }
     * ```
     *
     * If you want to prevent any assemblies from being copied, use the **NoLocalCopy** flag instead.
     *
     * ```lua
     * flags { "NoCopyLocal" }
     * ```
     */
    copyLocal(libraries: any): this;
    /**
     *
     *
     *
     * Premake 5.0.0 alpha 12 or later.
     * @param value Specifies the C++ dialect to be used.
     * Available options:
     * - `Default`: The default C++ dialect for the toolset.
     * - `C++latest`: The latest C++ dialect for the toolset or action where available, otherwise the latest C++ dialect supported by Premake.
     * - `C++98`: ISO C++98.
     * - `C++0x`: ISO C++11 Draft.
     * - `C++11`: ISO C++11.
     * - `C++1y`: ISO C++14 Draft.
     * - `C++14`: ISO C++14.
     * - `C++1z`: ISO C++17 Draft.
     * - `C++17`: ISO C++17.
     * - `C++2a`: ISO C++20 Draft.
     * - `C++20`: ISO C++20.
     * - `C++2b`: ISO C++23 Draft.
     * - `C++23`: ISO C++23.
     * - `gnu++98`: GNU dialect of ISO C++98.
     * - `gnu++0x`: GNU dialect of ISO C++11 Draft.
     * - `gnu++11`: GNU dialect of ISO C++11.
     * - `gnu++1y`: GNU dialect of ISO C++14 Draft.
     * - `gnu++14`: GNU dialect of ISO C++14.
     * - `gnu++1z`: GNU dialect of ISO C++17 Draft.
     * - `gnu++17`: GNU dialect of ISO C++17.
     * - `gnu++2a`: GNU dialect of ISO C++20 Draft.
     * - `gnu++20`: GNU dialect of ISO C++20.
     * - `gnu++2b`: GNU dialect of ISO C++23 Draft.
     * - `gnu++23`: GNU dialect of ISO C++23.
     *
     */
    cppDialect(value: CppDialectType): this;
    /**
     * Specifies the C# language level.
     *
     *
     * Premake 5.0 or later.
     * @param value Specifies the C# language level.
     *
     */
    csVersion(value: string): this;
    /**
     * Only used by Visual Studio .NET targets.
     *
     * Maps to `<CustomToolNamespace>` MSBuild element.
     *
     *
     * Premake 5.0.0 alpha 12 or later.
     * @param value Needs documentation.
     *
     */
    customToolNamespace(value: string): this;
    /**
     * Specifies a list of arguments to pass to the application when run under the debugger.
     * Note that this setting is not implemented for Xcode 3, which requires a per-user configuration file in order to make it work.
     *
     * In Visual Studio, this file can be overridden by a per-user configuration file (such as `ProjectName.vcproj.MYDOMAIN-MYUSERNAME.user`). Removing this file (which is done by Premake's clean action) will restore the default settings.
     *
     *
     * Premake 4.4 or later.
     * @param args A Lua list of arguments to provide to the executable while debugging.
     *
     * ### Examples
     * ```lua
     * filter { "configurations:Debug" }
     *    debugargs { "--append", "somefile.txt" }
     * ```
     */
    debugArgs(...args: string[]): this;
    /**
     * Specifies the command to launch a project's target when debugging.
     * In Visual Studio, this file can be overridden by a per-user configuration file (such as `ProjectName.vcproj.MYDOMAIN-MYUSERNAME.user`). Removing this file (which is done by Premake's clean action) will restore the default settings.
     *
     *
     * Premake 5.0 or later.
     * @param command The command to run to start the target.
     *
     */
    debugCommand(command: string): this;
    /**
     * Specifies commands to be executed upon connection of the debugger to a remote process.
     *
     *
     * Premake 5.0 or later.
     * @param commands A list of commands to execute upon connection of the debugger to a remote process.
     *
     */
    debugConnectCommands(...commands: string[]): this;
    /**
     * Sets the working directory for the integrated debugger.
     * Note that this settings is not implemented for Xcode, which requires a per-user configuration file in order to make it work.
     *
     * In Visual Studio, this file can be overridden by a per-user configuration file (such as `ProjectName.vcproj.MYDOMAIN-MYUSERNAME.user`). Removing this file (which is done by Premake's clean action) will restore the default settings.
     *
     *
     * Premake 4.4 or later.
     * @param path The path to the working directory, relative to the currently executing script file.
     *
     * ### Examples
     * ```lua
     * filter { "configurations:Debug" }
     *    debugdir "bin/debug"
     * ```
     */
    debugDir(path: string): this;
    /**
     * Specifies environment variables for the debug session.
     *
     *
     * Premake 5.0 or later.
     * @param envs A list of environment variable definitions for the debug session.
     *
     */
    debugEnvs(...envs: string[]): this;
    /**
     * Specifies to use the 'extended-remote' protocol, which instructs GDB to maintain a persistent connection to gdbserver.
     *
     *
     * Premake 5.0 or later.
     * @param enabled Specifies whether to use the 'extended remote' protocol.
     *
     */
    debugExtendedProtocol(enabled: boolean): this;
    /**
     * Specifies the desired format of the debug information written to the output binaries.
     *
     *
     * Premake 5.0 or later.
     * @param format Specifies the desired debug format.
     * Available options:
     * - `Default`: Specifies default debug format should be used by toolset.
     * - `c7`: Specifies that MSVC should store debuginfo in the objects rather than a separate .pdb file.
     * - `Dwarf`
     * - `SplitDwarf`
     *
     */
    debugFormat(format: DebugFormatType): this;
    /**
     *
     *
     *
     * Premake 5.0.0 alpha 12 or later.
     * @param value
     * Available options:
     * - `Default`: needs documentation.
     * - `GDB`: needs documentation.
     * - `LLDB`: needs documentation.
     * - `VisualStudioLocal`: needs documentation.
     * - `VisualStudioRemote`: needs documentation.
     * - `VisualStudioWebBrowser`: needs documentation.
     * - `VisualStudioWebService`: needs documentation.
     *
     */
    debugger(value: DebuggerType): this;
    /**
     * - This page was auto-generated. Feel free to help us improve the documentation by creating a pull request.
     *
     *
     * Premake 5.0.0 alpha 14 or later.
     * @param value
     * Available options:
     * - `Local`: needs documentation
     * - `Remote`: needs documentation
     * - `WebBrowser`: needs documentation
     * - `WebService`: needs documentation
     *
     */
    debuggerFlavor(value: DebuggerFlavorType): this;
    /**
     *
     *
     *
     * Premake 5.0.0 alpha 12 or later.
     * @param value
     * Available options:
     * - `Mixed`: Enables simultaneous debugging of native and .NET Framework code.
     * - `NativeOnly`: Restricts debugging to native code only.
     * - `ManagedOnly`: Restricts debugging to managed code only.
     * - `NativeWithManagedCore`: Enables simultaneous debugging of native and .NET Core code.
     *
     */
    debuggerType(value: DebuggerTypeType): this;
    /**
     * Specifies the remote debug port.
     *
     *
     * Premake 5.0 or later.
     * @param portnumber An integer port number for the debugger to connect on.
     *
     */
    debugPort(portnumber: any): this;
    /**
     * Specifies the remote debugging target.
     *
     *
     * Premake 5.0 or later.
     * @param host Specifies a host to connect to when starting a remote debug session.
     *
     */
    debugRemoteHost(host: string): this;
    /**
     * Specifies a list of paths to search for source code while debugging.
     *
     *
     * Premake 5.0 or later.
     * @param paths A list of paths that the debugger will use to search for source files.
     *
     */
    debugSearchPaths(...paths: string[]): this;
    /**
     * Specifies commands to be executed immediately as the debugger starts, before connecting to the target process.
     *
     *
     * Premake 5.0 or later.
     * @param commands A list of commands to execute immediately as the debugger starts, before connecting to the target process.
     *
     */
    debugStartupCommands(...commands: string[]): this;
    /**
     * Adds preprocessor or compiler symbols to a project.
     *
     *
     * Premake 4.0 or later.
     * @param symbols Specifies a list of symbols to be defined.
     *
     * ### Examples
     * Define two new symbols in the current project.
     *
     * ```lua
     * defines { "DEBUG", "TRACE" }
     * ```
     *
     * Symbols may also assign values.
     *
     * ```lua
     * defines { "CALLSPEC=__dllexport" }
     * ```
     */
    defines(...symbols: string[]): this;
    /**
     * Specify one or more non-linking project build order dependencies.
     *
     *
     * 5.0 or later.
     * @param project_names One or more sibling project names.
     *
     */
    dependsOn(...project_names: string[]): this;
    /**
     * Disables specific compiler warnings.
     *
     *
     * Premake 5.0 or later.
     *
     * Xcode project generation does not yet support `disablewarnings`. As a workaround, you can use `xcodebuildsettings` like this:
     *
     * ```lua
     * xcodebuildsettings {
     *     WARNING_CFLAGS = "-Wall -Wextra " ..
     *         "-Wno-missing-field-initializers " ..
     *         "-Wno-unknown-pragmas " ..
     *         "-Wno-unused-parameter " ..
     *         "-Wno-unused-local-typedef " ..
     *         "-Wno-missing-braces " ..
     *         "-Wno-microsoft-anon-tag "
     * }
     * ```
     * @param warnings A list of warnings to disable.
     *
     * ### Examples
     * Disable the GCC warning about using old-style C casts (`-Wno-old-style-cast` command line argument):
     *
     * ```lua
     * filter "options:cc=gcc"
     *   disablewarnings "old-style-cast"
     * ```
     */
    disableWarnings(...warnings: string[]): this;
    /**
     * Selects a .NET framework version.
     * This value currently is only applied to Visual Studio 2005 or later, and GNU makefiles using Mono. If no .NET framework version is specified the toolset default is used.
     *
     *
     * Premake 5.0 or later.
     * @param version Selects a .NET framework version.
     * Available options:
     * - `1.0`
     * - `1.1`
     * - `2.0`
     * - `3.0`
     * - `3.5`
     * - `4.0`
     * - `4.5`
     * - `4.6`
     *
     * ### Examples
     * Use the .NET framework 3.0.
     *
     * ```lua
     * dotnetframework "3.0"
     * ```
     */
    dotNetFramework(version: string): this;
    /**
     * Sets the DPI awareness settings.
     *
     *
     * Premake 5.0 or later.
     * @param value
     * Available options:
     * - `Default`: Use the toolset's default setting for DPI awareness.
     * - `None`: Turn off DPI awareness.
     * - `High`: Turn on DPI awareness.
     * - `HighPerMonitor`: Turn on DPI awareness per monitor.
     *
     * ### Examples
     * ```lua
     * -- Turn on DPI awareness
     * dpiawareness "High"
     * ```
     */
    dpiAwareness(value: DpiAwarenessType): this;
    /**
     * Turns the edit-and-continue features of a toolset or platform on and off.
     * If no value is set for a configuration, the toolset's default setting (usually "On") will be used.
     *
     *
     * Premake 5.0 or later.
     * @param value A boolean value representing whether edit-and-continue features are enabled.
     * Available options:
     * - `On`
     * - `Off`
     * - `Default`: Acts the same as specifying no value, using the toolset's default setting.
     *
     * ### Examples
     * ```lua
     * -- Turn off edit and continue
     * editandcontinue "Off"
     * ```
     */
    editAndContinue(value: EditAndContinueType): this;
    /**
     * Sets value of the *Embed* field in Xcode under *Frameworks, Libraries, and Embedded Content* to **Embed Without Signing**
     *
     * This results in the framework being copied into the built app bundle during the *Embed Libraries* build phase.
     *
     *
     * Premake 5.0.0 beta 1 or later.
     * @param value The name of the content to be embedded.
     *
     * ### Examples
     * ```lua
     * embed {
     * 	"SDL2.dylib",
     * 	"bar.framework"
     * }
     * ```
     */
    embed(value: any): this;
    /**
     * Sets value of the *Embed* field in Xcode under *Frameworks, Libraries, and Embedded Content* to **Embed & Sign**
     *
     * This results in the framework being copied into the built app bundle during the *Embed Libraries* build phase and signed.
     *
     *
     * Premake 5.0.0 beta 1 or later.
     * @param value The name of the content to be embedded and signed.
     *
     * ### Examples
     * ```lua
     * embedAndSign {
     * 	"SDL2.framework",
     * 	"Another.framework"
     * }
     * ```
     */
    embedAndSign(value: any): this;
    /**
     * - This page was auto-generated. Feel free to help us improve the documentation by creating a pull request.
     *
     *
     * Premake 5.0.0 alpha 16 or later.
     * @param value Needs documentation.
     *
     */
    enableDefaultCompileItems(value: boolean): this;
    /**
     * Sets whether or not the compiler should enable C++20 modules.
     *
     *
     * Premake 5.0.0 beta 3 or later for Visual Studio 2019 and later.
     * @param value
     * Available options:
     * - `On`
     * - `Off`
     *
     */
    enableModules(value: EnableModulesType): this;
    /**
     * Enables Unity Builds in Visual Studio, also known as Jumbo Builds
     *
     *
     * Premake 5.0 and later. Versions are currently only implemented for Visual Studio 2017+.
     * @param value
     * Available options:
     * - `On`: Enables Unity Builds.
     * - `Off`: Disables Unity Builds.
     *
     * ### Examples
     * Enable Unity Builds.
     *
     * ```lua
     * enableunitybuild "On"
     * ```
     */
    enableUnityBuild(value: EnableUnityBuildType): this;
    /**
     * Enables specific compiler warnings.
     *
     *
     * Premake 5.0 or later.
     * @param warnings A list of warnings to enable.
     *
     */
    enableWarnings(...warnings: string[]): this;
    /**
     * Specifies the target endian for endian-agnostic architectures.
     *
     *
     * Premake 5.0 or later.
     * @param value Specifies the desired endian.
     * Available options:
     * - `Default`: Use the toolset's default endian.
     * - `Little`: Specify little-endian.
     * - `Big`: Specify big-endian.
     *
     */
    endian(value: EndianType): this;
    /**
     * Specify the program entry point, e.g. `main()`.
     *
     *
     * Premake 5.0 or later.
     * @param value The name of the program's entry point function.
     *
     * ### Examples
     * Use the Microsoft Windows console application entry point instead of the usual `WinMain()`.
     *
     * ```lua
     * entrypoint "mainCRTStartup"
     * ```
     */
    entryPoint(value: string): this;
    /**
     * Enable or disable exception handling.
     *
     *
     * Premake 5.0 or later.
     * @param value
     * Available options:
     * - `Default`: Use the toolset's default setting for exceptions.
     * - `On`: Turn on exceptions.
     * - `Off`: Turn off exceptions.
     * - `SEH`: Turn on exceptions and use structured exception handling when available.
     * - `CThrow`
     * - `UnwindTables`
     *
     */
    exceptionHandling(value: ExceptionHandlingType): this;
    /**
     * Treats all headers included by `#include <header>`, where the header file is enclosed in angle brackets (`< >`), as external headers.
     *
     *
     * Premake 5.0 or later.
     * Visual Studio 2019 version or later.
     * @param value
     * Available options:
     * - `On`: Treat headers included with angle brackets as external.
     * - `Off`: Default. Headers are treated normally.
     *
     */
    externalAngleBrackets(value: ExternalAngleBracketsType): this;
    /**
     * Specifies the include file search paths for the compiler, treating headers included from these paths as external.
     * For Visual Studio, these paths are placed in the "VC++ Directories" properties panel. For GCC and Clang, they are preceded with the `-isystem` flag, rather than `-I`. For toolsets which do not support the concept of external include directories, they are treated as a normal include directory.
     *
     * Include files located via an external include directory are treated specially, see [externalwarnings](externalwarnings.md).
     *
     *
     * Premake 5.0 or later.
     * @param paths Specifies a list of include file search directories. Paths should be specified relative to the currently running script file.
     *
     * ### Examples
     * Define two external include file search paths.
     *
     * ```lua
     * externalincludedirs { "../lua/include", "../zlib" }
     * ```
     *
     * You can also use wildcards to match multiple directories. The * will match against a single directory, ** will recurse into subdirectories as well.
     *
     * ```lua
     * externalincludedirs { "../includes/**" }
     * ```
     */
    externalIncludeDirs(...paths: string[]): this;
    /**
     * Controls the level of warnings that are shown by the compiler for headers that are considered external.
     * If no value is set for a configuration, the toolset's default warning level will be used.
     *
     *
     * Premake 5.0 or later.
     * Visual Studio 2019 version or later.
     * @param value
     * Available options:
     * - `Off`: Do not show any warning messages.
     * - `Default`: Use the toolset's default warning level.
     * - `Extra`: Enable the toolset's maximum warning level.
     * - `High`: Enable the toolset's maximum warning level.
     * - `Everything`: Enable the toolset's maximum warning level.
     *
     */
    externalWarnings(value: ExternalWarningsType): this;
    /**
     * Specifies specific compiler warnings that should be interpreted as errors.
     *
     *
     * Premake 5.0 or later. Special value `All` available since Premake 5.0-beta5 or later.
     * @param warnings Specifies specific compiler warnings that should be interpreted as errors.
     * Available options:
     * - `All`: Treat all compiler warnings as errors.
     *
     * ### Examples
     * ```lua
     * filter { "toolset:msc" }
     * 	fatalwarnings { "4035" } -- 'function': no return value
     *
     * filter { "toolset:clang" }
     * 	fatalwarnings { "-Wreturn-type" }
     *
     * filter {}
     * ```
     */
    fatalWarnings(...warnings: string[]): this;
    /**
     * Adds files to a project.
     *
     *
     * @param file_list Specifies one or more file patterns. File paths should be specified relative to the currently executing script file. File patterns may contain the `*` wildcard to match against files in the current directory, or the `**` wildcard to perform a recursive match.
     *
     * ### Examples
     * Add two files from to the current project, from the same directory that contains the script.
     *
     * ```lua
     * files { "hello.cpp", "goodbye.cpp" }
     * ```
     *
     * Add all C++ files from the **src/** directory to the project.
     *
     * ```lua
     * files { "src/*.cpp" }
     * ```
     *
     * Add all C++ files from the **src/** directory and any subdirectories.
     *
     * ```lua
     * files { "src/**.cpp" }
     * ```
     *
     * Add files for specific systems; might not work with all exporters.
     *
     * ```lua
     * filter "system:Windows"
     *   files { "src/windows/*.h", "src/windows/*.cpp" }
     *
     * filter "system:MacOSX"
     *   files { "src/mac/*.h", "src/mac/*.cpp" }
     * ```
     */
    files(...file_list: string[]): this;
    /**
     * Specifies build flags to modify the compiling or linking process.
     *
     *
     * Flags are currently available in Premake 5.0 beta3, but are considered deprecated. Future releases will be deprecating and removing all flags in favor of dedicated APIs.
     * @param flag_list Specifies build flags to modify the compiling or linking process.
     * Available options:
     * - `ExcludeFromBuild`: Exclude a source code file from the build, for the current configuration.
     * - `FatalCompileWarnings`: Treat compiler warnings as errors. Deprecated in Premake 5.0.0-beta4. Use `fatalwarnings` API instead.
     * - `FatalLinkWarnings`: Treat linker warnings as errors. Deprecated in Premake 5.0.0-beta4. Use `fatalwarnings` API instead.
     * - `FatalWarnings`: Treat all warnings as errors; equivalent to FatalCompileWarnings, FatalLinkWarnings. Deprecated in Premake 5.0.0-beta4. Use `fatalwarnings` API instead.
     * - `LinkTimeOptimization`: Enable link-time (i.e. whole program) optimizations. Deprecated in Premake 5.0.0-beta4. Use `linktimeoptimization` API instead.
     * - `Maps`: Enable Generate Map File for Visual Studio
     * - `MFC`: Enable support for Microsoft Foundation Classes. Deprecated in Premake 5.0.0-beta4. Use `mfc` API instead.
     * - `MultiProcessorCompile`: Enable Visual Studio to use multiple compiler processes when building.
     * - `No64BitChecks`: Disable 64-bit portability warnings.
     * - `NoBufferSecurityCheck`: Turn off stack protection checks.
     * - `NoCopyLocal`: Prevent referenced assemblies from being copied to the target directory (C#)
     * - `NoFramePointer`: Disable the generation of stack frame pointers.
     * - `NoImplicitLink`: Disable Visual Studio's default behavior of automatically linking dependent projects.
     * - `NoImportLib`: Prevent the generation of an import library for a Windows DLL.
     * - `NoIncrementalLink`: Disable support for Visual Studio's incremental linking feature.
     * - `NoManifest`: Prevent the generation of a manifest for Windows executables and shared libraries.
     * - `NoMinimalRebuild`: Disable Visual Studio's minimal rebuild feature. Visual Studio has deprecated this feature as of vs2015.
     * - `NoPCH`: Disable precompiled header support. If not specified, the toolset default behavior will be used.
     * - `NoRuntimeChecks`: Disable Visual Studio's default stack frame and uninitialized variable checks on debug builds.
     * - `OmitDefaultLibrary`: Omit the specification of a runtime library in object files.
     * - `RelativeLinks`: Forces the linker to use relative paths to libraries instead of absolute paths.
     * - `ShadowedVariables`: Warn when a variable, type declaration, or function is shadowed.
     * - `UndefinedIdentifiers`: Warn if an undefined identifier is evaluated in an #if directive.
     * - `WPF`: Mark the project as using Windows Presentation Framework, rather than WinForms.
     * - `DebugEnvsDontMerge`
     * - `DebugEnvsInherit`
     *
     * ### Examples
     * ```lua
     * -- Enable link-time (i.e. whole program) optimizations.
     * flags { "LinkTimeOptimization" }
     *
     * ```
     *
     * [1]: https://docs.microsoft.com/en-us/cpp/build/reference/gm-enable-minimal-rebuild?view=vs-2017
     * [2]: http://msdn.microsoft.com/en-us/library/8wtf2dfz.aspx
     */
    flags(...flag_list: FlagsType[]): this;
    /**
     * Specifies the floating point ABI to use.
     *
     *
     * Premake 5.0.0 alpha 14 or later.
     * @param value
     * Available options:
     * - `soft`: Compiler will generate library calls for floating-point operations.
     * - `softfp`: Compiler will generate code using hardware floating-point instructions, but still uses the soft-float calling conventions.
     * - `hard`: Compiler will generate floating-point instructions using FPU-specific calling conventions.
     *
     */
    floatAbi(value: FloatAbiType): this;
    /**
     * Specifies the style of floating point math which should be used.
     * If no value is set for a configuration, the toolset's default floating point settings will be used.
     *
     *
     * Premake 5.0 or later.
     * @param value Specifies the desired style of floating point math.
     * Available options:
     * - `Default`: Use the toolset's floating point settings.
     * - `Fast`: Enable floating point optimizations at the expense of accuracy.
     * - `Strict`: Improve floating point consistency at the expense of performance.
     *
     */
    floatingPoint(value: FloatingPointType): this;
    /**
     *
     *
     *
     * Premake 5.0.0 alpha 12 or later.
     * @param value
     * Available options:
     * - `on`
     * - `off`
     *
     */
    floatingPointExceptions(value: boolean): this;
    /**
     * Applies one or more "forced include" files to the project; these includes behave as it they had been injected into the first line of each source file in the project.
     *
     *
     * Premake 5.0 or later.
     * @param files Specifies a list of files to be force included. Paths should be specified relative to the currently running script file.
     *
     */
    forceIncludes(files: any): this;
    /**
     * Applies one or more "forced using" files to the project; these includes behave as it they had been injected into the first line of each source file in the project.
     *
     *
     * Premake 5.0 or later.
     * @param files Specifies a list of files to be force included. Paths should be specified relative to the currently running script file.
     *
     */
    forceUsings(...files: string[]): this;
    /**
     * Specifies whether to generate code for a hardware FPU.
     *
     *
     * Premake 5.0 or later.
     * @param value
     * Available options:
     * - `Software`: Generate software floating-point emulation code.
     * - `Hardware`: Generate code for a hardware FPU.
     *
     */
    fpu(value: FpuType): this;
    /**
     * - This page was auto-generated. Feel free to help us improve the documentation by creating a pull request.
     *
     *
     * Premake 5.0.0 alpha 11 or later.
     * @param value Needs documentation.
     *
     */
    frameworkDirs(...value: string[]): this;
    /**
     *
     *
     *
     * Premake 5.0.0 alpha 12 or later.
     * @param value
     * Available options:
     * - `on`
     * - `off`
     *
     */
    functionLevelLinking(value: boolean): this;
    /**
     * Sets a prefix to be prepended to commands used by the GCC toolchain.
     * GCC toolsets, and cross-compilers in particular, typically have some common prefix prepended to all tools in the GCC suite. This prefix will be prepended to all such tools.
     *
     * Prefixes are usually composed of multiple segments separated by '-', and the prefix should contain the final dash.
     * For instance, a toolchain of the style `powerpc-eabi-gcc` should have gccprefix `powerpc-eabi-`.
     *
     *
     * Premake 5.0 or later.
     * @param gccprefix A string which is to be prepended to the GCC tools.
     *
     * ### Examples
     * Set a GCC prefix to be prepended to the compiler tools.
     *
     * ```lua
     * gccprefix "powerpc-eabi-"
     * ```
     */
    gccPrefix(gccprefix: string): this;
    /**
     * Specifies the default libraries to be ignored for a project.
     *
     *
     * Premake 5.0 or later.
     * @param libraries A list of library names. If a valid extension isn't present, `.lib` will be automatically appended, similar to [links](links.md). Currently, the valid extensions are `.lib` and `.obj`.
     *
     * ### Examples
     * Specify `MSVCRT.lib` as a default library to ignore.
     *
     * ```lua
     * project "MyProject"
     *   ignoredefaultlibraries { "MSVCRT" }
     * ```
     */
    ignoreDefaultLibraries(libraries: any): this;
    /**
     * Passes arguments directly to the image tool command line without translation.
     * If a project includes multiple calls to `imageoptions` the lists are concatenated, in the order in which they appear in the script.
     *
     * Image options are currently only supported for Xbox 360 targets.
     *
     *
     * Premake 5.0 or later.
     * @param options A list of image tools flags and options.
     *
     */
    imageOptions(...options: string[]): this;
    /**
     * Sets the file name of the deployment image produced by the build.
     * This value is currently only used by the Xbox 360.
     *
     *
     * Premake 5.0 or later.
     * @param path The full path for the image file, relative to the currently executing script file.
     *
     */
    imagePath(path: string): this;
    /**
     * Specifies the import library output directory. Import libraries are generated for Windows DLL projects.
     * By default, the generated project files will place the import library in the same directory as the compiled binary. The `implibdir` function allows you to change this location.
     *
     *
     * Premake 4.0 or later.
     * @param path The output directory for the library, relative to the currently executing script file.
     *
     * ### Examples
     * ```lua
     * implibdir "../Libraries"
     * ```
     */
    impLibDir(path: string): this;
    /**
     * Specifies the import library file extension. Import libraries are generated for Windows DLL projects.
     * By default, the toolset static library file extension will be used (`.lib` with Windows tools, `.a` with GNU tools). The `implibextension` function allows you to change this default.
     *
     *
     * Premake 4.0 or later.
     * @param ext The new file extension, including the leading dot.
     *
     */
    impLibExtension(ext: string): this;
    /**
     * Specifies the import library base file name. Import libraries are generated for Windows DLL projects.
     * By default, the target name will be used as the import library file name. The `implibname` function allows you to change this default.
     *
     *
     * Premake 4.0 or later.
     * @param name The new base file name for the import library.
     *
     */
    impLibName(name: string): this;
    /**
     * Specifies the import library file name prefix. Import libraries are generated for Windows DLL projects.
     * By default, the system naming convention will be used: no prefix on Windows, a prefix of `lib` (as in `libMyProject.a`) on other systems. The `implibprefix` function allows you to change this default.
     *
     *
     * Premake 4.0 or later.
     * @param prefix The new file name prefix.
     *
     * ### Examples
     * ```lua
     * implibprefix "plugin"
     * ```
     *
     * The prefix may also be set to an empty string for no prefix.
     *
     * ```lua
     * implibprefix ""
     * ```
     */
    impLibPrefix(prefix: string): this;
    /**
     * Specifies a file name suffix for the import library base file name. Import libraries are generated for Windows DLL projects.
     *
     *
     * Premake 4.0 or later.
     * @param suffix The new filename suffix.
     *
     * ### Examples
     * ```lua
     * -- Add "-d" to debug versions of files
     * filter { "configurations:Debug" }
     *    implibsuffix "-d"
     * ```
     */
    impLibSuffix(suffix: string): this;
    /**
     * Specifies the include file search paths for the compiler.
     *
     *
     * Premake 4.0 or later.
     * @param paths Specifies a list of include file search directories. Paths should be specified relative to the currently running script file.
     *
     * ### Examples
     * Define two include file search paths.
     *
     * ```lua
     * includedirs { "../lua/include", "../zlib" }
     * ```
     *
     * You can also use wildcards to match multiple directories. The * will match against a single directory, ** will recurse into subdirectories as well.
     *
     * ```lua
     * includedirs { "../includes/**" }
     * ```
     */
    includeDirs(...paths: string[]): this;
    /**
     * Specifies the include directories to parse last per the toolset ordering and marks the directory as an external include directory.  If the exporter or toolset
     * does not support include directory ordering, these directories are added to the external include directory path.
     *
     *
     * Premake 5.0 or later.
     *
     * GCC and Clang are the only toolsets supporting the ordering functionality in the gmakelegacy, gmake, and Codelite exporters.  All exporters and toolsets
     * support appending the directories to the external include directories.
     * @param paths Specifies a list of include file search directories. Paths should be specified relative to the currently running script file. Search order is evaluated from left to right.
     *
     * ### Examples
     * Define two include file search paths.
     *
     * ```lua
     * includedirsafter { "../lua/include", "../zlib" }
     * ```
     *
     * You can also use wildcards to match multiple directories. The * will match against a single directory, ** will recurse into subdirectories as well.
     *
     * ```lua
     * includedirsafter { "../includes/**" }
     * ```
     */
    includeDirsAfter(...paths: string[]): this;
    /**
     * For Visual Studio project files, this controls the generation of the `%(AdditionalDependencies)` entry in the list of libraries that a project links.
     *
     *
     * Visual Studio 2015 and later.
     * Premake 5.0-beta2 or later.
     * @param value Controls the generation of the `%(AdditionalDependencies)` entry in the list of libraries that a project links.
     * Available options:
     * - `On`: The project(s) will inherit library dependencies based on the parent project (if any) and project default settings. This is the default behavior.
     * - `Off`: The project(s) will not inherit any library dependencies. Only explicitly specified dependencies will be linked.
     *
     */
    inheritDependencies(value: boolean): this;
    /**
     * - This page was auto-generated. Feel free to help us improve the documentation by creating a pull request.
     *
     *
     * Premake 5.0.0 alpha 14 or later.
     * @param value
     * Available options:
     * - `Default`
     * - `Hidden`
     *
     */
    inlinesvisibility(value: InlinesvisibilityType): this;
    /**
     * Tells the compiler when it should inline functions.
     *
     *
     * Premake 5.0 or later.
     * @param value
     * Available options:
     * - `Default`: Allow the compiler to use its default inlining behavior.
     * - `Disabled`: Turn off inlining entirely.
     * - `Explicit`: Only inline functions explicitly marked with the `inline` keyword.
     * - `Auto`: Allow the compiler to inline functions automatically.
     *
     */
    inlining(value: InliningType): this;
    /**
     * Replaces some function calls with intrinsic or otherwise special forms of the function that help your application run faster.
     *
     * [Visual Studio 2017's Description of Intrinsics](https://docs.microsoft.com/en-us/cpp/build/reference/oi-generate-intrinsic-functions?view=vs-2017)
     *
     *
     * Premake 5.0.0 alpha 12 or later.
     * @param value
     * Available options:
     * - `on`: Enables intrinsic functions which generate faster, but possibly longer code.
     * - `off`: Disables intrinsic functions.
     *
     */
    intrinsics(value: boolean): this;
    /**
     * - This page was auto-generated. Feel free to help us improve the documentation by creating a pull request.
     *
     *
     * Premake 5.0.0 alpha 14 or later.
     * @param value
     * Available options:
     * - `iPhone/iPod touch`: needs documentation
     * - `iPad`: needs documentation
     * - `Universal`: needs documentation
     *
     */
    iosFamily(value: IosFamilyType): this;
    /**
     * - This page was auto-generated. Feel free to help us improve the documentation by creating a pull request.
     *
     *
     * Premake 5.0.0 alpha 14 or later.
     * @param value
     * Available options:
     * - `MOVBE`: needs documentation
     * - `POPCNT`: needs documentation
     * - `PCLMUL`: needs documentation
     * - `LZCNT`: needs documentation
     * - `BMI`: needs documentation
     * - `BMI2`: needs documentation
     * - `F16C`: needs documentation
     * - `AES`: needs documentation
     * - `FMA`: needs documentation
     * - `FMA4`: needs documentation
     * - `RDRND`: needs documentation
     *
     */
    isaExtensions(...value: IsaExtensionsType[]): this;
    /**
     * Sets the kind of binary object being created by the project or configuration, such as a console or windowed application, or a shared or static library.
     *
     *
     * The **Makefile** kind is available in Premake 5.0 and later, and are supported for Visual Studio and Codelite.
     * The **None** kind is available in Premake 5.0 and later, and are supported for gmakelegacy, gmake, Codelite and Visual Studio.
     * The **Utility** kind is only available for Visual Studio, Codelite and gmake, as well as very limited support in gmakelegacy.
     * The **SharedItems** kind is only available for Visual Studio 2013 and later.
     * @param kind
     * Available options:
     * - `ConsoleApp`: A console or command-line application.
     * - `WindowedApp`: An application which runs in a desktop window. This distinction does not apply on Linux, but is important on Windows and Mac OS X.
     * - `SharedLib`: A shared library or DLL.
     * - `StaticLib`: A static library.
     * - `Makefile`: A special configuration type which calls out to one or more external commands. The actual type of binary created is unspecified. See [Makefile Projects](Makefile-Projects.md) for more information.
     * - `Utility`: A configuration which contains only custom build rules.
     * - `None`: A configuration which is not included in the build. Useful for projects containing only web pages, header files, or support documentation.
     * - `Packaging`: A configuration type to create .androidproj files, which build the apk in an Android application under Visual Studio. _Note, this was previously `AndroidProj`._
     * - `SharedItems`: A special configuration type which doesn't contain any build settings of its own, instead using the build settings of any projects that link it.
     *
     * ### Examples
     * Set the project to build a command-line executable.
     *
     * ```lua
     * kind "ConsoleApp"
     * ```
     *
     * Set the project to build a shared library (DLL).
     *
     * ```lua
     * kind "SharedLib"
     * ```
     *
     * Build either a static or a shared library, depending on the selected build configuration.
     *
     * ```lua
     * workspace "MyWorkspace"
     *    configurations { "DebugLib", "DebugDLL", "ReleaseLib", "ReleaseDLL" }
     *
     * project "MyProject"
     *
     *    filter "*Lib"
     *       kind "StaticLib"
     *
     *    filter "*DLL"
     *       kind "SharedLib"
     * ```
     */
    kind(kind: KindType): this;
    /**
     *
     *
     *
     * Premake 5.0.0 alpha 12 or later.
     * @param value
     * Available options:
     * - `on`
     * - `off`
     *
     */
    largeAddressAware(value: boolean): this;
    /**
     * Specifies the library search paths for the linker.
     * Library search directories are not well supported by the .NET tools. Visual Studio will change relative paths to absolute, making it difficult to share the generated project. MonoDevelop does not support search directories at all, using only the GAC. In general, it is better to include the full (relative) path to the assembly in [links](links.md) instead. C/C++ projects do not have this limitation.
     *
     *
     * Premake 4.0 or later.
     * @param paths Specifies a list of library search directories. Paths should be specified relative to the currently running script file.
     *
     * ### Examples
     * Define two library file search paths.
     *
     * ```lua
     * libdirs { "../lua/libs", "../zlib" }
     * ```
     *
     * You can also use wildcards to match multiple directories. The * will match against a single directory, ** will recurse into subdirectories as well.
     *
     * ```lua
     * libdirs { "../libs/**" }
     * ```
     */
    libDirs(...paths: string[]): this;
    /**
     * Turns on/off the automatic linking of `.obj` files that are output by custom build commands. The default behaviour is to link `.obj` files when they are output by custom build commands.
     *
     *
     * Premake 5.0 or later.
     * @param value A boolean value that can be either 'On' or 'Off'.
     *
     * ### Examples
     * Use [custom build commands](Custom-Build-Commands.md) to copy Wavefront .obj model files around without the linker trying to link them:
     *
     * ```lua
     * filter "models/**.obj"
     * 	-- Copy these files into the target directory while preserving the
     * 	-- folder structure.
     * 	buildcommands {
     * 		os.translateCommands '{mkdir} "%{ path.join(cfg.buildtarget.directory, path.getdirectory(file.relpath)) }"',
     * 		os.translateCommands '{copy} "%{ file.relpath }" "%{ path.join(cfg.buildtarget.directory, path.getdirectory(file.relpath)) }"'
     * 	}
     *
     * 	buildoutputs "%{ path.join(cfg.buildtarget.directory, file.relpath) }"
     *
     * 	-- The default behaviour is to link .obj if a custom build command
     * 	-- outputs them, but we don't want that since these are Wavefront .obj
     * 	-- model files and not object files.
     * 	linkbuildoutputs "Off"
     * ```
     */
    linkBuildOutputs(value: boolean): this;
    /**
     * Specifies the linker.
     *
     *
     * Premake 5.0 beta 3 or later.
     * @param value Specifies the linker.
     * Available options:
     * - `Default`: Uses the toolset platform default linker.
     * - `LLD`: Uses LLVM's LLD linker (supported on `gcc` and `clang` toolsets).
     *
     * ### Examples
     * Sets `LLD` as the linker.
     *
     * ```lua
     * filter { "toolset:clang" }
     *    linker { "LLD" }
     * ```
     */
    linker(value: LinkerType): this;
    /**
     * Specifies specific linker warnings that should be interpreted as errors.
     *
     *
     * Premake 5.0 or later. Special value `All` available since Premake 5.0-beta5 or later.
     * @param warnings Specifies specific linker warnings that should be interpreted as errors.
     * Available options:
     * - `All`: Treat all linker warnings as errors.
     *
     * ### Examples
     * ```lua
     * filter { "toolset:msc" }
     * 	fatalwarnings { "4044" } -- unrecognized option 'option'; ignored
     *
     * filter {}
     * ```
     */
    linkerFatalWarnings(...warnings: string[]): this;
    /**
     * Turns on or off the linkgroups for option for linked libraries.
     *
     * Notes:
     *
     * Projects using GCC or Clang will use order dependent linking by default with the default linker. While it is generally believed to be slower, this option enables order independent linking within a group of libraries by putting them inside of a link-group using the `-Wl,--start-group` and `-Wl,--end-group` linker command line arguments.
     *
     *
     * Premake 5.0-alpha10 or later. GCC and Clang toolsets only. Codelite, gmakelegacy, and gmake exporters only.
     * @param value
     * Available options:
     * - `On`: Turn on link groups.
     * - `Off`: Turn off link groups.
     *
     * ### Examples
     * ```lua
     * project "A"
     *     kind "StaticLib"
     *
     * project "B"
     *     kind "StaticLib"
     *     links { "A" }
     *
     * project "C"
     *     kind "ConsoleApp"
     *     links { "A", "B" }
     *     linkgroups "On"
     * ```
     */
    linkGroups(value: LinkGroupsType): this;
    /**
     * Passes arguments directly to the linker command line without translation.
     *
     *
     * Premake 4.0 or later.
     * @param options A list of linker flags and options, specific to a particular linker.
     *
     * ### Examples
     * Use `pkg-config` style configuration when building on Linux with GCC. Build options are always linker specific and should be targeted to a particular toolset.
     *
     * ```lua
     * filter { "system:linux", "action:gmake" }
     *   linkoptions { "`wx-config --libs`" }
     * ```
     */
    linkOptions(...options: string[]): this;
    /**
     * Specifies a list of libraries and projects to link against.
     *
     *
     * Premake 4.0 or later.
     * @param references A list of library and project names to link against.
     *
     * ### Examples
     * Link against some system libraries.
     *
     * ```lua
     * filter { "system:windows" }
     *    links { "user32", "gdi32" }
     *
     * filter { "system:linux" }
     *    links { "m", "png" }
     *
     * filter { "system:macosx" }
     *    -- OS X frameworks need the extension to be handled properly
     *    links { "Cocoa.framework", "png" }
     * ```
     *
     *   In a workspace with two projects, link the library into the executable. Note that the project name is used to specify the link; Premake will automatically figure out the correct library file name and directory and create a project dependency.
     *
     * ```lua
     * workspace "MyWorkspace"
     *    configurations { "Debug", "Release" }
     *    language "C++"
     *
     *    project "MyExecutable"
     *       kind "ConsoleApp"
     *       files "**.cpp"
     *       links { "MyLibrary" }
     *
     *    project "MyLibrary"
     *       kind "SharedLib"
     *       files "**.cpp"
     * ```
     *
     * You may specify the linking mechanism explicitly for each library.  To set the link type of a library explicitly, add a `:static` or `:shared` suffix to the library.  Note that this functionality is only available for the `gcc` and `clang` toolsets.
     *
     * ```lua
     * workspace "MyWorkspace"
     *    configurations { "Debug", "Release" }
     *    language "C++"
     *
     *    project "MyExecutable"
     *       kind "ConsoleApp"
     *       files "**.cpp"
     *       links { "LibraryA:static", "LibraryB:shared" }
     * ```
     *
     * You may also create links between non-library projects. In this case, Premake will generate a build dependency (the linked project will build first), but not an actual link. In this example, MyProject uses a build dependency to ensure that MyTool gets built first. It then uses MyTool as part of its build process.
     *
     * ```lua
     * workspace "MyWorkspace"
     *    configurations { "Debug", "Release" }
     *    language "C++"
     *
     *    project "MyProject"
     *       kind "ConsoleApp"
     *       files "**.cpp"
     *       links { "MyTool" }
     *       prebuildcommands { "MyTool --dosomething" }
     *
     *    project "MyTool"
     *       kind "ConsoleApp"
     *       files "**.cpp"
     * ```
     */
    links(references: any): this;
    /**
     * Emit each data item in a separate section. This help linker optimizations to remove unused data.
     *
     *
     * Premake 5.0.0 beta 4 or later for Visual Studio 2022 and later, only applies to Visual Studio Android projects.
     * @param value
     * Available options:
     * - `On`
     * - `Off`
     *
     */
    linkSectionData(value: LinkSectionDataType): this;
    /**
     * Emit each function item in a separate section. This help linker optimizations to remove unused data.
     *
     *
     * Premake 5.0.0 beta 4 or later for Visual Studio 2022 and later, only applies to Visual Studio Android projects.
     * @param value
     * Available options:
     * - `On`
     * - `Off`
     *
     */
    linkSectionFunction(value: LinkSectionFunctionType): this;
    /**
     * The **linktimeoptimization** function specifies whether or not the toolset should perform link time optimization.
     *
     *
     * Premake 5.0-beta4 and later
     * @param value Specifies whether or not to use link time optimization.
     * Available options:
     * - `Off`: No LTO to be performed.
     * - `On`: LTO optimization enabled.
     * - `Default`: Default LTO optimizations for the toolset or exporter.
     *
     */
    linkTimeOptimization(value: LinkTimeOptimizationType): this;
    /**
     * Specifies a custom LLVM install location for Visual Studio.
     *
     *
     * Premake 5.0.0 beta 3 or later for Visual Studio 2019 and later.
     * @param path Specifies a directory containing the LLVM installation.
     *
     * ### Examples
     * ```lua
     * llvmdir "/path/to/install"
     * ```
     */
    llvmDir(path: string): this;
    /**
     * Specifies a version for a custom installation of LLVM for Visual Studio.
     *
     *
     * Premake 5.0.0 beta 3 or later for Visual Studio 2019 and later.
     * @param version Specifies the version of the LLVM installation.
     *
     */
    llvmVersion(version: string): this;
    /**
     * Specifies the target locale for the resources in a particular configuration.
     * This value is currently only used for the Microsoft Visual Studio resource compiler in C/C++ projects.
     *
     *
     * Premake 5.0 or later.
     * @param code Specifies the desired locale code.
     *
     */
    locale(code: string): this;
    /**
     * Adds arbitrary GNU make markup to a generated Makefile.
     * Only used for makefile generating actions.
     *
     *
     * Premake 5.0 or later.
     * @param values Specifies one or more lines to be written to the Makefile.
     *
     * ### Examples
     * ```lua
     * makesettings [[
     *   ifeq ($(strip $(DEVKITPPC)),)
     *     $(error "DEVKITPPC environment variable is not set")'
     *   endif
     *   include $(DEVKITPPC)/wii_rules'
     * ]]
     * ```
     */
    makeSettings(...values: string[]): this;
    /**
     * Sets the version of the MFC libraries to link against.
     *
     *
     * Premake 5.0-beta4 or later on Visual Studio.
     * @param value Specifies the desired PIC mode.
     * Available options:
     * - `Default`: Perform the default linkage against the MFC libraries for your project type.
     * - `Off`: Do not link against MFC libraries.
     * - `On`: Link against the MFC libraries corresponding with the runtime type you are using (static or dynamic).
     * - `Static`: Force static linkage to the MFC libraries.
     * - `Dynamic`: Force dynamic linkage to the MFC libraries.
     *
     */
    mfc(value: MfcType): this;
    /**
     * Enables or disables native wchar (wide character) support by the compiler.
     * If no value is set for a configuration, the toolset's default wchar support will be used.
     *
     *
     * Premake 5.0.
     * @param value Specifies the desired state.
     * Available options:
     * - `Default`: Use the toolset's default settings.
     * - `On`: Enable native wide character handling.
     * - `Off`: Disable native wide character handling.
     *
     */
    nativeWChar(value: NativeWCharType): this;
    /**
     * Specifies a list of NuGet packages that this project depends on. Only supported in Visual Studio C++ and C# projects.
     *
     *
     * Premake 5.0 or later.
     * @param references A list of NuGet package names and versions, where the version is separated from the name with a colon.
     *
     * ### Examples
     * Link against some NuGet packages.
     *
     * ```lua
     * project "foo"
     *    nuget { "sdl2.v140:2.0.4", "sdl2.v140.redist:2.0.4" }
     * ```
     */
    nuGet(...references: string[]): this;
    /**
     * Sets the directory where object and other intermediate files should be placed when building a project.
     * By default, intermediate files will be stored in a directory named "obj" in the same directory as the project. The `objdir` function allows you to change this location.
     *
     * To avoid conflicts between build configurations, Premake will ensure that each intermediate directory is unique by appending one or more of the build configuration name, platform name, or project name. You may use the "!" prefix to prevent this behavior, and allow overlapping intermediate directories. See the examples below for more information.
     *
     *
     * Premake 4.0 or later. The "!" prefix was introduced in Premake 5.0.
     * @param path The directory where the object and intermediate files should be stored, specified relative to the currently executing script file.
     *
     * ### Examples
     * Use a directory named "obj" (the default) for intermediate files. Actual directories will be `obj/Debug` and `obj/Release`.
     *
     * ```lua
     * workspace "MyWorkspace"
     *    configurations { "Debug", "Release" }
     *
     * project "MyProject"
     *    objdir "obj"
     * ```
     *
     * Use a directory named "obj" (the default) for intermediate files. Actual directories will be `obj/Debug/x32`, `obj/Debug/x64`, `obj/Release/x32`, and `obj/Release/x64`.
     *
     * ```lua
     * workspace "MyWorkspace"
     *    configurations { "Debug", "Release" }
     *    platforms { "x32", "x64" }
     *
     * project "MyProject"
     *    objdir "obj"
     * ```
     *
     * Use tokens to reformat the path. Since the end result is unique, Premake will not append any extra directories. Actual directories will be `obj/x32_Debug`, `obj/x64_Debug`, `obj/x32_Release`, and `obj/x64_Release`.
     *
     * ```lua
     * workspace "MyWorkspace"
     *    configurations { "Debug", "Release" }
     *    platforms { "x32", "x64" }
     *
     * project "MyProject"
     *    objdir "obj/%{cfg.platform}_%{cfg.buildcfg}"
     * ```
     *
     * Use the "!" prefix to force a specific directory using Visual Studio's provided environment variables instead of Premake tokens.
     *
     * ```lua
     * workspace "MyWorkspace"
     *    configurations { "Debug", "Release" }
     *    platforms { "x32", "x64" }
     *
     * project "MyProject"
     *    objdir "!obj/$(Platform)_$(Configuration)"
     * ```
     */
    objDir(path: string): this;
    /**
     * Controls whether the frame pointer is omitted during compilation.
     *
     *
     * Premake 5.0.0 alpha 14 or later.
     * @param value Controls whether the frame pointer is omitted during compilation.
     * Available options:
     * - `Default`: Use the compiler's default behavior.
     * - `On`: Omit the frame pointer.
     * - `Off`: Keep the frame pointer.
     *
     * ### Examples
     * Keep frame pointer in debug builds for better stack traces:
     * ```lua
     * filter "configurations:Debug"
     *     omitframepointer "Off"
     * ```
     *
     * Omit frame pointer in release builds:
     * ```lua
     * filter "configurations:Release"
     *     omitframepointer "On"
     * ```
     *
     * Use compiler defaults across all configurations:
     * ```lua
     * omitframepointer "Default"
     * ```
     */
    omitFramePointer(value: OmitFramePointerType): this;
    /**
     * The **optimize** function specifies the level and type of optimization used while building the target configuration.
     * If no value is set for a configuration, the toolset's default optimization (usually none) will be performed.
     *
     *
     * Premake 5.0.
     * @param value
     * Available options:
     * - `Off`: No optimization will be performed.
     * - `On`: Perform a balanced set of optimizations.
     * - `Debug`: Optimization with some debugger step-through support.
     * - `Size`: Optimize for the smallest file size.
     * - `Speed`: Optimize for the best performance.
     * - `Full`: Full optimization.
     *
     */
    optimize(value: OptimizeType): this;
    /**
     * Specifies the #include form of the precompiled header file name.
     * See [Precompiled Headers](Precompiled-Headers.md) for more information.
     *
     *
     * Premake 4.0 and up.
     * @param name The name of the precompiled header, as it is specified in the #include statements of the project source code.
     *
     */
    pchHeader(name: string): this;
    /**
     * Specifies the C/C++ source code file which controls the compilation of the header.
     * See [Precompiled Headers](Precompiled-Headers.md) for more information.
     *
     *
     * Premake 4.0 and up.
     * @param sourcefile_cpp The name of the source code file which triggers the compilation of the header. This file must contain the header file's `#include` statement as the first line of code; this is usually the only statement in the file.
     *
     */
    pchSource(sourcefile_cpp: string): this;
    /**
     * Enable generation of position independent code.
     * Position Independent Code is required when building dynamic libraries, or static lib's that will be linked to dynamic libraries. PIC will be enabled by default when building dynamic libraries. It will be disabled by default otherwise.
     *
     *
     * Premake 5.0.
     * @param value
     * Available options:
     * - `Off`: Do not generate position independent code.
     * - `On`: Generate position independent code.
     *
     */
    pic(value: PicType): this;
    /**
     * Specifies shell commands to run after build is finished.
     *
     *
     * Premake 4.4 or later.
     * @param commands One or more shell commands to run after the build is finished.
     *
     * ### Examples
     * ```lua
     * postbuildcommands { "{COPYFILE} %[default.config] %[bin/project.config]" }
     * ```
     */
    postBuildCommands(...commands: string[]): this;
    /**
     * Specifies a message to display to the user before starting execution of any specified [post-build commands](postbuildcommands.md).
     *
     *
     * Premake 5.0 or later.
     * @param message The message to be displayed.
     *
     * ### Examples
     * ```lua
     * project "MyProject"
     *    postbuildcommands { "{COPYFILE} %[dependencies/*.lib] %[bin]" }
     *    postbuildmessage "Copying dependencies..."
     * ```
     */
    postBuildMessage(message: string): this;
    /**
     * Specifies shell commands to run before each build.
     *
     *
     * Premake 4.4 or later.
     * @param commands One or more shell commands to run before each build.
     *
     * ### Examples
     * ```lua
     * prebuildcommands { "{COPYFILE} %[default.config] %[bin/project.config]" }
     * ```
     */
    preBuildCommands(...commands: string[]): this;
    /**
     * Specifies a message to display to the user before starting execution of any specified [pre-build commands](prebuildcommands.md).
     *
     *
     * Premake 4.4 or later.
     * @param message The message to be displayed to the user before starting execution of any specified pre-build commands.
     *
     * ### Examples
     * ```lua
     * project "MyProject"
     *    prebuildcommands { "{COPYFILE} %[dependencies/*.lib] %[bin]" }
     *    prebuildmessage "Copying dependencies..."
     * ```
     */
    preBuildMessage(message: string): this;
    /**
     * Specifies shell commands to run after the source files have been compiled, but before the link step (if unsupported by the action, it will be treated the same as [prebuildcommands](prebuildcommands.md)).
     *
     *
     * Premake 4.4 or later.
     * @param commands One or more shell commands.
     *
     * ### Examples
     * ```lua
     * prelinkcommands { "{COPYFILE} %[default.config] %[bin/project.config]" }
     * ```
     */
    preLinkCommands(...commands: string[]): this;
    /**
     * Specifies a message to display to the user before starting execution of any specified [pre-link commands](prelinkcommands.md).
     *
     *
     * Premake 4.4 or later.
     * @param message The message to be displayed before starting execution of any specified pre-link commands.
     *
     * ### Examples
     * ```lua
     * project "MyProject"
     *    prelinkcommands { "{COPYFILE} %[dependencies/*.lib] %[bin]" }
     *    prelinkmessage "Copying dependencies..."
     * ```
     */
    preLinkMessage(message: string): this;
    /**
     * Enable or disable instrumented performance profiling support for binaries.
     *
     *
     * Premake 5.0-beta6 or later.
     * @param value
     * Available options:
     * - `On`: Turn on instrumented performance profiling.
     * - `Off`: Turn off instrumented performance profiling.
     *
     * ### Examples
     * ```lua
     * project "MyProject"
     *     kind "ConsoleApp"
     *     profile "On"
     * ```
     */
    profile(value: boolean): this;
    /**
     * Specifies one or more shell commands to be executed to rebuild a [Makefile project](Makefile-Projects.md).
     *
     *
     * Premake 5.0 or later.
     * @param commands Specifies a list of one or more shell commands to be executed. The commands may use tokens.
     *
     * ### Examples
     * Use a [Makefile project](Makefile-Projects.md) to execute an external makefile.
     *
     * ```lua
     * workspace "MyWorkspace"
     *    configurations { "Debug", "Release" }
     *
     * project "MyProject"
     *    kind "Makefile"
     *
     *    buildcommands {
     *       "make %{cfg.buildcfg}"
     *    }
     *
     *    rebuildcommands {
     *       "make %{cfg.buildcfg} rebuild"
     *    }
     *
     *    cleancommands {
     *       "make clean %{cfg.buildcfg}"
     *    }
     *
     * ```
     */
    rebuildCommands(...commands: string[]): this;
    /**
     * Directory on the remote machine where the project will be deployed to.
     *
     *
     * Premake 5.0.0 beta 3 or later, only applies to Visual Studio Linux projects.
     * @param path Specifies the directory on the remote machine where the project is deployed.
     *
     */
    remoteDeployDir(path: string): this;
    /**
     * Project directory as seen by the Windows Subsystem for Linux shell.
     *
     *
     * Premake 5.0.0 beta 3 or later, only applies to Visual Studio Linux projects.
     * @param path Specifies the directory on the remote machine that WSL sees the project in
     *
     * ### Examples
     * ```lua
     * remoteprojectdir "$(RemoteRootDir)/$(ProjectName)"
     * ```
     */
    remoteProjectDir(path: string): this;
    /**
     * Specifies the subdirectory on the remote machine to copy each project's source code to.
     *
     *
     * Premake 5.0.0 beta 3 or later, only applies to Visual Studio Linux projects.
     * @param path Specifies the directory on the remote machine where the source files of a single project will be copied to before compiling, relative to the root path.
     *
     * ### Examples
     * ```lua
     * remoteprojectrelativedir "%{prj.name}"
     * ```
     */
    remoteProjectRelativeDir(path: string): this;
    /**
     * Specifies the base directory on the remote machine to deploy the source code to before compiling.
     *
     *
     * Premake 5.0.0 beta 3 or later, only applies to Visual Studio Linux projects.
     * @param path Specifies the directory on the remote machine where the source files will be copied to before compiling.
     *
     * ### Examples
     * ```lua
     * remoterootdir "~/projects/%{prj.name}"
     * ```
     */
    remoteRootDir(path: string): this;
    /**
     * Sets the `RemoveUnreferencedCodeData` property for a configuration or all configurations within a project or workspace, adding or removing the `/Zc:inline[-]` build option.
     *
     * [/Zc:inline (Remove unreferenced COMDAT)](https://docs.microsoft.com/en-us/cpp/build/reference/zc-inline-remove-unreferenced-comdat?view=msvc-160)
     *
     * If this property is unset, it defaults to `true` in Visual Studio.
     *
     *
     * Premake 5.0 alpha 16 or later.
     * @param value
     * Available options:
     * - `on`: Enables `RemoveUnreferencedCodeData`.
     * - `off`: Disables `RemoveUnreferencedCodeData`.
     *
     */
    removeUnreferencedCodeData(value: boolean): this;
    /**
     * Specifies preprocessor symbols for the resource compiler.
     *
     *
     * Premake 4.0 or later.
     * @param symbols Specifies a list of symbols to be defined.
     *
     * ### Examples
     * Define two new symbols in the current project.
     *
     * ```lua
     * resdefines { "DEBUG", "TRACE" }
     * ```
     *
     * Symbols may also assign values.
     *
     * ```lua
     * resdefines { "CALLSPEC=__dllexport" }
     * ```
     */
    resDefines(...symbols: string[]): this;
    /**
     * Specifies the include file search paths for the resource compiler.
     *
     *
     * Premake 4.0 or later.
     * @param paths Specifies a list of include file search directories. Paths should be specified relative to the currently running script file.
     *
     * ### Examples
     * Define two include file search paths.
     *
     * ```lua
     * resincludedirs { "../lua/include", "../zlib" }
     * ```
     *
     * You can also use wildcards to match multiple directories. The * will match against a single directory, ** will recurse into subdirectories as well.
     *
     * ```lua
     * resincludedirs { "../includes/**" }
     * ```
     */
    resIncludeDirs(...paths: string[]): this;
    /**
     * Passes arguments directly to the resource compiler command line without translation.
     *
     *
     * Premake 4.0 or later.
     * @param options A list of resource compiler flags and options, specific to a particular compiler.
     *
     * ### Examples
     * Use `pkg-config` style configuration when building on Linux with GCC. Build options are always compiler specific and should be targeted to a particular toolset.
     *
     * ```lua
     * filter { "system:linux", "action:gmake" }
     *   resoptions { "`wx-config --cxxflags`", "-ansi", "-pedantic" }
     * ```
     */
    resOptions(...options: string[]): this;
    /**
     * Enable or disable [run-time type information](https://en.wikipedia.org/wiki/Run-time_type_information).
     *
     *
     * Premake 5.0 or later.
     * @param value Enable or disable run-time type information.
     * Available options:
     * - `Default`: Use the toolset's default setting for run-time type information.
     * - `On`: Turn on RTTI.
     * - `Off`: Turn off RTTI.
     *
     */
    rtti(value: RttiType): this;
    /**
     * Runs code analysis during the build process for Visual Studio projects.
     *
     * The `runcodeanalysis` option enforces code analysis during the build process in Visual Studio projects. This may significantly increase build time for projects.
     *
     *
     * Premake 5.0.0 beta 3 or later for Visual Studio 2019 and later.
     * @param value Specifies whether code analysis should be run during the build process.
     * Available options:
     * - `On`
     * - `Off`
     *
     * ### Examples
     * Run clang-tidy code analysis during the build process.
     *
     * ```lua
     * clangtidy("On")
     * runcodeanalysis("On")
     * ```
     */
    runCodeAnalysis(value: boolean): this;
    /**
     * Specifies the runtime search paths used by the runtime shared library dynamic loader. OSX and Linux-specific.
     *
     *
     * Premake 5.0 or later.
     * @param paths Specifies a list of runtime search path directories used by shared library dynamic loader.
     *
     */
    runPathDirs(...paths: string[]): this;
    /**
     * Choose the type of runtime library to use.
     * If the runtime type is not set, Premake will try to determine the configuration type based on the setting of symbol generation and optimization flags and use the appropriate runtime automatically.
     *
     *
     * Premake 5.0 or later.
     * @param type Specifies the type of runtime library to use.
     * Available options:
     * - `Debug`
     * - `Release`
     *
     * ### Examples
     * Force selection of a release runtime.
     *
     * ```lua
     * filter { "configurations:Debug" }
     *    symbols "On"
     *    runtime "Release"
     * ```
     */
    runTime(type: RunTimeType): this;
    /**
     * Enables various `fsanitize` options for compilers.
     *
     *
     * Premake 5.0 or later.
     * @param value_list Specifies the desired `fsanitize` options to enable.
     * Available options:
     * - `Address`: Enables compiler support for AddressSanitizer (ASan). Visual Studio support starts with 2019 16.9.
     * - `Fuzzer`: Enables support for LibFuzzer, a coverage-guided fuzzing library. Unsupported with GCC. Visual Studio support starts with 2019 16.9.
     * - `Thread`: Enables compiler support for ThreadSanitizer (TSan). GCC & Clang only.
     * - `UndefinedBehavior`: Enables compiler support for UndefinedBehaviorSanitizer (UBSan). GCC & Clang only.
     *
     */
    sanitize(...value_list: SanitizeType[]): this;
    /**
     * Enables the `Scan Sources for Module Dependencies` option for Visual Studio projects.
     *
     *
     * Premake 5.0-beta2 or later. Only available for Visual Studio 2019 16.9.x and later.
     * @param value Enables or disables the 'Scan Sources for Module Dependencies' option for Visual Studio projects.
     * Available options:
     * - `on`: Sets the option to Yes.
     * - `yes`: Sets the option to Yes.
     * - `true`: Sets the option to Yes.
     * - `off`: Sets the option to No.
     * - `no`: Sets the option to No.
     * - `false`: Sets the option to No.
     *
     */
    scanForModuleDependencies(value: boolean): this;
    /**
     * - This page was auto-generated. Feel free to help us improve the documentation by creating a pull request.
     *
     *
     * Premake 5.0.0 alpha 14 or later.
     * @param value
     * Available options:
     * - `NoListing`
     * - `AssemblyCode`
     * - `AssemblyCodeAndHex`
     *
     */
    shaderAssembler(value: ShaderAssemblerType): this;
    /**
     * - This page was auto-generated. Feel free to help us improve the documentation by creating a pull request.
     *
     *
     * Premake 5.0.0 alpha 14 or later.
     * @param value Needs documentation.
     *
     */
    shaderAssemblerOutput(value: string): this;
    /**
     * - This page was auto-generated. Feel free to help us improve the documentation by creating a pull request.
     *
     *
     * Premake 5.0.0 alpha 14 or later.
     * @param value Needs documentation.
     *
     */
    shaderDefines(...value: string[]): this;
    /**
     * - This page was auto-generated. Feel free to help us improve the documentation by creating a pull request.
     *
     *
     * Premake 5.0.0 alpha 14 or later.
     * @param value needs documentation.
     *
     */
    shaderEntry(value: string): this;
    /**
     * - This page was auto-generated. Feel free to help us improve the documentation by creating a pull request.
     *
     *
     * Premake 5.0.0 alpha 14 or later.
     * @param value needs documentation.
     *
     */
    shaderHeaderFileOutput(value: string): this;
    /**
     * - This page was auto-generated. Feel free to help us improve the documentation by creating a pull request.
     *
     *
     * Premake 5.0.0 alpha 16 or later.
     * @param value Needs documentation.
     *
     */
    shaderIncludeDirs(...value: string[]): this;
    /**
     * Specifies the shader model.
     *
     *
     * Premake 5.0.0 alpha 14 or later.
     * @param value Specifies the shader model.
     * Available options:
     * - `2.0`: Shader Model 2.0
     * - `3.0`: Shader Model 3.0
     * - `4.0_level_9_1`: Shader Model 4.0 Level 9_1
     * - `4.0_level_9_3`: Shader Model 4.0 Level 9_3
     * - `4.0`: Shader Model 4.0
     * - `4.1`: Shader Model 4.1
     * - `5.0`: Shader Model 5.0
     * - `5.1`: Shader Model 5.1
     * - `rootsig_1.0`: Root Signature Version 1.0
     * - `rootsig_1.1`: Root Signature Version 1.1
     * - `6.0`: Shader Model 6.0
     * - `6.1`: Shader Model 6.1
     * - `6.2`: Shader Model 6.2
     * - `6.3`: Shader Model 6.3
     * - `6.4`: Shader Model 6.4
     * - `6.5`: Shader Model 6.5
     * - `6.6`: Shader Model 6.6
     *
     */
    shaderModel(value: ShaderModelType): this;
    /**
     * Specifies the output object of compiled HLSL files.
     *
     *
     * Premake 5.0.0 alpha 14 or later.
     * @param path The output path of HLSL files that have been compiled into Compiled Shader Objects.
     *
     * ### Examples
     * This Visual Studio project will compile HLSL files to the shaders folder with a .cso extension.
     *
     * ```lua
     * shaderobjectfileoutput "shaders/%%(Filename).cso"
     * ```
     */
    shaderObjectFileOutput(path: string): this;
    /**
     * - This page was auto-generated. Feel free to help us improve the documentation by creating a pull request.
     *
     *
     * Premake 5.0.0 alpha 14 or later.
     * @param value Needs documentation.
     *
     */
    shaderOptions(...value: string[]): this;
    /**
     * Specifies the type of shader.
     *
     *
     * Premake 5.0.0 alpha 14 or later.
     * @param value Specifies the type of shader.
     * Available options:
     * - `Effect`
     * - `Vertex`
     * - `Pixel`
     * - `Geometry`
     * - `Hull`
     * - `Domain`
     * - `Compute`
     * - `Library`
     * - `Mesh`
     * - `Amplification`
     * - `Texture`
     * - `RootSignature`
     *
     */
    shaderType(value: ShaderTypeType): this;
    /**
     * - This page was auto-generated. Feel free to help us improve the documentation by creating a pull request.
     *
     *
     * Premake 5.0.0 alpha 14 or later.
     * @param value needs documentation.
     *
     */
    shaderVariableName(value: string): this;
    /**
     *
     *
     *
     * Premake 5.0.0 alpha 12 or later.
     * @param value
     * Available options:
     * - `Default`: Does not set a value for `<RuntimeLibrary>`.
     * - `On`: Sets `<RuntimeLibrary>` to "MultiThreaded".
     * - `Off`: Sets `<RuntimeLibrary>` to "MultiThreadedDLL".
     *
     */
    staticRuntime(value: StaticRuntimeType): this;
    /**
     * Specifies which C++ Standard Library to use.
     * The `staticruntime` API is used to determine if a static or shared version of the STL is used.
     *
     *
     * Premake 5.0.0 alpha 14 or later.
     * @param value
     * Available options:
     * - `none`: Minimal C++ runtime library.
     * - `gabi++`: C++ runtime library.
     * - `stlport`: STLport runtime library.
     * - `gnu`: GNU STL library.
     * - `libc++`: LLVM libc++ library.
     *
     */
    stl(value: StlType): this;
    /**
     * Sets the level of allowed pointer aliasing.
     * If no value is set for a configuration, the toolset's settings will be used.
     *
     *
     * Premake 5.0.
     * @param value Specifies the desired level of optimization.
     * Available options:
     * - `Off`: No strict aliasing tests will be performed.
     * - `Level1`
     * - `Level2`
     * - `Level3`
     *
     */
    strictAliasing(value: StrictAliasingType): this;
    /**
     *
     *
     *
     * Premake 5.0.0 alpha 12 or later.
     * @param value
     * Available options:
     * - `on`: needs documentation.
     * - `off`: needs documentation.
     *
     */
    stringPooling(value: boolean): this;
    /**
     * - Specifies 1, 2, 4, 8, 16-byte boundary for struct member alignment.
     *
     *
     * Premake 5.0.0 alpha 14 or later for visual studio (non-clang).
     * Premake 5.0.0 beta 7 for others
     * @param value Specifies the boundary for struct member alignment.
     * Available options:
     * - `1`
     * - `2`
     * - `4`
     * - `8`
     * - `16`
     *
     */
    structMemberAlign(value: StructMemberAlignType): this;
    /**
     * - This page was auto-generated. Feel free to help us improve the documentation by creating a pull request.
     *
     *
     * Premake 5.0.0 beta 1 or later.
     * @param value
     * Available options:
     * - `4.0`
     * - `4.2`
     * - `5.0`
     *
     */
    swiftVersion(value: SwiftVersionType): this;
    /**
     * Turn on/off debug symbol table generation.
     * By default, the generated project files will use the compilers default settings for debug symbol generation. This might be on, or off, or entirely dependent on the configuration.
     *
     *
     * Premake 5.0 or later.
     * @param value An identifier for symbol information.
     * Available options:
     * - `Default`: Always available.
     * - `Off`: Always available.
     * - `On`: Always available.
     * - `FastLink`: Available in Visual Studio 2015 or newer.
     * - `Full`: Available in Visual Studio 2017 or newer.
     *
     * ### Examples
     * This project generates debug symbol information for better debugging.
     *
     * ```lua
     * project "MyProject"
     *     symbols "On"
     * ```
     */
    symbols(value: SymbolsType): this;
    /**
     * Specify the target location of the debug symbols.
     * For the Visual Studio action, this allows you to specify the location and name of the .pdb output.
     * Not specifying this option will result in the compilers default behavior.
     *
     *
     * Premake 5.0 or later.
     * @param filename The target location of the symbols.
     *
     * ### Examples
     * This project while specific to Visual Studio shows how to output the .pdb file right next to the lib/exe/dll using the name of the lib/exe/dll itself.
     *
     * ```lua
     * project "MyProject"
     *     symbolspath '$(OutDir)$(TargetName).pdb'
     * ```
     */
    symbolsPath(filename: string): this;
    /**
     * :::caution
     * **This function has been deprecated in Premake 5.0 beta2.** Use the new [externalincludedirs](externalincludedirs.md) function instead. `sysincludedirs` will be not supported in Premake 6.
     * :::
     *
     * Alias of [externalincludedirs](externalincludedirs.md).
     *
     *
     * Premake 5.0 or later.
     * @param paths Specifies a list of include file search directories. Paths should be specified relative to the currently running script file.
     *
     * ### Examples
     * Define two system include file search paths.
     *
     * ```lua
     * sysincludedirs { "../lua/include", "../zlib" }
     * ```
     *
     * You can also use wildcards to match multiple directories. The * will match against a single directory, ** will recurse into subdirectories as well.
     *
     * ```lua
     * sysincludedirs { "../includes/**" }
     * ```
     */
    sysIncludeDirs(...paths: string[]): this;
    /**
     * Specifies the system library search paths.
     * For Visual Studio, these paths are placed in the "VC++ Directories" properties panel. For all other tools they are treated as a normal library search path.
     *
     *
     * Premake 5.0 or later.
     * @param paths Specifies a list of library search directories. Paths should be specified relative to the currently running script file.
     *
     * ### Examples
     * Define two system library search paths.
     *
     * ```lua
     * syslibdirs { "../lua/libs", "../zlib" }
     * ```
     *
     * You can also use wildcards to match multiple directories. The * will match against a single directory, ** will recurse into subdirectories as well.
     *
     * ```lua
     * syslibdirs { "../libs/**" }
     * ```
     */
    sysLibDirs(...paths: string[]): this;
    /**
     * Specifies the target operating system.
     * If no system is specified, Premake will identify and target the current operating system. This can be overridden with the `--os` command line argument, providing one of the system identifiers below.
     *
     *
     * Premake 5.0 or later.
     * @param value Specifies the target operating system.
     * Available options:
     * - `aix`
     * - `android`
     * - `bsd`
     * - `emscripten`: Supported only for the gmake and gmakelegacy actions.
     * - `haiku`
     * - `ios`
     * - `linux`
     * - `macosx`
     * - `solaris`
     * - `tvos`
     * - `uwp`
     * - `wii`
     * - `windows`
     * - `xbox360`
     *
     * ### Examples
     * ```lua
     * workspace "MyWorkspace"
     *    configurations { "Debug", "Release" }
     *    system { "Windows", "Unix", "Mac" }
     *
     *    filter "system:Windows"
     *       system "windows"
     *
     *    filter "system:Unix"
     *       system "linux"
     *
     *    filter "system:Mac"
     *       system "macosx"
     * ```
     */
    system(value: SystemType): this;
    /**
     * Specifies the target operation system min and max versions.
     *
     *
     * Premake 5.0 or later.
     * @param value A colon-delimited string specifying the min and max version in the format `min:max`.
     *
     * ### Examples
     * ```lua
     * filter "system:windows"
     *    systemversion "10.0.10240.0" -- To specify the version of the SDK you want
     * ```
     *
     * ```lua
     * filter "system:windows"
     *    systemversion "latest" -- To use the latest version of the SDK available
     * ```
     *
     * ```lua
     * filter "system:windows"
     *    systemversion "10.0.10240.0:latest" -- To specify a range of minumum and maximum versions
     * ```
     *
     * ```lua
     * filter "system:macosx"
     *    systemversion "13.0" -- To target a minimum macOS deployment version of 13.0
     * ```
     */
    systemVersion(value: string): this;
    /**
     * ---
     * slug: premake-tags  # docusaurus reserves /docs/tags
     * ---
     *
     * tags
     * See the [pull request](https://github.com/premake/premake-core/pull/789) for more information; help authoring documentation is appreciated!
     *
     *
     * Premake 5.0.0 alpha 12 or later.
     * @param value Needs documentation.
     *
     */
    tags(...value: string[]): this;
    /**
     * - This page was auto-generated. Feel free to help us improve the documentation by creating a pull request.
     *
     *
     * Premake 5.0.0 alpha 14 or later.
     * @param value needs documentation.
     *
     */
    tailCalls(value: boolean): this;
    /**
     * Specifies the bundle extension for the MacOSX bundle.
     * By default, the project will use the MacOSX's normal naming conventions: .bundle for OSX Bundles, .framework for OSX Framework, and so on. The `targetbundleextension` function allows you to change this default.
     *
     *
     * Premake 5.0 beta 7 or later.
     * @param ext The new bundle extension, including the leading dot.
     *
     */
    targetBundleExtension(ext: string): this;
    /**
     * Sets the destination directory for the compiled binary target.
     * By default, the generated project files will place their compiled output in the same directory as the script. The `targetdir` function allows you to change this location.
     *
     *
     * Premake 4.0 or later.
     * @param path The file system path to the directory where the compiled target file should be stored, specified relative to the currently executing script file.
     *
     * ### Examples
     * This project separates its compiled output by configuration type.
     *
     * ```lua
     * project "MyProject"
     *
     *   filter { "configurations:Debug" }
     *     targetdir "bin/debug"
     *
     *   filter { "configurations:Release" }
     *     targetdir "bin/release"
     * ```
     */
    targetDir(path: string): this;
    /**
     * Specifies the file extension for the compiled binary target.
     * By default, the project will use the system's normal naming conventions: .exe for Windows executables, .so for Linux shared libraries, and so on. The `targetextension` function allows you to change this default.
     *
     *
     * Premake 4.0 or later.
     * @param ext The new file extension, including the leading dot.
     *
     */
    targetExtension(ext: string): this;
    /**
     * Specifies the base file name for the compiled binary target.
     * By default, the project name will be used as the file name of the compiled binary target. A Windows executable project named "MyProject" will produce a binary named MyProject.exe. The `targetname` function allows you to change this default.
     *
     *
     * Premake 4.0 or later.
     * @param name The new base file name.
     *
     */
    targetName(name: string): this;
    /**
     * Specifies the file name prefix for the compiled binary target.
     * By default, the system naming convention will be used: a "lib" prefix for POSIX libraries (as in `libMyProject.so`), and no prefix elsewhere. The `targetprefix` function allows you to change this default.
     *
     *
     * Premake 4.0 or later.
     * @param prefix The new file name prefix.
     *
     * ### Examples
     * ```lua
     * targetprefix "plugin"
     * ```
     *
     * The prefix may also be set to an empty string for no prefix.
     *
     * ```lua
     * targetprefix ""
     * ```
     */
    targetPrefix(prefix: string): this;
    /**
     * Specifies a file name suffix for the compiled binary target.
     *
     *
     * Premake 4.0 or later.
     * @param suffix The new filename suffix.
     *
     * ### Examples
     * ```lua
     * -- Add "-d" to debug versions of files
     * filter { "configurations:Debug" }
     *    targetsuffix "-d"
     * ```
     */
    targetSuffix(suffix: string): this;
    /**
     * Specifies whether the code generation uses ARM or Thumb instruction sets.
     *
     *
     * Premake 5.0.0 alpha 14 or later.
     * @param value Specifies whether the code generation uses ARM or Thumb instruction sets.
     * Available options:
     * - `thumb`: Uses the Thumb instruction set.
     * - `arm`: Uses the ARM instruction set.
     * - `disabled`: Disables usage of Thumb instruction set.
     *
     */
    thumbMode(value: ThumbModeType): this;
    /**
     * Specifies the version of the toolchain to use.
     *
     *
     * Premake 5.0.0 alpha 14 or later, only applies to Android projects.
     * Premake 5.0.0 beta 3 or later, only applies to Visual Studio Linux projects.
     * @param value Specifies the version of the toolchain to use.
     *
     */
    toolChainVersion(value: ToolChainVersionType): this;
    /**
     * Selects the compiler, linker, etc. which are used to build a project or configuration.
     * If no toolset is specified for a configuration, the system or IDE default will be used.
     *
     *
     * Premake 5.0 and later. Versions are currently only implemented for Visual Studio 2010+.
     * @param identifier A string identifier for the toolset.
     * Available options:
     * - `clang`: [Clang](http://clang.llvm.org)
     * - `dotnet`: The system's default C# compiler
     * - `gcc`: [GNU Compiler Collection](https://gcc.gnu.org)
     * - `msc`: Microsoft C/C++ compiler
     *
     * ### Examples
     * Specify version 110 of the Windows platform toolset.
     *
     * ```lua
     * toolset "msc-v110" -- or...
     * toolset "v100"    -- for those more familiar with Visual Studio's way
     * ```
     *
     * Use [Clang/C2](http://llvm.org/builds/) with Visual Studio
     * ```lua
     * toolset "msc-llvm-vs2014" -- pre VS 2019
     * toolset "clang" -- VS 2019 and newer
     * ```
     *
     * Use the toolset for Windows XP
     * ```lua
     * toolset "v140_xp"
     * ```
     */
    toolSet(identifier: string): this;
    /**
     * Removes preprocessor or compiler symbols from a project.
     * If a project includes multiple calls to `undefines` the lists are concatenated, in the order in which they appear in the script.
     *
     *
     * Premake 5.0 or later
     * @param symbols Specifies a list of symbols to be undefined.
     *
     * ### Examples
     * Undefine two symbols in the current project.
     *
     * ```lua
     * undefines { "DEBUG", "TRACE" }
     * ```
     */
    undefines(...symbols: string[]): this;
    /**
     * Removes preprocessor or compiler symbols from a project.
     * If a project includes multiple calls to `undefines` the lists are concatenated, in the order in which they appear in the script.
     *
     *
     * Premake 5.0 or later
     * @param symbols Specifies a list of symbols to be undefined.
     *
     * ### Examples
     * Undefine two symbols in the current project.
     *
     * ```lua
     * undefines { "DEBUG", "TRACE" }
     * ```
     */
    undefines(...symbols: string[]): this;
    /**
     * Force sign of `char`
     * Note that `char` is still a distinct type from `signed char` and `unsigned char`.
     *
     *
     * Premake 5.0.0 alpha 14 or later.
     * @param value
     * Available options:
     * - `Off`: Make `char` signed. (default on msc)
     * - `On`: Make `char` unsigned.
     *
     */
    unsignedChar(value: boolean): this;
    /**
     * Turn on/off full paths usage in diagnostics
     * By default, the generated project files will use the compilers default settings, which is in most cases "On" for debug and "Off" for release.
     * In Visual Studio, this overrides the /FC flag which is forced on when using debug builds.
     *
     *
     * Premake 5.0.0 beta 1 or later.
     * @param value Specifies whether to use relative or absolute paths in diagnostics.
     * Available options:
     * - `Off`: Use relative paths in diagnostics.
     * - `On`: Use absolute (full) paths in diagnostics.
     *
     * ### Examples
     * ```lua
     * project "MyProject"
     *     usefullpaths "On" -- Uses full paths in diagnostics
     * ```
     */
    useFullPaths(value: boolean): this;
    /**
     * Specifies which usage blocks a project should consume.
     * The `uses` API is used to consume `usage` blocks from within a project. The `usage` blocks are case sensitive.
     *
     *
     * @param value
     *
     * ### Examples
     * Demonstration of using `uses`. When specifying a `uses` matching a project name containing a `PUBLIC` or `INTERFACE` usage block, the `uses` statement will match against that. If a `project` with a `PUBLIC` or `INTERFACE` usage block
     * cannot be found, then it will fall back to searching all `usage` blocks to match the provided name, as described above.
     *
     * ```lua
     * project "MyProject"
     *     usage "PUBLIC"
     *         defines { "PUBLIC_DEF" }
     *     usage "Custom"
     *         defines { "CUSTOM_DEF" }
     *
     * project "MyExe"
     *     uses { "MyProject" }
     *
     * project "MyDLL"
     *     uses { "Custom" }
     * ```
     */
    uses(...value: string[]): this;
    /**
     * Enables a token-based preprocessor conforming to C99, C++11, and later standards.
     *
     *
     * Premake 5.0 or later.
     * @param value
     * Available options:
     * - `Off`: Do not use the conforming processor.
     * - `On`: Enable the conforming processor.
     *
     */
    useStandardPreprocessor(value: UseStandardPreprocessorType): this;
    /**
     * Specifies the file search paths for `using` statements.
     *
     *
     * Premake 5.0 or later.
     * @param paths Specifies a list of file search directories. Paths should be specified relative to the currently running script file.
     *
     * ### Examples
     * Define two using file search paths.
     *
     * ```lua
     * usingdirs { "../lib1", "../lib2" }
     * ```
     *
     * You can also use wildcards to match multiple directories. The * will match against a single directory, ** will recurse into subdirectories as well.
     *
     * ```lua
     * usingdirs { "../libs/**" }
     * ```
     */
    usingDirs(...paths: string[]): this;
    /**
     * Specifies the level of vector processing extensions to enable while compiling the target configuration.
     * If no value is set for a configuration, the toolset's default vector extension settings will be used.
     *
     *
     * Premake 5.0.
     * @param level Specifies the desired level of vector processing instructions.
     * Available options:
     * - `Default`: Use the toolset's default vector extension settings.
     * - `AVX`: Use Advanced Vector Extensions.
     * - `AVX2`: Use Advanced Vector Extensions 2.
     * - `IA32`: Use Intel Architecture 32-bit
     * - `SSE`: Use the basic SSE instruction set.
     * - `SSE2`: Use the SSE2 instruction set.
     * - `SSE3`: Use the SSE3 instruction set.
     * - `SSSE3`: Use the SSSE3 instruction set.
     * - `SSE4.1`: Use the SSE4.1 instruction set.
     * - `SSE4.2`: Use the SSE4.2 instruction set.
     * - `ALTIVEC`: Use Altivec (ISA 2.02) instruction set.
     * - `NEON`: Use the NEON instruction set (Android only)
     * - `MXU`: Use the XBurst SIMD instructions (Android only)
     *
     * ### Examples
     * ```lua
     * -- Enable SSE2 vector processing
     * vectorextensions "SSE2"
     * ```
     */
    vectorExtensions(level: VectorExtensionsType): this;
    /**
     * Sets the default visibility for exported symbols in a shared object library.
     * By default, the generated project files will use the compilers default settings symbol visibility when building shared object libraries.
     *
     *
     * Premake 5.0 or later.
     * @param value
     * Available options:
     * - `Default`
     * - `Hidden`
     * - `Internal`
     * - `Protected`
     *
     * ### Examples
     * This project hides exported symbols for release builds.
     *
     * ```lua
     * project "MyProject"
     *     filter "configurations:Release"
     *         visibility "Hidden"
     * ```
     */
    visibility(value: VisibilityType): this;
    /**
     * Add any property to your visual studio project
     * This allows you to set properties that premake does not support without extending it
     *
     * Values set at one time are sorted alphabetically
     * If you want to output groups of values in any order, set multiple times.
     * Nested values are also supported.
     *
     * ```lua
     * 	vsprops {
     * 		Name1 = "value1",
     * 		Name2 = {
     * 			Name3 = "value3"
     * 		}
     * 	}
     * ```
     *
     *
     * Premake 5.0-beta3 or later.
     * @param vsprops Allows you to set properties that premake does not support without extending it.
     *
     * ### Examples
     * ```lua
     * 	language "C#"
     * 	vsprops {
     * 		-- https://devblogs.microsoft.com/visualstudio/vs-toolbox-accelerate-your-builds-of-sdk-style-net-projects/
     * 		AccelerateBuildsInVisualStudio = "true",
     * 		-- https://learn.microsoft.com/en-us/visualstudio/ide/how-to-change-the-build-output-directory?view=vs-2022
     * 		AppendTargetFrameworkToOutputPath = "false",
     * 		-- https://learn.microsoft.com/en-us/dotnet/csharp/tutorials/nullable-reference-types
     * 		Nullable = "enable",
     * 	}
     * ```
     * ```lua
     * 	language "C++"
     * 	nuget {
     * 		"Microsoft.Direct3D.D3D12:1.608.2"
     * 	}
     * 	vsprops {
     * 		-- https://devblogs.microsoft.com/directx/gettingstarted-dx12agility/#2-set-agility-sdk-parameters
     * 		Microsoft_Direct3D_D3D12_D3D12SDKPath = "custom_path",
     * 	}
     * ```
     */
    vsProps(vsprops: any): this;
    /**
     * Controls the level of warnings that are shown by the compiler.
     * If no value is set for a configuration, the toolset's default warning level will be used.
     *
     *
     * Premake 5.0.
     * @param value Specifies the desired level of warning.
     * Available options:
     * - `Off`: Do not show any warning messages.
     * - `Default`: Use the toolset's default warning level.
     * - `Extra`: Enable the toolset's maximum warning level.
     * - `High`
     * - `Everything`
     *
     */
    warnings(value: WarningsType): this;
    /**
     * *Missing documentation*
     *
     *
     * @param value
     *
     */
    xcodeBuildResources(value: any): this;
    /**
     *
     *
     *
     * Premake 5.0.0 alpha 12 or later.
     * @param key_value_pairs Key/value pairs to apply to buildSettings blocks of the generated pbxproj.
     *
     * ### Examples
     * ```lua
     * xcodebuildsettings { ["MY_KEY"] = "MY_VALUE" }
     * ```
     * will generate:
     *
     * ```
     *     buildSettings = {
     *         ...
     *         MY_KEY = MY_VALUE;
     *         ...
     *     }
     * ```
     */
    xcodeBuildSettings(key_value_pairs: any): this;
    /**
     * - This page was auto-generated. Feel free to help us improve the documentation by creating a pull request.
     *
     *
     * Premake 5.0.0 alpha 14 or later.
     * @param value needs documentation.
     *
     */
    xcodeCodeSigningIdentity(value: string): this;
}

export type DotNetSdkType = 'Default' | 'Web' | 'Razor' | 'Worker' | 'Blazor' | 'WindowsDesktop' | 'MSTest';
export type JustMyCodeType = 'On' | 'Off';
export type LanguageType = 'C' | 'C++' | 'C#' | 'F#';
export type OpenMpType = 'On' | 'Off';
export type ResourceGeneratorType = 'internal' | 'public';
export type SharedLibTypeType = 'OSXBundle' | 'OSXFramework' | 'XCTest';
export interface ProjectScopeGenerated {
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
     * Imports custom .props files for Visual Studio.
     *
     *
     * Premake 5.0.0 alpha 12 or later.
     * @param value Needs documentation.
     *
     */
    buildCustomizations(...value: string[]): this;
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
     * Selects a .NET SDK
     * For more information see the MSDN documentation [here](https://learn.microsoft.com/en-us/dotnet/core/project-sdk/overview)
     *
     *
     * Premake 5.0 beta5 or later.
     *
     * Visual studio is the only toolset currently supported.
     * @param sdk
     * Available options:
     * - `Default`
     * - `Web`
     * - `Razor`
     * - `Worker`
     * - `Blazor`
     * - `WindowsDesktop`
     * - `MSTest`: Requires a version be specified.
     *
     * ### Examples
     * ```lua
     * dotnetsdk "Web"
     * ```
     *
     * ```lua
     * dotnetsdk "Web/3.4.0"
     * ```
     *
     * A custom SDK can be specified using the following:
     * ```lua
     * premake.api.addAllowed("dotnetsdk", "CustomSDK") -- add the custom SDK to allowed values for dotnetsdk
     * dotnetsdk "CustomSDK"
     *
     * dotnetsdk "CustomSDK/3.4.0" -- Specifying a version with a custom SDK is also supported
     * ```
     */
    dotNetSdk(sdk: DotNetSdkType): this;
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
     * Imports one or more [custom rules](Custom-Rules.md) into a project.
     *
     *
     * Premake 5.0 or later.
     * @param rule_names Specifies a list of one or more names of custom rules, which must be defined elsewhere in the project scripts.
     *
     */
    rules(...rule_names: string[]): this;
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
     * - This page was auto-generated. Feel free to help us improve the documentation by creating a pull request.
     *
     *
     * Premake 5.0.0 alpha 14 or later.
     * @param value Needs documentation.
     *
     */
    xcodeSystemCapabilities(value: boolean): this;
}

export interface RuleScopeGenerated {
    /**
     * Specifies one or more shell commands to be executed to build a project or file.
     *
     *
     * Premake 5.0 or later.
     * @param commands Specifies a list of one or more shell commands to be executed. The commands may use tokens.
     *
     * ### Examples
     * Use [per-file custom build commands](Custom-Build-Commands.md) to compile all Lua files in a project to C:
     *
     * ```lua
     * filter 'files:**.lua'
     *    -- A message to display while this build step is running (optional)
     *    buildmessage 'Compiling %[%{file.relpath}]'
     *
     *    -- One or more commands to run (required)
     *    buildcommands {
     *       'luac -o "%[%{!cfg.objdir}/%{file.basename}.out]" "%[%{file.relpath}]"'
     *    }
     *
     *    -- One or more outputs resulting from the build (required)
     *    buildoutputs { '%{cfg.objdir}/%{file.basename}.c' }
     *
     * ```
     *
     * Use a [Makefile project](Makefile-Projects.md) to execute an external makefile.
     *
     * ```lua
     * workspace "Workspace"
     *    configurations { "Debug", "Release" }
     *
     * project "MyProject"
     *    kind "Makefile"
     *
     *    buildcommands {
     *       "make %{cfg.buildcfg}"
     *    }
     *
     *    cleancommands {
     *       "make clean %{cfg.buildcfg}"
     *    }
     *
     * ```
     */
    buildCommands(...commands: string[]): this;
    /**
     * Specifies any additional dependencies for the target of a custom build rule.
     *
     *
     * Premake 5.0 or later.
     * @param files Specifies a list of file paths for additional dependencies.
     *
     */
    buildDependencies(...files: string[]): this;
    /**
     * Specifies the text to output to the when a custom build command or rule is executed.
     *
     *
     * Premake 5.0 or later.
     * @param message The text to write to standard output.
     *
     */
    buildMessage(message: string): this;
    /**
     * Specifies the file outputs of a custom build command or rule.
     *
     *
     * Premake 5.0 or later.
     * @param output The file that is created or updated by the custom build command or rule.
     *
     */
    buildOutputs(...output: string[]): this;
    /**
     * Text to display for rule or property definition
     *
     *
     * Premake 5.0.0 alpha 12 or later.
     * @param value Text shown for the rule or property definition.
     *
     * ### Examples
     * ```lua
     * rule "myrule"
     *   display "My custom rule"
     *   fileextension ".in"
     *
     *   propertydefinition {
     *     name = "myoption",
     *     display = "My option",
     *     description = "Select the option to use",
     *     values = { [0] = "option1", [1] = "option2"},
     *     value = 1
     *   }
     *
     *   buildmessage 'custom rule: {copy} %{file.relpath} %{file.basename}'
     *   buildoutputs { "%{sln.location}/%{file.basename}" }
     *   buildcommands { "MyScript {myoption} %[%{!file.abspath}] %[%{!sln.location}/%{file.basename}]" }
     * ```
     */
    display(value: string): this;
    /**
     * Specifies the target file extensions for a [custom build rule](Custom-Rules.md).
     *
     *
     * Premake 5.0 or later.
     * @param ext The target file extension for the rule, including the leading dot.
     *
     * ### Examples
     * ```lua
     * rule "Cg"
     *   display "Cg Compiler"
     *   fileextension ".cg"
     * ```
     */
    fileExtension(...ext: string[]): this;
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
     * Creates a new property for a [custom rule](Custom-Rules.md).
     * Custom rules, and therefore property definitions, are currently only supported for Visual Studio 2010+.
     *
     *
     * Available in Premake 5.0 or later for Visual Studio 2010 or later.
     * @param property_definition The property definition is specified as a table with the following values. Note that no data validation is currently performed on property definition parameters at this time.
     *
     * ### Examples
     * A simple boolean property to control a switch.
     *
     * ```lua
     * propertydefinition {
     *   name = "DebuggingSymbols",
     *   kind = "boolean",
     *   display = "Debugging Symbols",
     *   description = "Add debugging information to the generated output",
     *   value = false,
     *   switch = "-g"
     * }
     * ```
     *
     * To use this property in the rule:
     *
     * ```lua
     * -- If set to true, evaluates to: `tool.exe -g`
     * buildcommand "tool.exe [DebuggingSymbols]"
     * ```
     *
     * Enum properties allow selection from a list of possible values.
     *
     * ```lua
     * propertydefinition {
     *   name = "OptimizationLevel",
     *   display = "Optimization Level",
     *   values = {
     *     [0] = "None",
     *     [1] = "Size",
     *     [2] = "Speed",
     *   },
     *   switch = {
     *     [0] = "-O0",
     *     [1] = "-O1",
     *     [2] = "-O3",
     *   },
     *   value = 2,
     * }
     * ```
     *
     * Enum properties are set using the value names.
     *
     * ```lua
     * filter "configurations:Release"
     *   myCustomRuleVars { OptimizationLevel = "None" }
     * ```
     */
    propertyDefinition(property_definition: any): this;
}

export type PreferredToolArchitectureType = 'Default' | 'x86' | 'x86_64';
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


}