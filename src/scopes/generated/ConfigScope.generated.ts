// Auto-generated file. Do not edit directly.

export type ExternalAngleBracketsType = 'On' | 'Off'
export type InliningType = 'Default' | 'Disabled' | 'Explicit' | 'Auto'
export type StrictAliasingType = 'Off' | 'Level1' | 'Level2' | 'Level3'
export type LinkTimeOptimizationType = 'Default' | 'On' | 'Off'
export type ArchitectureType = 'universal' | 'x86' | 'x86_64' | 'ARM' | 'ARM64' | 'RISCV64' | 'loongarch64' | 'ppc' | 'ppc64' | 'wasm32' | 'wasm64' | 'e2k' | 'armv5' | 'armv7' | 'aarch64' | 'mips' | 'mips64'
export type SystemType = 'aix' | 'bsd' | 'emscripten' | 'haiku' | 'ios' | 'linux' | 'macosx' | 'solaris' | 'tvos' | 'uwp' | 'wii' | 'windows' | 'android'
export type RunTimeType = 'Debug' | 'Release'
export type SymbolsType = 'Default' | 'On' | 'Off' | 'FastLink' | 'Full'
export type VectorExtensionsType = 'Default' | 'AVX' | 'AVX2' | 'IA32' | 'SSE' | 'SSE2' | 'SSE3' | 'SSSE3' | 'SSE4.1' | 'SSE4.2' | 'ALTIVEC' | 'NEON' | 'MXU'
export type StructMemberAlignType = '1' | '2' | '4' | '8' | '16'
export type FpuType = 'Software' | 'Hardware'
export type AtlType = 'Off' | 'Dynamic' | 'Static'
export type CompileAsType = 'Default' | 'C' | 'C++' | 'Objective-C' | 'Objective-C++' | 'Module' | 'ModulePartition' | 'HeaderUnit'
export type CallingconventionType = 'Cdecl' | 'FastCall' | 'StdCall' | 'VectorCall'
export type FloatAbiType = 'soft' | 'softfp' | 'hard'
export type IOSFamilyType = 'iPhone/iPod touch' | 'iPad' | 'Universal'
export type SwiftVersionType = '4.0' | '4.2' | '5.0'
export type ShaderAssemblerType = 'NoListing' | 'AssemblyCode' | 'AssemblyCodeAndHex'
export type LinkSectionDataType = 'On' | 'Off'
export type ExceptionHandlingType = 'Default' | 'On' | 'Off' | 'SEH' | 'CThrow' | 'UnwindTables'
export type SanitizeType = 'Address' | 'Fuzzer' | 'Thread' | 'UndefinedBehavior'
export type LinkSectionFunctionType = 'On' | 'Off'
export type ThumbModeType = 'thumb' | 'arm' | 'disabled'
export type StlType = 'none' | 'gabi++' | 'stlport' | 'gnu' | 'libc++'
export type StaticRuntimeType = 'Default' | 'On' | 'Off'
export type MfcType = 'Default' | 'Off' | 'On' | 'Static' | 'Dynamic'
export type InlineSVisibilityType = 'Default' | 'Hidden'

export interface ConfigScopeGenerated {
	/**
	 * Selects the compiler, linker, etc. which are used to build a project or configuration.
	 * If no toolset is specified for a configuration, the system or IDE default will be used.
	 * 
	 * 
	 * Premake 5.0 and later. Versions are currently only implemented for Visual Studio 2010+.
	 * @param identifier A string identifier for the toolset. Premake includes the following toolsets by default. Available options:
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
	 * Treats all headers included by `#include <header>`, where the header file is enclosed in angle brackets (`< >`), as external headers.
	 * 
	 * 
	 * Premake 5.0 or later.
	 * Visual Studio 2019 version or later.
	 * @param value Available options:
	 * - `On`: Treat headers included with angle brackets as external.
	 * - `Off`: Default. Headers are treated normally.
	 * 
	 */
	externalAngleBrackets(value: ExternalAngleBracketsType): this;

	/**
	 * - This page was auto-generated. Feel free to help us improve the documentation by creating a pull request.
	 * 
	 * 
	 * Premake 5.0.0 alpha 14 or later.
	 * @param value
	 * 
	 * ### Examples
	 * ```lua
	 * shaderoptions (value)
	 * ```
	 */
	shaderOptions(value: string[]): this;

	/**
	 * Tells the compiler when it should inline functions.
	 * 
	 * 
	 * Premake 5.0 or later.
	 * @param value Available options:
	 * - `Default`: Allow the compiler to use its default inlining behavior.
	 * - `Disabled`: Turn off inlining entirely.
	 * - `Explicit`: Only inline functions explicitly marked with the `inline` keyword.
	 * - `Auto`: Allow the compiler to inline functions automatically.
	 * 
	 */
	inlining(value: InliningType): this;

	/**
	 * Sets the level of allowed pointer aliasing.
	 * If no value is set for a configuration, the toolset's settings will be used.
	 * 
	 * 
	 * Premake 5.0.
	 * @param value Specifies the desired level of optimization. Available options:
	 * - `Off`: No strict aliasing tests will be performed.
	 * - `Level1`
	 * - `Level2`
	 * - `Level3`
	 * 
	 * ### Examples
	 * ```lua
	 * strictaliasing "Level1"
	 * ```
	 */
	strictAliasing(value: StrictAliasingType): this;

	/**
	 * Specifies the output location of a toolset's build logs.
	 * If a build log path has not been specified, the toolset's default path will be used.
	 * 
	 * 
	 * Premake 5.0 or later. Currently only implemented for Visual Studio 2010+.
	 * @param path The output file system location for the build log file.
	 * 
	 */
	buildLog(path: any): this;

	/**
	 * Turns on/off the automatic linking of `.obj` files that are output by custom build commands. The default behaviour is to link `.obj` files when they are output by custom build commands.
	 * 
	 * 
	 * Premake 5.0 or later.
	 * @param value Available options:
	 * - `On`
	 * - `Off`
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
	 * Specifies the #include form of the precompiled header file name.
	 * See [Precompiled Headers](Precompiled-Headers.md) for more information.
	 * 
	 * 
	 * Premake 4.0 and up.
	 * @param name The name of the precompiled header, as it is specified in the #include statements of the project source code. Available options:
	 * - `myproject.h`
	 * 
	 */
	pchHeader(name: string): this;

	/**
	 * Specifies the import library file extension. Import libraries are generated for Windows DLL projects.
	 * By default, the toolset static library file extension will be used (`.lib` with Windows tools, `.a` with GNU tools). The `implibextension` function allows you to change this default.
	 * 
	 * 
	 * Premake 4.0 or later.
	 * @param ext The new file extension, including the leading dot.
	 * 
	 * ### Examples
	 * ```lua
	 * implibextension ".mpi"
	 * ```
	 */
	impLibExtension(ext: string): this;

	/**
	 * Adds files to a project.
	 * 
	 * 
	 * @param file_list Specifies one or more file patterns. File paths should be specified relative to the currently executing script file. File patterns may contain the `*` wildcard to match against files in the current directory, or the `**` wildcard to perform a recursive match. Available options:
	 * - `* wildcard`: Matches files in the current directory.
	 * - `** wildcard`: Performs a recursive match for files.
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
	files(file_list: any): this;

	/**
	 * The **linktimeoptimization** function specifies whether or not the toolset should perform link time optimization.
	 * 
	 * 
	 * Premake 5.0-beta4 and later
	 * @param value Available options:
	 * - `Off`: No LTO to be performed.
	 * - `On`: LTO optimization enabled.
	 * - `Default`: Default LTO optimizations for the toolset or exporter.
	 * 
	 */
	linkTimeOptimization(value: LinkTimeOptimizationType): this;

	/**
	 * 
	 * 
	 * 
	 * Premake 5.0.0 alpha 12 or later.
	 * @param value Available options:
	 * - `on`
	 * - `off`
	 * 
	 * ### Examples
	 * ```lua
	 * largeaddressaware "value"
	 * ```
	 */
	largeAddressAware(value: boolean): this;

	/**
	 * Specifies the system architecture to be targeted by the configuration.
	 * 
	 * 
	 * Premake 5.0 or later.
	 * @param value Available options:
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
	 * Specifies the target operating system.
	 * If no system is specified, Premake will identify and target the current operating system. This can be overridden with the `--os` command line argument, providing one of the system identifiers below.
	 * 
	 * 
	 * Premake 5.0 or later.
	 * @param value Available options:
	 * - `aix`
	 * - `android`
	 * - `bsd`
	 * - `emscripten`
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
	 * Specifies the target Android API level.
	 * 
	 * 
	 * Premake 5.0.0 alpha 14 or later.
	 * @param value A number specifying the target Android API level.
	 * 
	 * ### Examples
	 * ```lua
	 * androidapilevel (21)
	 * ```
	 */
	androidApiLevel(value: any): this;

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
	 * @param value
	 * 
	 * ### Examples
	 * ```lua
	 * shaderdefines (value)
	 * ```
	 */
	shaderDefines(value: string[]): this;

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
	imageOptions(options: string[]): this;

	/**
	 * Choose the type of runtime library to use.
	 * If the runtime type is not set, Premake will try to determine the configuration type based on the setting of symbol generation and optimization flags and use the appropriate runtime automatically.
	 * 
	 * 
	 * Premake 5.0 or later.
	 * @param type Available options:
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
	 * - This page was auto-generated. Feel free to help us improve the documentation by creating a pull request.
	 * 
	 * 
	 * Premake 5.0.0 alpha 14 or later.
	 * @param value
	 * 
	 * ### Examples
	 * ```lua
	 * shadervariablename (value)
	 * ```
	 */
	shaderVariableName(value: string): this;

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
	undefines(symbols: string[]): this;

	/**
	 * Replaces some function calls with intrinsic or otherwise special forms of the function that help your application run faster.
	 * 
	 * [Visual Studio 2017's Description of Intrinsics](https://docs.microsoft.com/en-us/cpp/build/reference/oi-generate-intrinsic-functions?view=vs-2017)
	 * 
	 * 
	 * Premake 5.0.0 alpha 12 or later.
	 * @param value Available options:
	 * - `on`: Enables intrinsic functions which generate faster, but possibly longer code.
	 * - `off`: Disables intrinsic functions.
	 * 
	 * ### Examples
	 * ```lua
	 * intrinsics "On"
	 * ```
	 */
	intrinsics(value: boolean): this;

	/**
	 * Turn on/off debug symbol table generation.
	 * By default, the generated project files will use the compilers default settings for debug symbol generation. This might be on, or off, or entirely dependent on the configuration.
	 * 
	 * 
	 * Premake 5.0 or later.
	 * @param switch An identifier for symbol information. Available options:
	 * - `Default`: Always available.
	 * - `Off`: Always available.
	 * - `On`: Always available.
	 * - `FastLink`: Visual Studio 2015 or newer.
	 * - `Full`: Visual Studio 2017 or newer.
	 * 
	 * ### Examples
	 * This project generates debug symbol information for better debugging.
	 * 
	 * ```lua
	 * project "MyProject"
	 *     symbols "On"
	 * ```
	 */
	symbols(switch: SymbolsType): this;

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
	debugDir(path: any): this;

	/**
	 * - This page was auto-generated. Feel free to help us improve the documentation by creating a pull request.
	 * 
	 * 
	 * Premake 5.0.0 beta 1 or later.
	 * @param value
	 * 
	 * ### Examples
	 * ```lua
	 * conformancemode (value)
	 * ```
	 */
	conformanceMode(value: boolean): this;

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
	includeDirsAfter(paths: any): this;

	/**
	 * Only used by Visual Studio .NET targets.
	 * 
	 * Maps to `<CustomToolNamespace>` MSBuild element.
	 * 
	 * 
	 * Premake 5.0.0 alpha 12 or later.
	 * @param value
	 * 
	 * ### Examples
	 * ```lua
	 * customtoolnamespace "value"
	 * ```
	 */
	customToolNamespace(value: string): this;

	/**
	 * Specifies the level of vector processing extensions to enable while compiling the target configuration.
	 * If no value is set for a configuration, the toolset's default vector extension settings will be used.
	 * 
	 * 
	 * Premake 5.0.
	 * @param level Specifies the desired level of vector processing instructions. Available options:
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
	externalIncludeDirs(paths: any): this;

	/**
	 * - Specifies 1, 2, 4, 8, 16-byte boundary for struct member alignment.
	 * 
	 * 
	 * Premake 5.0.0 alpha 14 or later for visual studio (non-clang).
	 * Premake 5.0.0 beta 7 for others
	 * @param value Available options:
	 * - `1`
	 * - `2`
	 * - `4`
	 * - `8`
	 * - `16`
	 * 
	 * ### Examples
	 * ```lua
	 * structmemberalign (1)
	 * ```
	 */
	structMemberAlign(value: StructMemberAlignType): this;

	/**
	 * Specifies whether to generate code for a hardware FPU.
	 * 
	 * 
	 * Premake 5.0 or later.
	 * @param value Available options:
	 * - `Software`: Generate software floating-point emulation code.
	 * - `Hardware`: Generate code for a hardware FPU.
	 * 
	 */
	fpu(value: FpuType): this;

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
	debugArgs(args: string[]): this;

	/**
	 * Specifies the runtime search paths used by the runtime shared library dynamic loader. OSX and Linux-specific.
	 * 
	 * 
	 * Premake 5.0 or later.
	 * @param paths Specifies a list of runtime search path directories used by shared library dynamic loader. Paths should be specified relative to the currently running script file.
	 * 
	 */
	runPathDirs(paths: any): this;

	/**
	 * Specifies specific compiler warnings that should be interpreted as errors.
	 * 
	 * 
	 * Premake 5.0 or later. Special value `All` available since Premake 5.0-beta5 or later.
	 * @param warnings A list of warnings to interpret as errors. Available options:
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
	fatalWarnings(warnings: string[]): this;

	/**
	 * Specifies the bundle extension for the MacOSX bundle.
	 * By default, the project will use the MacOSX's normal naming conventions: .bundle for OSX Bundles, .framework for OSX Framework, and so on. The `targetbundleextension` function allows you to change this default.
	 * 
	 * 
	 * Premake 5.0 beta 7 or later.
	 * @param ext The new bundle extension, including the leading dot.
	 * 
	 * ### Examples
	 * ```lua
	 * targetbundleextension ".zmf"
	 * ```
	 */
	targetBundleExtension(ext: string): this;

	/**
	 * Enables Microsoft's Active Template Library in a project.
	 * 
	 * 
	 * Premake 5.0 or later.
	 * @param value Available options:
	 * - `Off`: Do not use ATL (default).
	 * - `Dynamic`: Link the ATL libraries dynamically.
	 * - `Static`: Link the ATL libraries statically.
	 * 
	 */
	atl(value: AtlType): this;

	/**
	 * Specify if generated file from [`buildcommands`](buildcommands.md) should be compiled or not.
	 * 
	 * 
	 * Premake 5.0.0 alpha 12 or later.
	 * @param value Available options:
	 * - `on`: generated file should be compiled.
	 * - `off`: generated file should not be compiled.
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
	symbolsPath(filename: any): this;

	/**
	 * 
	 * 
	 * 
	 * Premake 5.0.0 alpha 13 or later. The options **Module**, **ModulePartition** and **HeaderUnit** are only available in Premake 5.0-beta1 or later and only implemented for Visual Studio 2019+.
	 * @param value Available options:
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
	 * Sets the [function calling convention](https://en.wikipedia.org/wiki/X86_calling_conventions).
	 * 
	 * 
	 * Premake 5.0 or later.
	 * @param value Available options:
	 * - `Cdecl`
	 * - `FastCall`
	 * - `StdCall`
	 * - `VectorCall`
	 * 
	 */
	callingconvention(value: CallingconventionType): this;

	/**
	 * Specifies a message to display to the user before starting execution of any specified [pre-link commands](prelinkcommands.md).
	 * 
	 * 
	 * Premake 4.4 or later.
	 * @param message The message to be displayed.
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
	 * Specifies the floating point ABI to use.
	 * 
	 * 
	 * Premake 5.0.0 alpha 14 or later.
	 * @param value Available options:
	 * - `soft`: Compiler will generate library calls for floating-point operations.
	 * - `softfp`: Compiler will generate code using hardware floating-point instructions, but still uses the soft-float calling conventions.
	 * - `hard`: Compiler will generate floating-point instructions using FPU-specific calling conventions.
	 * 
	 * ### Examples
	 * ```lua
	 * floatabi "soft"
	 * ```
	 */
	floatAbi(value: FloatAbiType): this;

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
	impLibDir(path: any): this;

	/**
	 * - This page was auto-generated. Feel free to help us improve the documentation by creating a pull request.
	 * 
	 * 
	 * Premake 5.0.0 alpha 14 or later.
	 * @param value Available options:
	 * - `iPhone/iPod touch`: needs documentation
	 * - `iPad`: needs documentation
	 * - `Universal`: needs documentation
	 * 
	 * ### Examples
	 * ```lua
	 * iosfamily (value)
	 * ```
	 */
	iOSFamily(value: IOSFamilyType): this;

	/**
	 * - This page was auto-generated. Feel free to help us improve the documentation by creating a pull request.
	 * 
	 * 
	 * Premake 5.0.0 beta 1 or later.
	 * @param value Available options:
	 * - `4.0`: needs documentation
	 * - `4.2`: needs documentation
	 * - `5.0`: needs documentation
	 * 
	 * ### Examples
	 * ```lua
	 * swiftversion (value)
	 * ```
	 */
	swiftVersion(value: SwiftVersionType): this;

	/**
	 * - This page was auto-generated. Feel free to help us improve the documentation by creating a pull request.
	 * 
	 * 
	 * Premake 5.0.0 alpha 14 or later.
	 * @param value Available options:
	 * - `NoListing`
	 * - `AssemblyCode`
	 * - `AssemblyCodeAndHex`
	 * 
	 * ### Examples
	 * ```lua
	 * shaderassembler (value)
	 * ```
	 */
	shaderAssembler(value: ShaderAssemblerType): this;

	/**
	 * Specifies commands to be executed immediately as the debugger starts, before connecting to the target process.
	 * 
	 * 
	 * Premake 5.0 or later.
	 * @param commands A list of commands to execute.
	 * 
	 */
	debugStartUpCommands(commands: string[]): this;

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
	linkOptions(options: string[]): this;

	/**
	 * Specifies a list of paths to search for source code while debugging.
	 * 
	 * 
	 * Premake 5.0 or later.
	 * @param paths A list of paths the debugger will use to search for source files.
	 * 
	 */
	debugSearchPaths(paths: any): this;

	/**
	 * Specifies commands to be executed upon connection of the debugger to a remote process.
	 * 
	 * 
	 * Premake 5.0 or later.
	 * @param commands A list of commands to execute.
	 * 
	 */
	debugConnectCommands(commands: string[]): this;

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
	includeDirs(paths: any): this;

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
	 * Specifies the remote debugging target.
	 * 
	 * 
	 * Premake 5.0 or later.
	 * @param host Specifies a host to connect to when starting a remote debug session.
	 * 
	 */
	debugRemoteHost(host: string): this;

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
	rebuildCommands(commands: string[]): this;

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
	cleanCommands(commands: string[]): this;

	/**
	 * Specifies the C# language level.
	 * 
	 * 
	 * Premake 5.0 or later.
	 * @param value a string specifying the C# language level.
	 * 
	 */
	csversion(value: string): this;

	/**
	 * Enable or disable instrumented performance profiling support for binaries.
	 * 
	 * 
	 * Premake 5.0-beta6 or later.
	 * @param Value Available options:
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
	profile(Value: boolean): this;

	/**
	 * Emit each data item in a separate section. This help linker optimizations to remove unused data.
	 * 
	 * 
	 * Premake 5.0.0 beta 4 or later for Visual Studio 2022 and later, only applies to Visual Studio Android projects.
	 * @param value Available options:
	 * - `On`
	 * - `Off`
	 * 
	 */
	linkSectionData(value: LinkSectionDataType): this;

	/**
	 * Enable or disable exception handling.
	 * 
	 * 
	 * Premake 5.0 or later.
	 * @param value Available options:
	 * - `Default`: Use the toolset's default setting for exceptions.
	 * - `On`: Turn on exceptions.
	 * - `Off`: Turn off exceptions.
	 * - `SEH`: Turn on exceptions and use [structured exception handling](https://msdn.microsoft.com/en-us/library/windows/desktop/ms680657(v=vs.85).aspx) when available.
	 * - `CThrow`
	 * - `UnwindTables`
	 * 
	 */
	exceptionHandling(value: ExceptionHandlingType): this;

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
	buildCommands(commands: string[]): this;

	/**
	 * *Missing documentation*
	 * 
	 * 
	 * @param value
	 * 
	 */
	xcodeBuildResources(value: any): this;

	/**
	 * Enables various `fsanitize` options for compilers.
	 * 
	 * 
	 * Premake 5.0 or later.
	 * @param value_list Specifies the desired `fsanitize` options to enable. Available options:
	 * - `Address`: Enables compiler support for AddressSanitizer (ASan). Notes: Visual Studio support starts with 2019 16.9.
	 * - `Fuzzer`: Enables support for LibFuzzer, a coverage-guided fuzzing library. Notes: Unsupported with GCC. Visual Studio support starts with 2019 16.9.
	 * - `Thread`: Enables compiler support for ThreadSanitizer (TSan). Notes: GCC & Clang only.
	 * - `UndefinedBehavior`: Enables compiler support for UndefinedBehaviorSanitizer (UBSan). Notes: GCC & Clang only.
	 * 
	 * ### Examples
	 * ```lua
	 * sanitize { "Address", "Fuzzer" }
	 * ```
	 */
	sanitize(value_list: SanitizeType[]): this;

	/**
	 * 
	 * 
	 * 
	 * Premake 5.0.0 alpha 12 or later.
	 * @param key/value pairs The key/value pairs to apply to `buildSettings` blocks of the generated `pbxproj`.
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
	xcodeBuildSettings(key/value pairs: any): this;

	/**
	 * Specifies a list of NuGet packages that this project depends on. Only supported in Visual Studio C++ and C# projects.
	 * 
	 * 
	 * Premake 5.0 or later.
	 * @param references A list of NuGet package names and versions. Available options:
	 * - `packageName:version`
	 * 
	 * ### Examples
	 * Link against some NuGet packages.
	 * 
	 * ```lua
	 * project "foo"
	 *    nuget { "sdl2.v140:2.0.4", "sdl2.v140.redist:2.0.4" }
	 * ```
	 */
	nuGet(references: string[]): this;

	/**
	 * Emit each function item in a separate section. This help linker optimizations to remove unused data.
	 * 
	 * 
	 * Premake 5.0.0 beta 4 or later for Visual Studio 2022 and later, only applies to Visual Studio Android projects.
	 * @param value Available options:
	 * - `On`
	 * - `Off`
	 * 
	 */
	linkSectionFunction(value: LinkSectionFunctionType): this;

	/**
	 * ---
	 * title: embed
	 * ---
	 * 
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
	defines(symbols: string[]): this;

	/**
	 * Specifies whether the code generation uses ARM or Thumb instruction sets.
	 * 
	 * 
	 * Premake 5.0.0 alpha 14 or later.
	 * @param value Available options:
	 * - `thumb`: Uses the Thumb instruction set.
	 * - `arm`: Uses the ARM instruction set.
	 * - `disabled`: Disables usage of Thumb instruction set.
	 * 
	 * ### Examples
	 * ```lua
	 * thumbmode "disabled"
	 * ```
	 */
	thumbMode(value: ThumbModeType): this;

	/**
	 * Specifies which C++ Standard Library to use.
	 * The `staticruntime` API is used to determine if a static or shared version of the STL is used.
	 * 
	 * 
	 * Premake 5.0.0 alpha 14 or later.
	 * @param value Available options:
	 * - `none`: Minimal C++ runtime library.
	 * - `gabi++`: C++ runtime library.
	 * - `stlport`: STLport runtime library.
	 * - `gnu`: GNU STL library.
	 * - `libc++`: LLVM libc++ library.
	 * 
	 * ### Examples
	 * ```lua
	 * stl "libc++"
	 * ```
	 */
	stl(value: StlType): this;

	/**
	 * Enables specific compiler warnings.
	 * 
	 * 
	 * Premake 5.0 or later.
	 * @param warnings A list of warnings to enable.
	 * 
	 */
	enableWarnings(warnings: string[]): this;

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
	libDirs(paths: any): this;

	/**
	 * 
	 * 
	 * 
	 * Premake 5.0.0 alpha 12 or later.
	 * @param value Available options:
	 * - `Default`: Does not set a value for <RuntimeLibrary>.
	 * - `On`: Sets <RuntimeLibrary> to "MultiThreaded".
	 * - `Off`: Sets <RuntimeLibrary> to "MultiThreadedDLL".
	 * 
	 * ### Examples
	 * ```lua
	 * staticruntime "on"
	 * ```
	 */
	staticRuntime(value: StaticRuntimeType): this;

	/**
	 * Project directory as seen by the Windows Subsystem for Linux shell.
	 * 
	 * 
	 * Premake 5.0.0 beta 3 or later, only applies to Visual Studio Linux projects.
	 * @param path Specifies the directory on the remote machine that WSL sees the project in.
	 * 
	 * ### Examples
	 * ```lua
	 * remoteprojectdir "$(RemoteRootDir)/$(ProjectName)"
	 * ```
	 */
	remoteProjectDir(path: string): this;

	/**
	 * Sets the version of the MFC libraries to link against.
	 * 
	 * 
	 * Premake 5.0-beta4 or later on Visual Studio.
	 * @param value Available options:
	 * - `Default`: Perform the default linkage against the MFC libraries for your project type.
	 * - `Off`: Do not link against MFC libraries.
	 * - `On`: Link against the MFC libraries corresponding with the runtime type you are using (static or dynamic).
	 * - `Static`: Force static linkage to the MFC libraries.
	 * - `Dynamic`: Force dynamic linkage to the MFC libraries.
	 * 
	 */
	mfc(value: MfcType): this;

	/**
	 * - This page was auto-generated. Feel free to help us improve the documentation by creating a pull request.
	 * 
	 * 
	 * Premake 5.0.0 alpha 14 or later.
	 * @param value Available options:
	 * - `Default`: needs documentation
	 * - `Hidden`: needs documentation
	 * 
	 * ### Examples
	 * ```lua
	 * inlinesvisibility (value)
	 * ```
	 */
	inlineSVisibility(value: InlineSVisibilityType): this;

	/**
	 * Specifies a version for a custom installation of LLVM for Visual Studio.
	 * 
	 * 
	 * Premake 5.0.0 beta 3 or later for Visual Studio 2019 and later.
	 * @param version Specifies the version of the LLVM installation.
	 * 
	 * ### Examples
	 * ```lua
	 * llvmversion "16"
	 * ```
	 */
	llvmVersion(version: string): this;

	/**
	 * - This page was auto-generated. Feel free to help us improve the documentation by creating a pull request.
	 * 
	 * 
	 * Premake 5.0.0 alpha 14 or later.
	 * @param value needs documentation.
	 * 
	 * ### Examples
	 * ```lua
	 * shaderassembleroutput (value)
	 * ```
	 */
	shaderAssemblerOutput(value: string): this;

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
	llvmDir(path: any): this;

	/**
	 * Directory on the remote machine where the project will be deployed to.
	 * 
	 * 
	 * Premake 5.0.0 beta 3 or later, only applies to Visual Studio Linux projects.
	 * @param path Specifies the directory on the remote machine where the project is deployed.
	 * 
	 * ### Examples
	 * ```lua
	 * remoteprojectdir "$(RemoteProjectDir)"
	 * ```
	 */
	remoteDeployDir(path: string): this;

	/**
	 * Specifies the subdirectory on the remote machine to copy each project's source code to.
	 * 
	 * 
	 * Premake 5.0.0 beta 3 or later, only applies to Visual Studio Linux projects.
	 * @param path Specifies the directory on the remote machine where the source files of a single project will be copied to before compiling, relative to the root path
	 * 
	 * ### Examples
	 * ```lua
	 * remoteprojectrelativedir "%{prj.name}"
	 * ```
	 */
	remoteProjectRelativeDir(path: string): this;

}
