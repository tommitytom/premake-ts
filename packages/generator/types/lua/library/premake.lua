---@meta

---@alias Premake.AllowCopyLocal
---|'Default'
---|'On'
---|'Off'

---@alias Premake.Architecture
---|'universal'
---|'x86'
---|'x86_64'
---|'ARM'
---|'ARM64'
---|'RISCV64'
---|'loongarch64'
---|'ppc'
---|'ppc64'
---|'wasm32'
---|'wasm64'
---|'e2k'
---|'armv5'
---|'armv7'
---|'aarch64'
---|'mips'
---|'mips64'

---@alias Premake.Atl
---|'Off'
---|'Dynamic'
---|'Static'

---@alias Premake.BufferSecurityCheck
---|'Default'
---|'On'
---|'Off'

---@alias Premake.BuildStlModules
---|'On'
---|'Off'

---@alias Premake.Callingconvention
---|'Cdecl'
---|'FastCall'
---|'StdCall'
---|'VectorCall'

---@alias Premake.CDialect
---|'Default'
---|'C89'
---|'C90'
---|'C99'
---|'C11'
---|'C17'
---|'C23'
---|'gnu89'
---|'gnu90'
---|'gnu99'
---|'gnu11'
---|'gnu17'
---|'gnu23'

---@alias Premake.CharacterSet
---|'Default'
---|'ASCII'
---|'MBCS'
---|'Unicode'

---@alias Premake.Clr
---|'Off'
---|'On'
---|'Pure'
---|'Safe'
---|'Unsafe'
---|'NetCore'

---@alias Premake.CompileAs
---|'Default'
---|'C'
---|'C++'
---|'Objective-C'
---|'Objective-C++'
---|'Module'
---|'ModulePartition'
---|'HeaderUnit'

---@alias Premake.CppDialect
---|'Default'
---|'C++latest'
---|'C++98'
---|'C++0x'
---|'C++11'
---|'C++1y'
---|'C++14'
---|'C++1z'
---|'C++17'
---|'C++2a'
---|'C++20'
---|'C++2b'
---|'C++23'
---|'gnu++98'
---|'gnu++0x'
---|'gnu++11'
---|'gnu++1y'
---|'gnu++14'
---|'gnu++1z'
---|'gnu++17'
---|'gnu++2a'
---|'gnu++20'
---|'gnu++2b'
---|'gnu++23'

---@alias Premake.DebugEnvsInherit
---|'Default'
---|'On'
---|'Off'

---@alias Premake.DebugEnvsMerge
---|'Default'
---|'On'
---|'Off'

---@alias Premake.DebugFormat
---|'Default'
---|'c7'
---|'Dwarf'
---|'SplitDwarf'

---@alias Premake.Debugger
---|'Default'
---|'GDB'
---|'LLDB'
---|'VisualStudioLocal'
---|'VisualStudioRemote'
---|'VisualStudioWebBrowser'
---|'VisualStudioWebService'

---@alias Premake.DebuggerType
---|'Mixed'
---|'NativeOnly'
---|'ManagedOnly'
---|'NativeWithManagedCore'

---@alias Premake.DotNetSdk
---|'Default'
---|'Web'
---|'Razor'
---|'Worker'
---|'Blazor'
---|'WindowsDesktop'
---|'MSTest'

---@alias Premake.DpiAwareness
---|'Default'
---|'None'
---|'High'
---|'HighPerMonitor'

---@alias Premake.EditAndContinue
---|'Default'
---|'On'
---|'Off'

---@alias Premake.Enable64BitChecks
---|'Default'
---|'On'
---|'Off'

---@alias Premake.EnableModules
---|'On'
---|'Off'

---@alias Premake.EnablePch
---|'Default'
---|'On'
---|'Off'

---@alias Premake.EnableUnityBuild
---|'On'
---|'Off'

---@alias Premake.ExceptionHandling
---|'Default'
---|'On'
---|'Off'
---|'SEH'
---|'CThrow'
---|'UnwindTables'

---@alias Premake.ExternalAngleBrackets
---|'On'
---|'Off'

---@alias Premake.ExternalWarnings
---|'Off'
---|'Default'
---|'High'
---|'Extra'
---|'Everything'

---@alias Premake.Flags
---|'DebugEnvsDontMerge'
---|'DebugEnvsInherit'
---|'ExcludeFromBuild'
---|'FatalCompileWarnings'
---|'FatalLinkWarnings'
---|'FatalWarnings'
---|'LinkTimeOptimization'
---|'Maps'
---|'MFC'
---|'MultiProcessorCompile'
---|'No64BitChecks'
---|'NoCopyLocal'
---|'NoImplicitLink'
---|'NoImportLib'
---|'NoIncrementalLink'
---|'NoManifest'
---|'NoMinimalRebuild'
---|'NoPCH'
---|'NoRuntimeChecks'
---|'NoBufferSecurityCheck'
---|'OmitDefaultLibrary'
---|'RelativeLinks'
---|'ShadowedVariables'
---|'UndefinedIdentifiers'
---|'WPF'

---@alias Premake.FloatAbi
---|'soft'
---|'softfp'
---|'hard'

---@alias Premake.FloatingPoint
---|'Default'
---|'Fast'
---|'Strict'

---@alias Premake.GitIntegration
---|'Off'
---|'Always'
---|'OnNewFiles'

---@alias Premake.ImplicitLink
---|'Default'
---|'On'
---|'Off'

---@alias Premake.IncrementalLink
---|'Default'
---|'On'
---|'Off'

---@alias Premake.Inlinesvisibility
---|'Default'
---|'Hidden'

---@alias Premake.Inlining
---|'Default'
---|'Disabled'
---|'Explicit'
---|'Auto'

---@alias Premake.IosFamily
---|'iPhone/iPod touch'
---|'iPad'
---|'Universal'

---@alias Premake.IsaExtensions
---|'MOVBE'
---|'POPCNT'
---|'PCLMUL'
---|'LZCNT'
---|'BMI'
---|'BMI2'
---|'F16C'
---|'AES'
---|'FMA'
---|'FMA4'
---|'RDRND'

---@alias Premake.JustMyCode
---|'On'
---|'Off'

---@alias Premake.Kind
---|'ConsoleApp'
---|'Makefile'
---|'None'
---|'SharedLib'
---|'StaticLib'
---|'WindowedApp'
---|'Utility'
---|'SharedItems'
---|'Packaging'

---@alias Premake.Language
---|'C'
---|'C++'
---|'C#'
---|'F#'

---@alias Premake.Linker
---|'Default'
---|'LLD'

---@alias Premake.LinkGroups
---|'Off'
---|'On'

---@alias Premake.LinkSectionData
---|'On'
---|'Off'

---@alias Premake.LinkSectionFunction
---|'On'
---|'Off'

---@alias Premake.LinkTimeOptimization
---|'Default'
---|'On'
---|'Off'

---@alias Premake.Manifest
---|'Default'
---|'On'
---|'Off'

---@alias Premake.Mapfile
---|'Default'
---|'On'
---|'Off'

---@alias Premake.Mfc
---|'Default'
---|'Off'
---|'On'
---|'Static'
---|'Dynamic'

---@alias Premake.MinimalRebuild
---|'Default'
---|'On'
---|'Off'

---@alias Premake.MultiprocessorCompile
---|'Default'
---|'On'
---|'Off'

---@alias Premake.NativeWChar
---|'Default'
---|'On'
---|'Off'

---@alias Premake.NodefaultLib
---|'Default'
---|'On'
---|'Off'

---@alias Premake.OmitFramePointer
---|'Default'
---|'On'
---|'Off'

---@alias Premake.OpenMp
---|'On'
---|'Off'

---@alias Premake.Optimize
---|'Off'
---|'On'
---|'Debug'
---|'Size'
---|'Speed'
---|'Full'

---@alias Premake.Pic
---|'Off'
---|'On'

---@alias Premake.PreferredToolArchitecture
---|'Default'
---|'x86'
---|'x86_64'

---@alias Premake.ResourceGenerator
---|'internal'
---|'public'

---@alias Premake.Rtti
---|'Default'
---|'On'
---|'Off'

---@alias Premake.RunTime
---|'Debug'
---|'Release'

---@alias Premake.RuntimeChecks
---|'Default'
---|'Off'
---|'StackFrames'
---|'UninitializedVariables'
---|'FastChecks'

---@alias Premake.Sanitize
---|'Address'
---|'Fuzzer'
---|'Thread'
---|'UndefinedBehavior'

---@alias Premake.ShaderAssembler
---|'NoListing'
---|'AssemblyCode'
---|'AssemblyCodeAndHex'

---@alias Premake.ShaderModel
---|'2.0'
---|'3.0'
---|'4.0_level_9_1'
---|'4.0_level_9_3'
---|'4.0'
---|'4.1'
---|'5.0'
---|'5.1'
---|'rootsig_1.0'
---|'rootsig_1.1'
---|'6.0'
---|'6.1'
---|'6.2'
---|'6.3'
---|'6.4'
---|'6.5'
---|'6.6'

---@alias Premake.ShaderType
---|'Effect'
---|'Vertex'
---|'Pixel'
---|'Geometry'
---|'Hull'
---|'Domain'
---|'Compute'
---|'Library'
---|'Mesh'
---|'Amplification'
---|'Texture'
---|'RootSignature'

---@alias Premake.SharedLibType
---|'OSXBundle'
---|'OSXFramework'
---|'XCTest'

---@alias Premake.StaticRuntime
---|'Default'
---|'On'
---|'Off'

---@alias Premake.Stl
---|'none'
---|'gabi++'
---|'stlport'
---|'gnu'
---|'libc++'

---@alias Premake.StrictAliasing
---|'Off'
---|'Level1'
---|'Level2'
---|'Level3'

---@alias Premake.StructMemberAlign
---|'1'
---|'2'
---|'4'
---|'8'
---|'16'

---@alias Premake.SwiftVersion
---|'4.0'
---|'4.2'
---|'5.0'

---@alias Premake.Symbols
---|'Default'
---|'On'
---|'Off'
---|'FastLink'
---|'Full'

---@alias Premake.System
---|'aix'
---|'bsd'
---|'emscripten'
---|'haiku'
---|'ios'
---|'linux'
---|'macosx'
---|'solaris'
---|'tvos'
---|'uwp'
---|'wii'
---|'windows'
---|'android'

---@alias Premake.ThumbMode
---|'thumb'
---|'arm'
---|'disabled'

---@alias Premake.ToolChainVersion
---|'remote'
---|'wsl'
---|'wsl2'
---|'4.6'
---|'4.8'
---|'4.9'
---|'3.4'
---|'3.5'
---|'3.6'
---|'3.8'
---|'5.0'

---@alias Premake.UseImportlib
---|'Default'
---|'On'
---|'Off'

---@alias Premake.Userelativelinks
---|'Default'
---|'On'
---|'Off'

---@alias Premake.UseShortEnums
---|'Default'
---|'On'
---|'Off'

---@alias Premake.UseStandardPreprocessor
---|'On'
---|'Off'

---@alias Premake.VectorExtensions
---|'Default'
---|'AVX'
---|'AVX2'
---|'IA32'
---|'SSE'
---|'SSE2'
---|'SSE3'
---|'SSSE3'
---|'SSE4.1'
---|'SSE4.2'
---|'ALTIVEC'
---|'NEON'
---|'MXU'

---@alias Premake.Visibility
---|'Default'
---|'Hidden'
---|'Internal'
---|'Protected'

---@alias Premake.Warnings
---|'Off'
---|'Default'
---|'High'
---|'Extra'
---|'Everything'

---@alias Premake.Wpf
---|'Default'
---|'On'
---|'Off'

--[[
Visual Studio 2019 and later.
Premake 5.0-beta2 or later.
]]
---@param value boolean
function allmodulespublic(value) end

--[[
Specifies whether or not to allow for copy local of assemblies.

Specifies the desired copy mode.

Specifies whether or not to allow for copy local of assemblies.

Options:
- `Default`: Perform the default copy local mechanism for the exporter.
- `Off`: Do not copy local assemblies to the output directory.
- `On`: Allow the local assemblies to be copied to the output directory.

Premake 5.0.0-beta8 or later for Visual Studio C# Projects.
]]
---@param value Premake.AllowCopyLocal Specifies the desired copy mode.
function allowcopylocal(value) end

--[[
Specifies the target Android API level.

A number specifying the target Android API level.

Premake 5.0.0 alpha 14 or later.
]]
---@param value any A number specifying the target Android API level.
function androidapilevel(value) end

--[[
Specfies the file name for the output APK.
By default, the project name will be used as the file name for the APK.

The new file name for the output APK.

Premake 5.0.0 alpha 14 or later.
]]
---@param value string The new file name for the output APK.
function androidapplibname(value) end

--[[
Specifies the system architecture to be targeted by the configuration.

Specifies the system architecture to be targeted by the configuration.

Options:
- `universal`: The universal binaries supported by iOS and macOS
- `x86`
- `x86_64`
- `ARM`
- `ARM64`
- `RISCV64`
- `loongarch64`
- `ppc`
- `ppc64`
- `wasm32`
- `wasm64`
- `e2k`
- `mips64el`
- `armv5`: Only supported in VSAndroid projects
- `armv7`: Only supported in VSAndroid projects
- `aarch64`: Only supported in VSAndroid projects
- `mips`: Only supported in VSAndroid projects
- `mips64`: Only supported in VSAndroid projects
- `i386`: Alias for `x86`
- `amd64`: Alias for `x86_64`
- `x32`: Alias for `x86`; There is intent to deprecate this
- `x64`: Alias for `x86_64`; There is intent to deprecate this

Premake 5.0 or later.

#### Examples

Set up 32- and 64-bit Windows builds.

```lua
workspace "MyWorkspace"
   configurations { "Debug32", "Release32", "Debug64", "Release64" }

   filter "configurations:*32"
      architecture "x86"

   filter "configurations:*64"
      architecture "x86_64"
```
]]
---@param value Premake.Architecture Specifies the system architecture to be targeted by the configuration.
function architecture(value) end

--[[
- This page was auto-generated. Feel free to help us improve the documentation by creating a pull request.

Needs documentation.

Premake 5.0.0 alpha 16 or later.
]]
---@param value boolean Needs documentation.
function assemblydebug(value) end

--[[
Enables Microsoft's Active Template Library in a project.

Options:
- `Off`: Do not use ATL (default).
- `Dynamic`: Link the ATL libraries dynamically.
- `Static`: Link the ATL libraries statically.

Premake 5.0 or later.
]]
---@param value Premake.Atl
function atl(value) end

--[[
Sets the base directory for a configuration, from with other paths contained by the configuration will be made relative at export time.
You do not normally need to set this value, as it is filled in automatically with the current working directory at the time the configuration block is created by the script.

An absolute path from which other paths contained by the configuration should be made relative.

Premake 4.4 or later.
]]
---@param value string An absolute path from which other paths contained by the configuration should be made relative.
function basedir(value) end

--[[
Specifies extra paths to use when executing build commands

Paths containing executable to run when building command.

Premake 5.0.0 alpha 12 or later.

#### Examples

```lua
bindirs { "bin/", "scripts/" }
```
]]
---@param directories (string | string[]) Paths containing executable to run when building command.
function bindirs(directories) end

--[[
Specifies whether to use stack and buffer protections.

Specifies if buffer security checks should be enabled.

Options:
- `Off`: Disable buffer security checks.
- `On`: Enable buffer security checks.
- `Default`: Use the default buffer security checks.

Premake 5.0.0-beta8 or later.

#### Examples

```lua
buffersecuritycheck "On"
```

[1]: https://learn.microsoft.com/en-us/cpp/build/reference/gs-buffer-security-check?view=msvc-170
[2]: https://gcc.gnu.org/onlinedocs/gcc-15.2.0/gcc/Instrumentation-Options.html#Instrumentation-Options
]]
---@param value Premake.BufferSecurityCheck Specifies if buffer security checks should be enabled.
function buffersecuritycheck(value) end

--[[
Specifies how a file or set of files should be treated during the compilation process. It is usually paired with a filter to select a file set. If no build action is specified for a file a default action will be used, based on the file's extension.

For C/C++, `action` is the name of the MSBuild action as defined by the vcxproj format; eg: `ClCompile`, `FxCompile`, `None`, etc, and may refer to any such action available to MSBuild. For C# projects, `buildaction` behaviour is special to support legacy implementation.

Build actions are currently supported for C/C++ and C# projects.

`Compile`, `Copy`, `Embed`, and `None` are available in Premake 4.4 or later. All actions are available in Premake 5.0 or later.

#### Examples

Embed all PNG images files into the target binary.

```lua
filter "files:**.png"
   buildaction "Embed"
```

[1]: http://msdn.microsoft.com/en-us/library/ms228287(v=vs.90).aspx
[2]: http://msdn.microsoft.com/en-us/library/a6h7e207(v=vs.71).aspx
]]
---@param action string
function buildaction(action) end

--[[
Specifies one or more shell commands to be executed to build a project or file.

Specifies a list of one or more shell commands to be executed. The commands may use tokens.

Premake 5.0 or later.

#### Examples

Use [per-file custom build commands](Custom-Build-Commands.md) to compile all Lua files in a project to C:

```lua
filter 'files:**.lua'
   -- A message to display while this build step is running (optional)
   buildmessage 'Compiling %[%{file.relpath}]'

   -- One or more commands to run (required)
   buildcommands {
      'luac -o "%[%{!cfg.objdir}/%{file.basename}.out]" "%[%{file.relpath}]"'
   }

   -- One or more outputs resulting from the build (required)
   buildoutputs { '%{cfg.objdir}/%{file.basename}.c' }

```

Use a [Makefile project](Makefile-Projects.md) to execute an external makefile.

```lua
workspace "Workspace"
   configurations { "Debug", "Release" }

project "MyProject"
   kind "Makefile"

   buildcommands {
      "make %{cfg.buildcfg}"
   }

   cleancommands {
      "make clean %{cfg.buildcfg}"
   }

```
]]
---@param commands (string | string[]) Specifies a list of one or more shell commands to be executed. The commands may use tokens.
function buildcommands(commands) end

--[[
Imports custom .props files for Visual Studio.

Needs documentation.

Premake 5.0.0 alpha 12 or later.
]]
---@param value (string | string[]) Needs documentation.
function buildcustomizations(value) end

--[[
Specifies any additional dependencies for the target of a custom build rule.

Specifies a list of file paths for additional dependencies.

Premake 5.0 or later.
]]
---@param files (string | string[]) Specifies a list of file paths for additional dependencies.
function builddependencies(files) end

--[[
Specifies the source file file inputs of a custom build command or rule.

The list of input source files.

Premake 5.0 or later.
]]
---@param inputs (string | string[]) The list of input source files.
function buildinputs(inputs) end

--[[
Specifies the output location of a toolset's build logs.
If a build log path has not been specified, the toolset's default path will be used.

The output file system location for the build log file.

Premake 5.0 or later. Currently only implemented for Visual Studio 2010+.
]]
---@param path string The output file system location for the build log file.
function buildlog(path) end

--[[
Specifies the text to output to the when a custom build command or rule is executed.

The text to write to standard output.

Premake 5.0 or later.
]]
---@param message string The text to write to standard output.
function buildmessage(message) end

--[[
Passes arguments directly to the compiler command line without translation.
If a project includes multiple calls to `buildoptions` the lists are concatenated, in the order in which they appear in the script.

A list of compiler flags and options, specific to a particular compiler.

Premake 4.0 or later.

#### Examples

Use `pkg-config` style configuration when building on Linux with GCC. Build options are always compiler specific and should be targeted to a particular toolset.

```lua
filter { "system:linux", "action:gmake" }
  buildoptions { "`wx-config --cxxflags`", "-ansi", "-pedantic" }
```
]]
---@param options (string | string[]) A list of compiler flags and options, specific to a particular compiler.
function buildoptions(options) end

--[[
Specifies the file outputs of a custom build command or rule.

The file that is created or updated by the custom build command or rule.

Premake 5.0 or later.
]]
---@param output (string | string[]) The file that is created or updated by the custom build command or rule.
function buildoutputs(output) end

--[[
Sets whether or not the compiler should build STL modules.

Sets whether or not the compiler should build STL modules.

Options:
- `On`
- `Off`

Premake 5.0.0 beta 3 or later for Visual Studio 2022 and later.
]]
---@param value Premake.BuildStlModules
function buildstlmodules(value) end

--[[
Sets the [function calling convention](https://en.wikipedia.org/wiki/X86_calling_conventions).

Options:
- `Cdecl`
- `FastCall`
- `StdCall`
- `VectorCall`

Premake 5.0 or later.
]]
---@param value Premake.Callingconvention
function callingconvention(value) end

--[[
Options:
- `Default`: the default C dialect for the toolset
- `C89`: ISO C89
- `C90`: ISO C90
- `C99`: ISO C99
- `C11`: ISO C11
- `C17`: ISO C17
- `C23`: ISO C23
- `gnu89`: GNU dialect of ISO C89
- `gnu90`: GNU dialect of ISO C90
- `gnu99`: GNU dialect of ISO C99
- `gnu11`: GNU dialect of ISO C11
- `gnu17`: GNU dialect of ISO C17
- `gnu23`: GNU dialect of ISO C23

Premake 5.0.0 alpha 12 or later.
]]
---@param value Premake.CDialect
function cdialect(value) end

--[[
Set the character encoding.

Options:
- `Default`: The default encoding for the toolset; usually `Unicode`.
- `MBCS`: Multi-byte Character Set; currently Visual Studio only.
- `Unicode`: Unicode character encoding.
- `ASCII`: No actual character set.

Premake 5.0 or later.
]]
---@param value Premake.CharacterSet
function characterset(value) end

--[[
Enables clang-tidy code analysis for Visual Studio.

The `clangtidy` option enables running clang-tidy code analysis in Visual Studio projects.

Premake 5.0.0 beta 3 or later for Visual Studio 2019 and later.
]]
---@param value boolean
function clangtidy(value) end

--[[
Specifies one or more shell commands to be executed to clean a [Makefile project](Makefile-Projects.md).

Specifies a list of one or more shell commands to be executed. The commands may use tokens.

Premake 5.0 or later.

#### Examples

Use a [Makefile project](Makefile-Projects.md) to execute an external makefile.

```lua
workspace "MyWorkspace"
   configurations { "Debug", "Release" }

project "MyProject"
   kind "Makefile"

   buildcommands {
      "make %{cfg.buildcfg}"
   }

   rebuildcommands {
      "make %{cfg.buildcfg} rebuild"
   }

   cleancommands {
      "make clean %{cfg.buildcfg}"
   }

```
]]
---@param commands (string | string[]) Specifies a list of one or more shell commands to be executed. The commands may use tokens.
function cleancommands(commands) end

--[[
Specifies one or more file extensions to find and remove when cleaning the project.

A list of dot-prefixed file extensions to be cleaned.

Premake 5.0 or later. This function is currently implemented only for Visual Studio 201x.

#### Examples

Remove .zip files from the output directory when cleaning.

```lua
cleanextensions { ".zip" }
```
]]
---@param file_extensions (string | string[]) A list of dot-prefixed file extensions to be cleaned.
function cleanextensions(file_extensions) end

--[[
Enables Microsoft's Common Language Runtime for a project or configuration.
See [/clr (Common Language Runtime Compilation)](http://msdn.microsoft.com/en-us/library/k8d11d4s.aspx) in the Visual Studio documentation for more information.

Specifies the level of Common Language Runtime (CLR) support.

CLR settings that do not make sense for the current configuration, such as setting CLR support for a C# project to 'Off', will be ignored.

Options:
- `Off`: No CLR support.
- `On`: Enable CLR support.
- `Pure`: Enable pure mode MSIL. Equivalent to 'On' for .NET projects.
- `Safe`: Enable verifiable MSIL. Equivalent to 'On' for .NET projects.
- `Unsafe`: Enable unsafe operations. Equivalent to 'On' for Managed C++ projects.
- `NetCore`

Premake 5.0.

#### Examples

Set up a managed C++ project.

```lua
project "MyProject"
  kind "ConsoleApp"
  language "C++"
  clr "On"
```

Enable unsafe code in a C# project.

```lua
project "MyProject"
  kind "ConsoleApp"
  language "C#"
  clr "Unsafe"
```
]]
---@param value Premake.Clr Specifies the level of Common Language Runtime (CLR) support.
function clr(value) end

--[[
Specifies the compilation mode.

Options:
- `Default`: Compile based on file extensions that have been built into premake.
- `C`: Compile as a C source file.
- `C++`: Compile as a C++ source file.
- `Objective-C`: Compile as an Objective-C source file.
- `Objective-C++`: Compile as an Objective-C++ source file.
- `Module`: Compile as a C++20 module interface unit.
- `ModulePartition`: Compile as a C++20 module interface partition.
- `HeaderUnit`: Compile as a C++20 header unit.

Premake 5.0.0 alpha 13 or later. The options **Module**, **ModulePartition** and **HeaderUnit** are only available in Premake 5.0-beta1 or later and only implemented for Visual Studio 2019+.

#### Examples

```lua
filter { "files:**.c" }
    compileas "C++"
```
]]
---@param value Premake.CompileAs Specifies the compilation mode.
function compileas(value) end

--[[
Specify if generated file from [`buildcommands`](buildcommands.md) should be compiled or not.

Premake 5.0.0 alpha 12 or later.

#### Examples

```lua
filter "files:**.cpp.in"
  buildmessage "generate %{file.basename} from %{file.relpath}"
  buildoutputs { "%{cfg.objdir}/%{file.basename}") }
  buildcommands { "MyScript %[%{!file.abspath}] %[%{!cfg.objdir}/%{file.basename}]" }
  compilebuildoutputs "on"
filter "files:**.h.in"
  buildmessage "generate %{file.basename} from %{file.relpath}"
  buildoutputs { "%{cfg.objdir}/%{file.basename}") }
  buildcommands { "MyScript %[%{!file.abspath}] %[%{!cfg.objdir}/%{file.basename}]" }
  compilebuildoutputs "off"
filter {}
```
]]
---@param value boolean
function compilebuildoutputs(value) end

--[[
Map workspace level configuration and platforms to a different project configuration or platform.
You may map multiple configurations in a single configuration map.

5.0 or later.

#### Examples

The workspace contains four build configurations, while the project contains only the standard Debug and Release. Map the extra workspace configurations to Debug and Release.


```lua
workspace "MyWorkspace"
   configurations { "Debug", "Development", "Profile", "Release" }

project "MyProject"
   configmap {
      ["Development"] = "Debug",
      ["Profile"] = "Release",
   }
```

It can be useful to specify a map globally for a workspace, but only apply it if the target configuration is actually present in the project. In this example, host executables can be built for either Windows or Mac, while some projects build for an embedded controller. Any project that uses the special "Embedded" platform will receive the configuration map.


```lua
workspace "MyWorkspace"
   configurations { "Debug", "Release" }
   platforms { "Windows", "Mac" }

   filter { "platforms:Embedded" }
      configmap {
         ["Windows"] = "Embedded",
         ["Mac"] = "Embedded"
      }

-- this project gets the configuration map, because it defines an "Embedded" platform
project "MyEmbeddedProject"
   platforms { "Embedded" }

-- this one does not
project "MyHostProject"
```
]]
---@param value any
function configmap(value) end

--[[
Specifies the set of build configurations, such as "Debug" and "Release", for a workspace or project.
A configuration encapsulates a collection of build settings, allowing the developer to easily switch between them. "Debug" and "Release" are the most common configuration names.

For more information, see [Configurations and Platforms](Configurations-and-Platforms.md).

A list of configuration names. Spaces are allowed, but may make using certain Premake features, such as a command-line configuration selection, more difficult.

Premake 4.0 or later. Per-project configuration lists were introduced in Premake 5.0.

#### Examples

Specify debug and release configurations for a workspace.

```lua
workspace "MyWorkspace"
  configurations { "Debug", "Release" }
```

Add additional configurations for a dynamic link library version.

```lua
configurations { "Debug", "Release", "DebugDLL", "ReleaseDLL" }
```
]]
---@param names (string | string[]) A list of configuration names. Spaces are allowed, but may make using certain Premake features, such as a command-line configuration selection, more difficult.
function configurations(names) end

--[[
- This page was auto-generated. Feel free to help us improve the documentation by creating a pull request.

needs documentation.

Premake 5.0.0 beta 1 or later.
]]
---@param value boolean needs documentation.
function conformancemode(value) end

--[[
Enables the WinRT extension, C++/CX, for the specified projects/files.

Specifies whether the WinRT extension is enabled for the specified projects/files.

Premake 5.0.0 Beta 2 or later and only implemented for Visual Studio 2019+.

#### Examples

```lua
filter { "files:**_winrt.cpp" }
    consumewinrtextension "On"
```
]]
---@param value boolean Specifies whether the WinRT extension is enabled for the specified projects/files.
function consumewinrtextension(value) end

--[[
Specifies a list of libraries or assembly references which should be copied to the target directory as part of the build. Refer to the Visual Studio C# project feature of the same name.
If a project includes multiple calls to `copylocal` the lists are concatenated, in the order in which they appear in the script.

Note that, by default, all referenced non-system assemblies in a C# project are copied. This function only needs to called when a subset of the referenced assemblies should be copied. To disable copying of *all* references, use the `NoLocalCopy` build flag instead (see Examples, below).

A list of the libraries or assemblies to be copied as part of the build.

The names specified here should match the names used in the call to `links()`.

Premake 5.0 and later. This feature is currently only supported for Visual Studio C# projects.

#### Examples

Copy only the **Renderer** and **Physics** assemblies to the target directory; do not copy **nunit.framework**. Note that the links may refer to project or assembly references.

```lua
links { "Renderer", "Physics", "nunit.framework" }
copylocal { "Renderer", "Physics" }
```

The link should be specified in exactly the same way in both `links()` and `copylocal()`.

```lua
links { "Renderer", "../ThirdParty/nunit.framework" }
copylocal { "../ThirdParty/nunit.framework" }
```

If you want to prevent any assemblies from being copied, use the **NoLocalCopy** flag instead.

```lua
flags { "NoCopyLocal" }
```
]]
---@param libraries any A list of the libraries or assemblies to be copied as part of the build.
function copylocal(libraries) end

--[[
Specifies the C++ dialect to be used.

Options:
- `Default`: The default C++ dialect for the toolset.
- `C++latest`: The latest C++ dialect for the toolset or action where available, otherwise the latest C++ dialect supported by Premake.
- `C++98`: ISO C++98.
- `C++0x`: ISO C++11 Draft.
- `C++11`: ISO C++11.
- `C++1y`: ISO C++14 Draft.
- `C++14`: ISO C++14.
- `C++1z`: ISO C++17 Draft.
- `C++17`: ISO C++17.
- `C++2a`: ISO C++20 Draft.
- `C++20`: ISO C++20.
- `C++2b`: ISO C++23 Draft.
- `C++23`: ISO C++23.
- `gnu++98`: GNU dialect of ISO C++98.
- `gnu++0x`: GNU dialect of ISO C++11 Draft.
- `gnu++11`: GNU dialect of ISO C++11.
- `gnu++1y`: GNU dialect of ISO C++14 Draft.
- `gnu++14`: GNU dialect of ISO C++14.
- `gnu++1z`: GNU dialect of ISO C++17 Draft.
- `gnu++17`: GNU dialect of ISO C++17.
- `gnu++2a`: GNU dialect of ISO C++20 Draft.
- `gnu++20`: GNU dialect of ISO C++20.
- `gnu++2b`: GNU dialect of ISO C++23 Draft.
- `gnu++23`: GNU dialect of ISO C++23.

Premake 5.0.0 alpha 12 or later.
]]
---@param value Premake.CppDialect Specifies the C++ dialect to be used.
function cppdialect(value) end

--[[
Specifies the C# language level.

Specifies the C# language level.

Premake 5.0 or later.
]]
---@param value string Specifies the C# language level.
function csversion(value) end

--[[
Only used by Visual Studio .NET targets.

Maps to `<CustomToolNamespace>` MSBuild element.

Needs documentation.

Premake 5.0.0 alpha 12 or later.
]]
---@param value string Needs documentation.
function customtoolnamespace(value) end

--[[
Specifies a list of arguments to pass to the application when run under the debugger.
Note that this setting is not implemented for Xcode 3, which requires a per-user configuration file in order to make it work.

In Visual Studio, this file can be overridden by a per-user configuration file (such as `ProjectName.vcproj.MYDOMAIN-MYUSERNAME.user`). Removing this file (which is done by Premake's clean action) will restore the default settings.

A Lua list of arguments to provide to the executable while debugging.

Premake 4.4 or later.

#### Examples

```lua
filter { "configurations:Debug" }
   debugargs { "--append", "somefile.txt" }
```
]]
---@param args (string | string[]) A Lua list of arguments to provide to the executable while debugging.
function debugargs(args) end

--[[
Specifies the command to launch a project's target when debugging.
In Visual Studio, this file can be overridden by a per-user configuration file (such as `ProjectName.vcproj.MYDOMAIN-MYUSERNAME.user`). Removing this file (which is done by Premake's clean action) will restore the default settings.

The command to run to start the target.

Premake 5.0 or later.
]]
---@param command string The command to run to start the target.
function debugcommand(command) end

--[[
Specifies commands to be executed upon connection of the debugger to a remote process.

A list of commands to execute upon connection of the debugger to a remote process.

Premake 5.0 or later.
]]
---@param commands (string | string[]) A list of commands to execute upon connection of the debugger to a remote process.
function debugconnectcommands(commands) end

--[[
Sets the working directory for the integrated debugger.
Note that this settings is not implemented for Xcode, which requires a per-user configuration file in order to make it work.

In Visual Studio, this file can be overridden by a per-user configuration file (such as `ProjectName.vcproj.MYDOMAIN-MYUSERNAME.user`). Removing this file (which is done by Premake's clean action) will restore the default settings.

The path to the working directory, relative to the currently executing script file.

Premake 4.4 or later.

#### Examples

```lua
filter { "configurations:Debug" }
   debugdir "bin/debug"
```
]]
---@param path string The path to the working directory, relative to the currently executing script file.
function debugdir(path) end

--[[
Specifies environment variables for the debug session.

A list of environment variable definitions for the debug session.

Premake 5.0 or later.
]]
---@param envs (string | string[]) A list of environment variable definitions for the debug session.
function debugenvs(envs) end

--[[
Specifies whether to inherit the parent environment when using debug environment variables.
When set to `On`, the parent environment variables will be included alongside any custom [debugenvs](debugenvs.md) you specify. In Visual Studio, this appends `$(LocalDebuggerEnvironment)` to the environment variable list.

Specifies the inheritance behavior.

Options:
- `Default`: Use the toolset's default behavior (no explicit setting)
- `On`: Inherit parent environment variables
- `Off`: Do not inherit parent environment variables

Premake 5.0.0-beta8 or later.

#### Examples

Set custom debug environment variables while preserving system environment:

```lua
filter "configurations:Debug"
  debugenvs { "MY_DEBUG_PATH=C:\\temp\\debug" }
  debugenvsinherit "On"
```

Use only custom environment variables, ignoring parent environment:

```lua
filter "configurations:Debug"
  debugenvs { "ISOLATED_ENV=1" }
  debugenvsinherit "Off"
```
]]
---@param value Premake.DebugEnvsInherit Specifies the inheritance behavior.
function debugenvsinherit(value) end

--[[
Specifies whether to merge debug environment variables with the system environment.
When set to `Off`, only the [debugenvs](debugenvs.md) you specify will be used, preventing them from being merged with the existing system environment. This is useful when you want complete control over the debug environment.

Specifies the merge behavior.

Options:
- `Default`: Use the toolset's default behavior (merge enabled)
- `On`: Merge debug environment with system environment
- `Off`: Do not merge with system environment

Premake 5.0.0-beta8 or later.

#### Examples

Set debug environment variables without merging with system environment:

```lua
filter "configurations:Debug"
  debugenvs { "PATH=C:\\custom\\bin", "MY_VAR=value" }
  debugenvsmerge "Off"
```

Explicitly enable merging (default behavior):

```lua
filter "configurations:Debug"
  debugenvs { "EXTRA_VAR=1" }
  debugenvsmerge "On"
```
]]
---@param value Premake.DebugEnvsMerge Specifies the merge behavior.
function debugenvsmerge(value) end

--[[
Specifies to use the 'extended-remote' protocol, which instructs GDB to maintain a persistent connection to gdbserver.

Specifies whether to use the 'extended remote' protocol.

Premake 5.0 or later.
]]
---@param enabled boolean Specifies whether to use the 'extended remote' protocol.
function debugextendedprotocol(enabled) end

--[[
Specifies the desired format of the debug information written to the output binaries.

Specifies the desired debug format.

**Note for Visual Studio Users:** Use [editandcontinue](editandcontinue.md) to control the `/Zi` and `/ZI` switches; see [this discussion](https://github.com/premake/premake-core/issues/1425) for more information.

Options:
- `Default`: Specifies default debug format should be used by toolset.
- `c7`: Specifies that MSVC should store debuginfo in the objects rather than a separate .pdb file.
- `Dwarf`
- `SplitDwarf`

Premake 5.0 or later.
]]
---@param format Premake.DebugFormat Specifies the desired debug format.
function debugformat(format) end

--[[
Options:
- `Default`: needs documentation.
- `GDB`: needs documentation.
- `LLDB`: needs documentation.
- `VisualStudioLocal`: needs documentation.
- `VisualStudioRemote`: needs documentation.
- `VisualStudioWebBrowser`: needs documentation.
- `VisualStudioWebService`: needs documentation.

Premake 5.0.0 alpha 12 or later.
]]
---@param value Premake.Debugger
function debugger(value) end

--[[
Options:
- `Mixed`: Enables simultaneous debugging of native and .NET Framework code.
- `NativeOnly`: Restricts debugging to native code only.
- `ManagedOnly`: Restricts debugging to managed code only.
- `NativeWithManagedCore`: Enables simultaneous debugging of native and .NET Core code.

Premake 5.0.0 alpha 12 or later.
]]
---@param value Premake.DebuggerType
function debuggertype(value) end

--[[
Specifies the remote debug port.

An integer port number for the debugger to connect on.

Premake 5.0 or later.
]]
---@param portnumber any An integer port number for the debugger to connect on.
function debugport(portnumber) end

--[[
Specifies the remote debugging target.

Specifies a host to connect to when starting a remote debug session.

Premake 5.0 or later.
]]
---@param host string Specifies a host to connect to when starting a remote debug session.
function debugremotehost(host) end

--[[
Specifies a list of paths to search for source code while debugging.

A list of paths that the debugger will use to search for source files.

Premake 5.0 or later.
]]
---@param paths (string | string[]) A list of paths that the debugger will use to search for source files.
function debugsearchpaths(paths) end

--[[
Specifies commands to be executed immediately as the debugger starts, before connecting to the target process.

A list of commands to execute immediately as the debugger starts, before connecting to the target process.

Premake 5.0 or later.
]]
---@param commands (string | string[]) A list of commands to execute immediately as the debugger starts, before connecting to the target process.
function debugstartupcommands(commands) end

--[[
Specifies the default build platform for a workspace.
If `platform_name` has not been defined using [`platforms`](platforms.md) the default platform will not change from the generic one i.e. the first one passed to [`platforms`](platforms.md).

Is the name of the platform you want to use as default.

Premake 5.0.0 alpha 12 or later.

#### Examples

```lua
workspace "MyWorkspace"
  configurations { "Debug", "Release" }
  platforms { "Static32", "Shared32", "Static64", "Shared64" }
  defaultplatform "Shared64" -- Default platform from "Static32" to "Shared64"

  filter "platforms:Static32"
    kind "StaticLib"
    architecture "x32"

  filter "platforms:Static64"
    kind "StaticLib"
    architecture "x64"

  filter "platforms:Shared32"
    kind "SharedLib"
    architecture "x32"

  filter "platforms:Shared64"
    kind "SharedLib"
    architecture "x64"

```
]]
---@param platform_name string Is the name of the platform you want to use as default.
function defaultplatform(platform_name) end

--[[
Adds preprocessor or compiler symbols to a project.

Specifies a list of symbols to be defined.

Premake 4.0 or later.

#### Examples

Define two new symbols in the current project.

```lua
defines { "DEBUG", "TRACE" }
```

Symbols may also assign values.

```lua
defines { "CALLSPEC=__dllexport" }
```
]]
---@param symbols (string | string[]) Specifies a list of symbols to be defined.
function defines(symbols) end

--[[
Specify one or more non-linking project build order dependencies.

One or more sibling project names.

5.0 or later.
]]
---@param project_names (string | string[]) One or more sibling project names.
function dependson(project_names) end

--[[
Disables specific compiler warnings.

A list of warnings to disable.

Premake 5.0 or later.

Xcode project generation does not yet support `disablewarnings`. As a workaround, you can use `xcodebuildsettings` like this:

```lua
xcodebuildsettings {
    WARNING_CFLAGS = "-Wall -Wextra " ..
        "-Wno-missing-field-initializers " ..
        "-Wno-unknown-pragmas " ..
        "-Wno-unused-parameter " ..
        "-Wno-unused-local-typedef " ..
        "-Wno-missing-braces " ..
        "-Wno-microsoft-anon-tag "
}
```

#### Examples

Disable the GCC warning about using old-style C casts (`-Wno-old-style-cast` command line argument):

```lua
filter "options:cc=gcc"
  disablewarnings "old-style-cast"
```
]]
---@param warnings (string | string[]) A list of warnings to disable.
function disablewarnings(warnings) end

--[[
Text to display for rule or property definition

Text shown for the rule or property definition.

Premake 5.0.0 alpha 12 or later.

#### Examples

```lua
rule "myrule"
  display "My custom rule"
  fileextension ".in"

  propertydefinition {
    name = "myoption",
    display = "My option",
    description = "Select the option to use",
    values = { [0] = "option1", [1] = "option2"},
    value = 1
  }

  buildmessage 'custom rule: {copy} %{file.relpath} %{file.basename}'
  buildoutputs { "%{sln.location}/%{file.basename}" }
  buildcommands { "MyScript {myoption} %[%{!file.abspath}] %[%{!sln.location}/%{file.basename}]" }
```
]]
---@param value string Text shown for the rule or property definition.
function display(value) end

--[[
Enables C# xmlDocumentationFile

The `xmlDocumentationFile` option is used to include [XML comments](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/xmldoc/) in a DLL that has been included in a .NET framework or another C# project. These XML comments can then be referenced by other projects when placed alongside the corresponding SharedLib.

This feature sets the [documentationfile](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/compiler-options/output#documentationfile) option in a C# project's .csproj file for each respective [configuration](https://premake.github.io/docs/configurations/)

The directory where the documentation file should be placed after building the project using visual studio.

Premake 5.0 beta3 or later.

Visual studio is the only toolset currently supported.

#### Examples

When you set documentationFile to true, the following filepath will be generated:
```%{targetdir}/%{prj.name}.xml```
```lua
documentationfile(true)
```
If you specify a custom target directory like this:
```lua
documentationfile("%{prj.location}/bin/test")
```
the following filepath will be generated:
```bin\test\%{prj.name}.xml```
]]
---@param targetdir string The directory where the documentation file should be placed after building the project using visual studio.
function documentationfile(targetdir) end

--[[
Selects a .NET framework version.
This value currently is only applied to Visual Studio 2005 or later, and GNU makefiles using Mono. If no .NET framework version is specified the toolset default is used.

Selects a .NET framework version.

This value currently is only applied to Visual Studio 2005 or later, and GNU makefiles using Mono. If no .NET framework version is specified the toolset default is used.

Premake 5.0 or later.

#### Examples

Use the .NET framework 3.0.

```lua
dotnetframework "3.0"
```
]]
---@param version string Selects a .NET framework version.
function dotnetframework(version) end

--[[
Selects a .NET SDK
For more information see the MSDN documentation [here](https://learn.microsoft.com/en-us/dotnet/core/project-sdk/overview)

Options:
- `Default`
- `Web`
- `Razor`
- `Worker`
- `Blazor`
- `WindowsDesktop`
- `MSTest`: Requires a version be specified.

Premake 5.0 beta5 or later.

Visual studio is the only toolset currently supported.

#### Examples

```lua
dotnetsdk "Web"
```

```lua
dotnetsdk "Web/3.4.0"
```

A custom SDK can be specified using the following:
```lua
premake.api.addAllowed("dotnetsdk", "CustomSDK") -- add the custom SDK to allowed values for dotnetsdk
dotnetsdk "CustomSDK"

dotnetsdk "CustomSDK/3.4.0" -- Specifying a version with a custom SDK is also supported
```
]]
---@param sdk Premake.DotNetSdk
function dotnetsdk(sdk) end

--[[
Sets the DPI awareness settings.

Options:
- `Default`: Use the toolset's default setting for DPI awareness.
- `None`: Turn off DPI awareness.
- `High`: Turn on DPI awareness.
- `HighPerMonitor`: Turn on DPI awareness per monitor.

Premake 5.0 or later.

#### Examples

```lua
-- Turn on DPI awareness
dpiawareness "High"
```
]]
---@param value Premake.DpiAwareness
function dpiawareness(value) end

--[[
Turns the edit-and-continue features of a toolset or platform on and off.
If no value is set for a configuration, the toolset's default setting (usually "On") will be used.

A boolean value representing whether edit-and-continue features are enabled.

Options:
- `On`
- `Off`
- `Default`: Acts the same as specifying no value, using the toolset's default setting.

Premake 5.0 or later.

#### Examples

```lua
-- Turn off edit and continue
editandcontinue "Off"
```
]]
---@param value Premake.EditAndContinue A boolean value representing whether edit-and-continue features are enabled.
function editandcontinue(value) end

--[[
Turns the Editor Integration feature on. This is simply a hint to the action to add extra information into the generated workspace that allows an IDE to know which/where and how premake was executed. This is currently really only implemented for the Visual Studio action, but other actions may use this too in the future.

There is a plugin that allows re-execution of the premake step from within Visual Studio, which can be found here:
https://github.com/tvandijck/PremakeExtension
If no value is set for a configuration, the toolset's default setting (usually "Off") will be used.

A boolean value that can be set to 'On' or 'Off'.

Premake 5.0 or later.

#### Examples

```lua
-- Turn on IDE integration
editorintegration "On"
```
]]
---@param value boolean A boolean value that can be set to 'On' or 'Off'.
function editorintegration(value) end

--[[
Sets value of the *Embed* field in Xcode under *Frameworks, Libraries, and Embedded Content* to **Embed Without Signing**

This results in the framework being copied into the built app bundle during the *Embed Libraries* build phase.

The name of the content to be embedded.

Premake 5.0.0 beta 1 or later.

#### Examples

```lua
embed {
	"SDL2.dylib",
	"bar.framework"
}
```
]]
---@param value any The name of the content to be embedded.
function embed(value) end

--[[
Sets value of the *Embed* field in Xcode under *Frameworks, Libraries, and Embedded Content* to **Embed & Sign**

This results in the framework being copied into the built app bundle during the *Embed Libraries* build phase and signed.

The name of the content to be embedded and signed.

Premake 5.0.0 beta 1 or later.

#### Examples

```lua
embedAndSign {
	"SDL2.framework",
	"Another.framework"
}
```
]]
---@param value any The name of the content to be embedded and signed.
function embedandsign(value) end

--[[
Sets whether or not to check for 64 bit portability problems.

Sets whether or not to check for 64 bit portability problems.

Options:
- `Default`: Use the default portability checks for the exporter
- `Off`: Turn off portability checks.
- `On`: Turn on portability checks

Premake 5.0.0-beta8 or later for Visual Studio 2008 and earlier.
]]
---@param value Premake.Enable64BitChecks Sets whether or not to check for 64 bit portability problems.
function enable64bitchecks(value) end

--[[
- This page was auto-generated. Feel free to help us improve the documentation by creating a pull request.

Needs documentation.

Premake 5.0.0 alpha 16 or later.
]]
---@param value boolean Needs documentation.
function enabledefaultcompileitems(value) end

--[[
Sets whether or not the compiler should enable C++20 modules.

Sets whether or not the compiler should enable C++20 modules.

Options:
- `On`
- `Off`

Premake 5.0.0 beta 3 or later for Visual Studio 2019 and later.
]]
---@param value Premake.EnableModules
function enablemodules(value) end

--[[
Controls whether precompiled headers (PCH) are enabled for a configuration.
If no value is set for a configuration, the toolset's default behavior will be used.

Specifies the desired behavior.

Controls whether precompiled headers (PCH) are enabled for a configuration. If no value is set for a configuration, the toolset's default behavior will be used.

Options:
- `Default`: Use the toolset default behavior (Default value)
- `On`: Enable precompiled headers
- `Off`: Disable precompiled headers

Premake 5.0.0-beta8 or later.

#### Examples

Disable precompiled headers for a debug configuration:

```lua
filter "configurations:Debug"
   enablepch "Off"
```
]]
---@param value Premake.EnablePch Specifies the desired behavior.
function enablepch(value) end

--[[
Enables Unity Builds in Visual Studio, also known as Jumbo Builds

Options:
- `On`: Enables Unity Builds.
- `Off`: Disables Unity Builds.

Premake 5.0 and later. Versions are currently only implemented for Visual Studio 2017+.

#### Examples

Enable Unity Builds.

```lua
enableunitybuild "On"
```
]]
---@param value Premake.EnableUnityBuild
function enableunitybuild(value) end

--[[
Enables specific compiler warnings.

A list of warnings to enable.

Premake 5.0 or later.
]]
---@param warnings (string | string[]) A list of warnings to enable.
function enablewarnings(warnings) end

--[[
Specify the program entry point, e.g. `main()`.

The name of the program's entry point function.

Premake 5.0 or later.

#### Examples

Use the Microsoft Windows console application entry point instead of the usual `WinMain()`.

```lua
entrypoint "mainCRTStartup"
```
]]
---@param value string The name of the program's entry point function.
function entrypoint(value) end

--[[
Enable or disable exception handling.

Options:
- `Default`: Use the toolset's default setting for exceptions.
- `On`: Turn on exceptions.
- `Off`: Turn off exceptions.
- `SEH`: Turn on exceptions and use structured exception handling when available.
- `CThrow`
- `UnwindTables`

Premake 5.0 or later.
]]
---@param value Premake.ExceptionHandling
function exceptionhandling(value) end

--[[
Excludes a project from the build or a source file from a configuration.

Specifies whether to exclude project or source file from build.

Premake 5.0.0-beta8 or later on Visual Studio.
]]
---@param value boolean Specifies whether to exclude project or source file from build.
function excludefrombuild(value) end

--[[
Treats all headers included by `#include <header>`, where the header file is enclosed in angle brackets (`< >`), as external headers.

Options:
- `On`: Treat headers included with angle brackets as external.
- `Off`: Default. Headers are treated normally.

Premake 5.0 or later.
Visual Studio 2019 version or later.
]]
---@param value Premake.ExternalAngleBrackets
function externalanglebrackets(value) end

--[[
Specifies the include file search paths for the compiler, treating headers included from these paths as external.
For Visual Studio, these paths are placed in the "VC++ Directories" properties panel. For GCC and Clang, they are preceded with the `-isystem` flag, rather than `-I`. For toolsets which do not support the concept of external include directories, they are treated as a normal include directory.

Include files located via an external include directory are treated specially, see [externalwarnings](externalwarnings.md).

Specifies a list of include file search directories. Paths should be specified relative to the currently running script file.

Premake 5.0 or later.

#### Examples

Define two external include file search paths.

```lua
externalincludedirs { "../lua/include", "../zlib" }
```

You can also use wildcards to match multiple directories. The * will match against a single directory, ** will recurse into subdirectories as well.

```lua
externalincludedirs { "../includes/**" }
```
]]
---@param paths (string | string[]) Specifies a list of include file search directories. Paths should be specified relative to the currently running script file.
function externalincludedirs(paths) end

--[[
Controls the level of warnings that are shown by the compiler for headers that are considered external.
If no value is set for a configuration, the toolset's default warning level will be used.

Options:
- `Off`: Do not show any warning messages.
- `Default`: Use the toolset's default warning level.
- `Extra`: Enable the toolset's maximum warning level.
- `High`: Enable the toolset's maximum warning level.
- `Everything`: Enable the toolset's maximum warning level.

Premake 5.0 or later.
Visual Studio 2019 version or later.
]]
---@param value Premake.ExternalWarnings
function externalwarnings(value) end

--[[
- This page was auto-generated. Feel free to help us improve the documentation by creating a pull request.

Needs documentation.

Premake 5.0.0 beta 1 or later.
]]
---@param value boolean Needs documentation.
function fastuptodate(value) end

--[[
Specifies specific compiler warnings that should be interpreted as errors.

Specifies specific compiler warnings that should be interpreted as errors.

For Visual Studio, the MSC warning number should be used to specify the warning. On other compilers, the warning should be identified by name.

Premake 5.0 or later. Special value `All` available since Premake 5.0-beta5 or later.

#### Examples

```lua
filter { "toolset:msc" }
	fatalwarnings { "4035" } -- 'function': no return value

filter { "toolset:clang" }
	fatalwarnings { "-Wreturn-type" }

filter {}
```
]]
---@param warnings (string | string[]) Specifies specific compiler warnings that should be interpreted as errors.
function fatalwarnings(warnings) end

--[[
Specifies the target file extensions for a [custom build rule](Custom-Rules.md).

The target file extension for the rule, including the leading dot.

Premake 5.0 or later.

#### Examples

```lua
rule "Cg"
  display "Cg Compiler"
  fileextension ".cg"
```
]]
---@param ext (string | string[]) The target file extension for the rule, including the leading dot.
function fileextension(ext) end

--[[
Sets the name of a generated workspace, project, or rules file. Use it in conjunction with [location](location.md) to completely control the generated file destination.
By default, generated workspace, project, and rule files use their name as the name of the generated file. The `filename` function allows you to change this.

The desired file name for the generated workspace or project file.

#### Examples

Change the workspace name to "Master".

```lua
workspace "MyWorkspace"
  filename "Master"
```

If you plan to build with multiple tools from the same source tree you might want to split up the project files by toolset. The _ACTION global variable contains the current toolset identifier, as specified on the command line.

```lua
workspace "MyWorkspace"
   filename "MyWorkspace_%{_ACTION or ''}"
```
]]
---@param name string The desired file name for the generated workspace or project file.
function filename(name) end

--[[
Adds files to a project.

Specifies one or more file patterns. File paths should be specified relative to the currently executing script file. File patterns may contain the `*` wildcard to match against files in the current directory, or the `**` wildcard to perform a recursive match.

If a wildcard matches more files than you would like, you may filter the results using the [removefiles()](Removing-Values.md) function.

#### Examples

Add two files from to the current project, from the same directory that contains the script.

```lua
files { "hello.cpp", "goodbye.cpp" }
```

Add all C++ files from the **src/** directory to the project.

```lua
files { "src/*.cpp" }
```

Add all C++ files from the **src/** directory and any subdirectories.

```lua
files { "src/**.cpp" }
```

Add files for specific systems; might not work with all exporters.

```lua
filter "system:Windows"
  files { "src/windows/*.h", "src/windows/*.cpp" }

filter "system:MacOSX"
  files { "src/mac/*.h", "src/mac/*.cpp" }
```
]]
---@param file_list (string | string[]) Specifies one or more file patterns. File paths should be specified relative to the currently executing script file. File patterns may contain the `*` wildcard to match against files in the current directory, or the `**` wildcard to perform a recursive match.
function files(file_list) end

--[[
Limits the subsequent build settings to a particular environment.
Any settings that appear after this function in the script will be applied only to those contexts that match all of the listed keywords. See below for some usage examples.

A list of identifiers, prefixed by the field against which they should be tested.

When all of the keywords in this list match the current context, the settings that follow the `filter` statement will be applied. If any of the keywords fail this test, the settings are ignored. Keywords may contain wildcards, and are not case-sensitive.

Premake 5.0 or later.

#### Examples

Define a new symbol which applies only to debug builds.

```lua
workspace "MyWorkspace"
  configurations { "Debug", "Release" }

filter "configurations:Debug"
  defines { "_DEBUG" }
```

If no field prefix is specified in the keyword, "configurations" is used as a default.

```lua
filter "Debug"
  defines { "_DEBUG" }
```

Define a symbol only when targeting Visual Studio 2010.

```lua
filter "action:vs2010"
  defines { "VISUAL_STUDIO_2005" }
```

Wildcards can be used to match multiple terms. Define a symbol for all versions of Visual Studio.

```lua
filter "action:vs*"
  defines { "VISUAL_STUDIO" }
```

The **or** modifier may be used when several values are possible. Define a value just for library targets.

```lua
filter "kind:SharedLib or StaticLib"
  defines { "LIBRARY_TARGET" }
```

When multiple keywords are listed, an implicit **and** is assumed between them. Define compiler options only when using GNU Make and GCC.

```lua
filter { "action:gmake*", "toolset:gcc" }
  buildoptions {
    "-Wall", "-Wextra", "-Werror"
  }
```

If any keyword pattern fails to match the current context, the entire filter is skipped over. Lua's curly bracket list syntax must be used when multiple keywords are present.

Add a suffix to the debug versions of libraries.

```lua
-- (configurations == "Debug") and (kind == SharedLib or kind == "StaticLib")
filter { "Debug", "kind:SharedLib or StaticLib" }
  targetsuffix "_d"

-- Could also be written as
filter { "Debug", "kind:*Lib" }
  targetsuffix "_d"
```

Apply settings based on the presence of a [custom command line option](Command-Line-Arguments.md).

```lua
-- Using an option like --localized
filter "options:localized"
  files { "src/localizations/**" }

-- Using an option like --renderer=opengl
filter "options:renderer=opengl"
  files { "src/opengl/**.cpp" }
```

Although support is currently limited, you may also apply settings to a particular file or set of files. This example sets the build action for all PNG image files.

```lua
filter "files:*.png"
  buildaction "Embed"
```

In the case of files you may also use the **\*\*** wildcard, which will recurse into subdirectories.

```lua
filter "files:**.png"
  buildaction "Embed"
```

You can also use **not** to apply the settings to all environments where the identifier is not set.

```lua
filter "system:not windows"
  defines { "NOT_WINDOWS" }
```

You can combine different prefixes within a single keyword.

```lua
filter "system:windows or language:C#"
```

Finally, you can reset the filter and remove all active keywords by passing the function an empty table.

```lua
filter {}
```
]]
---@param keywords (string | string[]) A list of identifiers, prefixed by the field against which they should be tested.
function filter(keywords) end

--[[
Specifies build flags to modify the compiling or linking process.

Specifies build flags to modify the compiling or linking process.

The flag values are not case-sensitive. Flags that are not supported by a particular platform or toolset are ignored.

Options:
- `ExcludeFromBuild`: Exclude a source code file from the build, for the current configuration.
- `FatalCompileWarnings`: Treat compiler warnings as errors. Deprecated in Premake 5.0.0-beta4. Use `fatalwarnings` API instead.
- `FatalLinkWarnings`: Treat linker warnings as errors. Deprecated in Premake 5.0.0-beta4. Use `fatalwarnings` API instead.
- `FatalWarnings`: Treat all warnings as errors; equivalent to FatalCompileWarnings, FatalLinkWarnings. Deprecated in Premake 5.0.0-beta4. Use `fatalwarnings` API instead.
- `LinkTimeOptimization`: Enable link-time (i.e. whole program) optimizations. Deprecated in Premake 5.0.0-beta4. Use `linktimeoptimization` API instead.
- `Maps`: Enable Generate Map File for Visual Studio
- `MFC`: Enable support for Microsoft Foundation Classes. Deprecated in Premake 5.0.0-beta4. Use `mfc` API instead.
- `MultiProcessorCompile`: Enable Visual Studio to use multiple compiler processes when building.
- `No64BitChecks`: Disable 64-bit portability warnings.
- `NoBufferSecurityCheck`: Turn off stack protection checks.
- `NoCopyLocal`: Prevent referenced assemblies from being copied to the target directory (C#)
- `NoFramePointer`: Disable the generation of stack frame pointers.
- `NoImplicitLink`: Disable Visual Studio's default behavior of automatically linking dependent projects.
- `NoImportLib`: Prevent the generation of an import library for a Windows DLL.
- `NoIncrementalLink`: Disable support for Visual Studio's incremental linking feature.
- `NoManifest`: Prevent the generation of a manifest for Windows executables and shared libraries.
- `NoMinimalRebuild`: Disable Visual Studio's minimal rebuild feature. Visual Studio has deprecated this feature as of vs2015.
- `NoPCH`: Disable precompiled header support. If not specified, the toolset default behavior will be used.
- `NoRuntimeChecks`: Disable Visual Studio's default stack frame and uninitialized variable checks on debug builds.
- `OmitDefaultLibrary`: Omit the specification of a runtime library in object files.
- `RelativeLinks`: Forces the linker to use relative paths to libraries instead of absolute paths.
- `ShadowedVariables`: Warn when a variable, type declaration, or function is shadowed.
- `UndefinedIdentifiers`: Warn if an undefined identifier is evaluated in an #if directive.
- `WPF`: Mark the project as using Windows Presentation Framework, rather than WinForms.
- `DebugEnvsDontMerge`
- `DebugEnvsInherit`

Flags are currently available in Premake 5.0 beta3, but are considered deprecated. Future releases will be deprecating and removing all flags in favor of dedicated APIs.

#### Examples

```lua
-- Enable link-time (i.e. whole program) optimizations.
flags { "LinkTimeOptimization" }

```

[1]: https://docs.microsoft.com/en-us/cpp/build/reference/gm-enable-minimal-rebuild?view=vs-2017
[2]: http://msdn.microsoft.com/en-us/library/8wtf2dfz.aspx
]]
---@param flag_list Premake.Flags[] Specifies build flags to modify the compiling or linking process.
function flags(flag_list) end

--[[
Specifies the floating point ABI to use.

Options:
- `soft`: Compiler will generate library calls for floating-point operations.
- `softfp`: Compiler will generate code using hardware floating-point instructions, but still uses the soft-float calling conventions.
- `hard`: Compiler will generate floating-point instructions using FPU-specific calling conventions.

Premake 5.0.0 alpha 14 or later.
]]
---@param value Premake.FloatAbi
function floatabi(value) end

--[[
Specifies the style of floating point math which should be used.
If no value is set for a configuration, the toolset's default floating point settings will be used.

Specifies the desired style of floating point math.

Options:
- `Default`: Use the toolset's floating point settings.
- `Fast`: Enable floating point optimizations at the expense of accuracy.
- `Strict`: Improve floating point consistency at the expense of performance.

Premake 5.0 or later.
]]
---@param value Premake.FloatingPoint Specifies the desired style of floating point math.
function floatingpoint(value) end

--[[
Premake 5.0.0 alpha 12 or later.
]]
---@param value boolean
function floatingpointexceptions(value) end

--[[
Applies one or more "forced include" files to the project; these includes behave as it they had been injected into the first line of each source file in the project.

Specifies a list of files to be force included. Paths should be specified relative to the currently running script file.

Premake 5.0 or later.
]]
---@param files any Specifies a list of files to be force included. Paths should be specified relative to the currently running script file.
function forceincludes(files) end

--[[
Applies one or more "forced using" files to the project; these includes behave as it they had been injected into the first line of each source file in the project.

Specifies a list of files to be force included. Paths should be specified relative to the currently running script file.

Premake 5.0 or later.
]]
---@param files (string | string[]) Specifies a list of files to be force included. Paths should be specified relative to the currently running script file.
function forceusings(files) end

--[[
- This page was auto-generated. Feel free to help us improve the documentation by creating a pull request.

Needs documentation.

Premake 5.0.0 alpha 11 or later.
]]
---@param value (string | string[]) Needs documentation.
function frameworkdirs(value) end

--[[
Premake 5.0.0 alpha 12 or later.
]]
---@param value boolean
function functionlevellinking(value) end

--[[
Sets a prefix to be prepended to commands used by the GCC toolchain.
GCC toolsets, and cross-compilers in particular, typically have some common prefix prepended to all tools in the GCC suite. This prefix will be prepended to all such tools.

Prefixes are usually composed of multiple segments separated by '-', and the prefix should contain the final dash.
For instance, a toolchain of the style `powerpc-eabi-gcc` should have gccprefix `powerpc-eabi-`.

A string which is to be prepended to the GCC tools.

Premake 5.0 or later.

#### Examples

Set a GCC prefix to be prepended to the compiler tools.

```lua
gccprefix "powerpc-eabi-"
```
]]
---@param gccprefix string A string which is to be prepended to the GCC tools.
function gccprefix(gccprefix) end

--[[
Enable git integration to run premake on checkout.

Enable git integration to run premake on checkout.

Options:
- `Off`: Disable git integration.
- `Always`: Run premake on checkout.
- `OnNewFiles`: Run premake only when files are added/removed or if premake script has changed.

Premake 5.0.0 beta 3 or later.

#### Examples

Regenerate autoversion.h with git tag when checkout to another branch.

```lua
gitintegration "Always"

local locationDir = _OPTIONS["to"]

local function autoversion_h()
	local git_tag, errorCode = os.outputof("git describe --tag --always")
	if errorCode == 0 then
		print("git description: ", git_tag)
		local content = io.readfile("src/autoversion.h.in")
		content = content:gsub("${GIT_DESC}", git_tag)

		os.mkdir(locationDir)
		local f, err = os.writefile_ifnotequal(content, path.join(locationDir, "autoversion.h"))

		if (f == 0) then -- file not modified
		elseif (f < 0) then
			error(err, 0)
			return false
		elseif (f > 0) then
			print("Generated autoversion.h...")
		end

		return true
	else
		print("`git describe --tag` failed with error code", errorCode, git_tag)
		return false
	end
end

local have_autoversion_h = autoversion_h()

workspace "MyProject"
	location(locationDir)

	if have_autoversion_h then
		includedirs { locationDir } -- for generated file (autoversion.h)
	end
  -- [..]
```
]]
---@param action Premake.GitIntegration Enable git integration to run premake on checkout.
function gitintegration(action) end

--[[
Starts a "workspace group", a virtual folder to contain one or more projects.

The name of the virtual folder, as it should appear in the IDE. Nested groups may be created by separating the names with forward slashes.

5.0 or later.

#### Examples

```lua
workspace "MyWorkspace"

-- put the projects "Tests1" and "Tests2" in a virtual folder named "Tests"

group "Tests"

    project "Tests1"
      -- Tests1 stuff goes here

   project "Tests2"
      -- Tests2 stuff goes here

-- Any project defined after the call to group() will go into that group. The
-- project can be defined in a different script though.

group "Tests"

    include "tests/tests1"
    include "tests/tests2"

-- Groups can be nested with forward slashes, like a file path.

group "Tests/Unit"

-- To "close" a group and put projects back at the root level use
-- an empty string for the name.

group ""

   project "TestHarness"
```

The group value is latched the first time a project is declared but it can be overriden later:

```lua
local prj = project "Tests1"
prj.group = "NotActuallyATest"
```

or

```lua
project("Tests1").group = "NotActuallyATest"
```
]]
---@param name string The name of the virtual folder, as it should appear in the IDE. Nested groups may be created by separating the names with forward slashes.
function group(name) end

--[[
Specifies the application icon resource.
Currently, this is only used by Visual Studio C# projects.

The resource name of the icon.

Premake 5.0 or later.

#### Examples

```lua
project "MyProject"
   icon "MyProject.ico"
```
]]
---@param name string The resource name of the icon.
function icon(name) end

--[[
Specifies the default libraries to be ignored for a project.

A list of library names. If a valid extension isn't present, `.lib` will be automatically appended, similar to [links](links.md). Currently, the valid extensions are `.lib` and `.obj`.

Premake 5.0 or later.

#### Examples

Specify `MSVCRT.lib` as a default library to ignore.

```lua
project "MyProject"
  ignoredefaultlibraries { "MSVCRT" }
```
]]
---@param libraries any A list of library names. If a valid extension isn't present, `.lib` will be automatically appended, similar to [links](links.md). Currently, the valid extensions are `.lib` and `.obj`.
function ignoredefaultlibraries(libraries) end

--[[
Specifies the import library output directory. Import libraries are generated for Windows DLL projects.
By default, the generated project files will place the import library in the same directory as the compiled binary. The `implibdir` function allows you to change this location.

The output directory for the library, relative to the currently executing script file.

Premake 4.0 or later.

#### Examples

```lua
implibdir "../Libraries"
```
]]
---@param path string The output directory for the library, relative to the currently executing script file.
function implibdir(path) end

--[[
Specifies the import library file extension. Import libraries are generated for Windows DLL projects.
By default, the toolset static library file extension will be used (`.lib` with Windows tools, `.a` with GNU tools). The `implibextension` function allows you to change this default.

The new file extension, including the leading dot.

Premake 4.0 or later.
]]
---@param ext string The new file extension, including the leading dot.
function implibextension(ext) end

--[[
Specifies the import library base file name. Import libraries are generated for Windows DLL projects.
By default, the target name will be used as the import library file name. The `implibname` function allows you to change this default.

The new base file name for the import library.

Premake 4.0 or later.
]]
---@param name string The new base file name for the import library.
function implibname(name) end

--[[
Specifies the import library file name prefix. Import libraries are generated for Windows DLL projects.
By default, the system naming convention will be used: no prefix on Windows, a prefix of `lib` (as in `libMyProject.a`) on other systems. The `implibprefix` function allows you to change this default.

The new file name prefix.

Premake 4.0 or later.

#### Examples

```lua
implibprefix "plugin"
```

The prefix may also be set to an empty string for no prefix.

```lua
implibprefix ""
```
]]
---@param prefix string The new file name prefix.
function implibprefix(prefix) end

--[[
Specifies a file name suffix for the import library base file name. Import libraries are generated for Windows DLL projects.

The new filename suffix.

Premake 4.0 or later.

#### Examples

```lua
-- Add "-d" to debug versions of files
filter { "configurations:Debug" }
   implibsuffix "-d"
```
]]
---@param suffix string The new filename suffix.
function implibsuffix(suffix) end

--[[
Sets whether or not to implicitly link dependent libraries.

Specifies the desired implicit link mode.

Sets whether or not to implicitly link dependent libraries.

Options:
- `Default`: Performs the default implicit link behavior of your exporter.
- `Off`: Do not implicit link dependent libraries.
- `On`: Implicitly link dependent libraries.

Premake 5.0.0-beta8 or later on Visual Studio.
]]
---@param value Premake.ImplicitLink Specifies the desired implicit link mode.
function implicitlink(value) end

--[[
Specifies the include file search paths for the compiler.

Specifies a list of include file search directories. Paths should be specified relative to the currently running script file.

Premake 4.0 or later.

#### Examples

Define two include file search paths.

```lua
includedirs { "../lua/include", "../zlib" }
```

You can also use wildcards to match multiple directories. The * will match against a single directory, ** will recurse into subdirectories as well.

```lua
includedirs { "../includes/**" }
```
]]
---@param paths (string | string[]) Specifies a list of include file search directories. Paths should be specified relative to the currently running script file.
function includedirs(paths) end

--[[
Specifies the include directories to parse last per the toolset ordering and marks the directory as an external include directory.  If the exporter or toolset
does not support include directory ordering, these directories are added to the external include directory path.

Specifies a list of include file search directories. Paths should be specified relative to the currently running script file. Search order is evaluated from left to right.

Premake 5.0 or later.

GCC and Clang are the only toolsets supporting the ordering functionality in the gmakelegacy, gmake, and Codelite exporters.  All exporters and toolsets
support appending the directories to the external include directories.

#### Examples

Define two include file search paths.

```lua
includedirsafter { "../lua/include", "../zlib" }
```

You can also use wildcards to match multiple directories. The * will match against a single directory, ** will recurse into subdirectories as well.

```lua
includedirsafter { "../includes/**" }
```
]]
---@param paths (string | string[]) Specifies a list of include file search directories. Paths should be specified relative to the currently running script file. Search order is evaluated from left to right.
function includedirsafter(paths) end

--[[
Controls whether incremental linking is enabled for a configuration.
Incremental linking can improve iteration times during development by only relinking the portions of the binary that have changed. However, it may prevent some optimizations and is typically disabled for release builds.

Specifies the incremental linking setting.

Controls whether incremental linking is enabled for a configuration. Incremental linking can improve iteration times during development by only relinking the portions of the binary that have changed. However, it may prevent some optimizations and is typically disabled for release builds.

Options:
- `Default`: Use the default incremental linking behavior. Incremental linking is enabled for debug builds and disabled for optimized builds, static libraries, and when link-time optimization is enabled.
- `On`: Force incremental linking to be enabled.
- `Off`: Force incremental linking to be disabled.

Premake 5.0.0-beta8 or later.

#### Examples

Force incremental linking off for all configurations:

```lua
filter "configurations:*"
   incrementallink "Off"
```

Enable incremental linking even in release builds:

```lua
filter "configurations:Release"
   incrementallink "On"
```
]]
---@param value Premake.IncrementalLink Specifies the incremental linking setting.
function incrementallink(value) end

--[[
For Visual Studio project files, this controls the generation of the `%(AdditionalDependencies)` entry in the list of libraries that a project links.

Controls the generation of the `%(AdditionalDependencies)` entry in the list of libraries that a project links.

Visual Studio 2015 and later.
Premake 5.0-beta2 or later.
]]
---@param value boolean Controls the generation of the `%(AdditionalDependencies)` entry in the list of libraries that a project links.
function inheritdependencies(value) end

--[[
- This page was auto-generated. Feel free to help us improve the documentation by creating a pull request.

Options:
- `Default`
- `Hidden`

Premake 5.0.0 alpha 14 or later.
]]
---@param value Premake.Inlinesvisibility
function inlinesvisibility(value) end

--[[
Tells the compiler when it should inline functions.

Options:
- `Default`: Allow the compiler to use its default inlining behavior.
- `Disabled`: Turn off inlining entirely.
- `Explicit`: Only inline functions explicitly marked with the `inline` keyword.
- `Auto`: Allow the compiler to inline functions automatically.

Premake 5.0 or later.
]]
---@param value Premake.Inlining
function inlining(value) end

--[[
Replaces some function calls with intrinsic or otherwise special forms of the function that help your application run faster.

[Visual Studio 2017's Description of Intrinsics](https://docs.microsoft.com/en-us/cpp/build/reference/oi-generate-intrinsic-functions?view=vs-2017)

Premake 5.0.0 alpha 12 or later.
]]
---@param value boolean
function intrinsics(value) end

--[[
- This page was auto-generated. Feel free to help us improve the documentation by creating a pull request.

Options:
- `iPhone/iPod touch`: needs documentation
- `iPad`: needs documentation
- `Universal`: needs documentation

Premake 5.0.0 alpha 14 or later.
]]
---@param value Premake.IosFamily
function iosfamily(value) end

--[[
- This page was auto-generated. Feel free to help us improve the documentation by creating a pull request.

Options:
- `MOVBE`: needs documentation
- `POPCNT`: needs documentation
- `PCLMUL`: needs documentation
- `LZCNT`: needs documentation
- `BMI`: needs documentation
- `BMI2`: needs documentation
- `F16C`: needs documentation
- `AES`: needs documentation
- `FMA`: needs documentation
- `FMA4`: needs documentation
- `RDRND`: needs documentation

Premake 5.0.0 alpha 14 or later.
]]
---@param value Premake.IsaExtensions[]
function isaextensions(value) end

--[[
Enables or disables Visual Studio Just My Code debugging feature by passing /JMC option to the compiler. This applies only to VS C++ projects.
If no value is set for a configuration, the toolset's default option (usually "On") will be performed.

Options:
- `On`: Turn on JustMyCode debugging support.
- `Off`: Turn off JustMyCode debugging support.

Premake 5.0 or later.

Visual Studio 2017 version 15.8 or later.
]]
---@param value Premake.JustMyCode
function justmycode(value) end

--[[
Sets the kind of binary object being created by the project or configuration, such as a console or windowed application, or a shared or static library.

Options:
- `ConsoleApp`: A console or command-line application.
- `WindowedApp`: An application which runs in a desktop window. This distinction does not apply on Linux, but is important on Windows and Mac OS X.
- `SharedLib`: A shared library or DLL.
- `StaticLib`: A static library.
- `Makefile`: A special configuration type which calls out to one or more external commands. The actual type of binary created is unspecified. See [Makefile Projects](Makefile-Projects.md) for more information.
- `Utility`: A configuration which contains only custom build rules.
- `None`: A configuration which is not included in the build. Useful for projects containing only web pages, header files, or support documentation.
- `Packaging`: A configuration type to create .androidproj files, which build the apk in an Android application under Visual Studio. _Note, this was previously `AndroidProj`._
- `SharedItems`: A special configuration type which doesn't contain any build settings of its own, instead using the build settings of any projects that link it.

The **Makefile** kind is available in Premake 5.0 and later, and are supported for Visual Studio and Codelite.
The **None** kind is available in Premake 5.0 and later, and are supported for gmakelegacy, gmake, Codelite and Visual Studio.
The **Utility** kind is only available for Visual Studio, Codelite and gmake, as well as very limited support in gmakelegacy.
The **SharedItems** kind is only available for Visual Studio 2013 and later.

#### Examples

Set the project to build a command-line executable.

```lua
kind "ConsoleApp"
```

Set the project to build a shared library (DLL).

```lua
kind "SharedLib"
```

Build either a static or a shared library, depending on the selected build configuration.

```lua
workspace "MyWorkspace"
   configurations { "DebugLib", "DebugDLL", "ReleaseLib", "ReleaseDLL" }

project "MyProject"

   filter "*Lib"
      kind "StaticLib"

   filter "*DLL"
      kind "SharedLib"
```
]]
---@param kind Premake.Kind
function kind(kind) end

--[[
Sets the programming language used by a project.

The language identifier used by the project.

Options:
- `C`: Built-in; always available.
- `C++`: Built-in; always available.
- `C#`: Built-in; always available.
- `F#`: Built-in; always available.

`C`, `C++`, and `C#` are available in Premake 4.0 or later. Others are 5.0 or later.

#### Examples

Set the project language to C++.

```lua
language "C++"
```

Set the project language to C#

```lua
language "C#"
```
]]
---@param lang Premake.Language The language identifier used by the project.
function language(lang) end

--[[
Premake 5.0.0 alpha 12 or later.
]]
---@param value boolean
function largeaddressaware(value) end

--[[
Specifies the library search paths for the linker.
Library search directories are not well supported by the .NET tools. Visual Studio will change relative paths to absolute, making it difficult to share the generated project. MonoDevelop does not support search directories at all, using only the GAC. In general, it is better to include the full (relative) path to the assembly in [links](links.md) instead. C/C++ projects do not have this limitation.

Specifies a list of library search directories. Paths should be specified relative to the currently running script file.

Premake 4.0 or later.

#### Examples

Define two library file search paths.

```lua
libdirs { "../lua/libs", "../zlib" }
```

You can also use wildcards to match multiple directories. The * will match against a single directory, ** will recurse into subdirectories as well.

```lua
libdirs { "../libs/**" }
```
]]
---@param paths (string | string[]) Specifies a list of library search directories. Paths should be specified relative to the currently running script file.
function libdirs(paths) end

--[[
Turns on/off the automatic linking of `.obj` files that are output by custom build commands. The default behaviour is to link `.obj` files when they are output by custom build commands.

A boolean value that can be either 'On' or 'Off'.

Premake 5.0 or later.

#### Examples

Use [custom build commands](Custom-Build-Commands.md) to copy Wavefront .obj model files around without the linker trying to link them:

```lua
filter "models/**.obj"
	-- Copy these files into the target directory while preserving the
	-- folder structure.
	buildcommands {
		os.translateCommands '{mkdir} "%{ path.join(cfg.buildtarget.directory, path.getdirectory(file.relpath)) }"',
		os.translateCommands '{copy} "%{ file.relpath }" "%{ path.join(cfg.buildtarget.directory, path.getdirectory(file.relpath)) }"'
	}

	buildoutputs "%{ path.join(cfg.buildtarget.directory, file.relpath) }"

	-- The default behaviour is to link .obj if a custom build command
	-- outputs them, but we don't want that since these are Wavefront .obj
	-- model files and not object files.
	linkbuildoutputs "Off"
```
]]
---@param value boolean A boolean value that can be either 'On' or 'Off'.
function linkbuildoutputs(value) end

--[[
Specifies the linker.

Specifies the linker.

Options:
- `Default`: Uses the toolset platform default linker.
- `LLD`: Uses LLVM's LLD linker (supported on `gcc` and `clang` toolsets).

Premake 5.0 beta 3 or later.

#### Examples

Sets `LLD` as the linker.

```lua
filter { "toolset:clang" }
   linker { "LLD" }
```
]]
---@param value Premake.Linker Specifies the linker.
function linker(value) end

--[[
Specifies specific linker warnings that should be interpreted as errors.

Specifies specific linker warnings that should be interpreted as errors.

For Visual Studio, the MSC warning number should be used to specify the warning. On other compilers, the warning should be identified by name.

Premake 5.0 or later. Special value `All` available since Premake 5.0-beta5 or later.

#### Examples

```lua
filter { "toolset:msc" }
	fatalwarnings { "4044" } -- unrecognized option 'option'; ignored

filter {}
```
]]
---@param warnings (string | string[]) Specifies specific linker warnings that should be interpreted as errors.
function linkerfatalwarnings(warnings) end

--[[
Turns on or off the linkgroups for option for linked libraries.

Notes:

Projects using GCC or Clang will use order dependent linking by default with the default linker. While it is generally believed to be slower, this option enables order independent linking within a group of libraries by putting them inside of a link-group using the `-Wl,--start-group` and `-Wl,--end-group` linker command line arguments.

Options:
- `On`: Turn on link groups.
- `Off`: Turn off link groups.

Premake 5.0-alpha10 or later. GCC and Clang toolsets only. Codelite, gmakelegacy, and gmake exporters only.

#### Examples

```lua
project "A"
    kind "StaticLib"

project "B"
    kind "StaticLib"
    links { "A" }

project "C"
    kind "ConsoleApp"
    links { "A", "B" }
    linkgroups "On"
```
]]
---@param value Premake.LinkGroups
function linkgroups(value) end

--[[
Passes arguments directly to the linker command line without translation.

A list of linker flags and options, specific to a particular linker.

Premake 4.0 or later.

#### Examples

Use `pkg-config` style configuration when building on Linux with GCC. Build options are always linker specific and should be targeted to a particular toolset.

```lua
filter { "system:linux", "action:gmake" }
  linkoptions { "`wx-config --libs`" }
```
]]
---@param options (string | string[]) A list of linker flags and options, specific to a particular linker.
function linkoptions(options) end

--[[
Specifies a list of libraries and projects to link against.

A list of library and project names to link against.

When linking against another project in the same workspace, specify the project name here rather than the library name. Premake will figure out the correct library to link against for the current configuration and create a dependency between the projects to ensure proper build order. When linking against system libraries, do not include any prefix or file extension; Premake will use the appropriate naming conventions for the current platform. Managed C++ projects can link against managed assemblies by explicitly specifying the '.dll' file extension; unmanaged libraries should continue to be specified without any decoration. Objective C frameworks can be linked by explicitly including the '.framework' file extension. For Visual Studio, this will add the specified project into References. In contrast, 'dependson' generates a build order dependency in the solution between two projects.

Premake 4.0 or later.

#### Examples

Link against some system libraries.

```lua
filter { "system:windows" }
   links { "user32", "gdi32" }

filter { "system:linux" }
   links { "m", "png" }

filter { "system:macosx" }
   -- OS X frameworks need the extension to be handled properly
   links { "Cocoa.framework", "png" }
```

  In a workspace with two projects, link the library into the executable. Note that the project name is used to specify the link; Premake will automatically figure out the correct library file name and directory and create a project dependency.

```lua
workspace "MyWorkspace"
   configurations { "Debug", "Release" }
   language "C++"

   project "MyExecutable"
      kind "ConsoleApp"
      files "**.cpp"
      links { "MyLibrary" }

   project "MyLibrary"
      kind "SharedLib"
      files "**.cpp"
```

You may specify the linking mechanism explicitly for each library.  To set the link type of a library explicitly, add a `:static` or `:shared` suffix to the library.  Note that this functionality is only available for the `gcc` and `clang` toolsets.

```lua
workspace "MyWorkspace"
   configurations { "Debug", "Release" }
   language "C++"

   project "MyExecutable"
      kind "ConsoleApp"
      files "**.cpp"
      links { "LibraryA:static", "LibraryB:shared" }
```

You may also create links between non-library projects. In this case, Premake will generate a build dependency (the linked project will build first), but not an actual link. In this example, MyProject uses a build dependency to ensure that MyTool gets built first. It then uses MyTool as part of its build process.

```lua
workspace "MyWorkspace"
   configurations { "Debug", "Release" }
   language "C++"

   project "MyProject"
      kind "ConsoleApp"
      files "**.cpp"
      links { "MyTool" }
      prebuildcommands { "MyTool --dosomething" }

   project "MyTool"
      kind "ConsoleApp"
      files "**.cpp"
```
]]
---@param references any A list of library and project names to link against.
function links(references) end

--[[
Emit each data item in a separate section. This help linker optimizations to remove unused data.

Options:
- `On`
- `Off`

Premake 5.0.0 beta 4 or later for Visual Studio 2022 and later, only applies to Visual Studio Android projects.
]]
---@param value Premake.LinkSectionData
function linksectiondata(value) end

--[[
Emit each function item in a separate section. This help linker optimizations to remove unused data.

Options:
- `On`
- `Off`

Premake 5.0.0 beta 4 or later for Visual Studio 2022 and later, only applies to Visual Studio Android projects.
]]
---@param value Premake.LinkSectionFunction
function linksectionfunction(value) end

--[[
The **linktimeoptimization** function specifies whether or not the toolset should perform link time optimization.

Specifies whether or not to use link time optimization.

Options:
- `Off`: No LTO to be performed.
- `On`: LTO optimization enabled.
- `Default`: Default LTO optimizations for the toolset or exporter.

Premake 5.0-beta4 and later
]]
---@param value Premake.LinkTimeOptimization Specifies whether or not to use link time optimization.
function linktimeoptimization(value) end

--[[
Specifies a custom LLVM install location for Visual Studio.

Specifies a directory containing the LLVM installation.

Premake 5.0.0 beta 3 or later for Visual Studio 2019 and later.

#### Examples

```lua
llvmdir "/path/to/install"
```
]]
---@param path string Specifies a directory containing the LLVM installation.
function llvmdir(path) end

--[[
Specifies a version for a custom installation of LLVM for Visual Studio.

Specifies the version of the LLVM installation.

Premake 5.0.0 beta 3 or later for Visual Studio 2019 and later.
]]
---@param version string Specifies the version of the LLVM installation.
function llvmversion(version) end

--[[
Specifies the target locale for the resources in a particular configuration.
This value is currently only used for the Microsoft Visual Studio resource compiler in C/C++ projects.

Specifies the desired locale code.

Premake 5.0 or later.
]]
---@param code string Specifies the desired locale code.
function locale(code) end

--[[
Sets the destination directory for a generated workspace or project file.
By default, workspace and project files are generated into the same directory as the script that defines them. The `location` function allows you to change this location.

Note that unlike other values, `location` does not automatically propagate to the contained projects. Projects will use their default location unless explicitly overridden.

The directory where the generated files should be stored, specified relative to the currently executing script file.

Premake 4.0 or later.

#### Examples

Set the destination directory for a workspace. Setting the location for a project works the same way.

```lua
workspace "MyWorkspace"
  location "../build"
```

If you plan to build with multiple tools from the same source tree you might want to split up the project files by toolset. The [_ACTION](globals/premake_ACTION.md) global variable contains the current toolset identifier, as specified on the command line. Note that Lua syntax requires parenthesis around the function parameters in this case.

```lua
location ("../build/" .. _ACTION)
```
]]
---@param path string The directory where the generated files should be stored, specified relative to the currently executing script file.
function location(path) end

--[[
Adds arbitrary GNU make markup to a generated Makefile.
Only used for makefile generating actions.

Specifies one or more lines to be written to the Makefile.

Premake 5.0 or later.
]]
---@param values (string | string[]) Specifies one or more lines to be written to the Makefile.
function makesettings(values) end

--[[
Controls whether a Windows manifest file should be generated for the project.
By default, Visual Studio will generate an external manifest file for C/C++ executables.

Controls whether a Windows manifest file should be generated for the project.

By default, Visual Studio will generate an external manifest file for C/C++ executables.

Options:
- `Default`: Use default behavior (manifest is generated)
- `On`: Generate manifest file
- `Off`: Do not generate manifest file

Premake 5.0.0-beta8 or later.

#### Examples

Disable manifest generation:

```lua
manifest "Off"
```

Embed the manifest into the binary:

```lua
manifest "Embed"
```
]]
---@param value Premake.Manifest Controls whether a Windows manifest file should be generated for the project.
function manifest(value) end

--[[
Specifies whether or not to generate a mapfile.

Specifies the desired MAP generation mode.

Options:
- `Default`: Perform the default mapfile generation.
- `Off`: Do not generate a mapfile for the target.
- `On`: Generate a mapfile for the target.

Premake 5.0.0-beta8 or later on Visual Studio.
]]
---@param value Premake.Mapfile Specifies the desired MAP generation mode.
function mapfile(value) end

--[[
Specifies the path to generate a mapfile at.
If `mapfile` is not `"On"`, then no mapfile will be generated. If `mapfile` is `"On"` but this value is not set, this will generate a mapfile at a default location,
as determined by either the toolset or exporter.

Specifies the desired mapfile path

If `mapfile` is not `"On"`, then no mapfile will be generated. If `mapfile` is `"On"` but this value is not set, this will generate a mapfile at a default location, as determined by either the toolset or exporter.

Premake 5.0.0-beta8 or later on Visual Studio.
]]
---@param path string Specifies the desired mapfile path
function mapfilepath(path) end

--[[
Sets the version of the MFC libraries to link against.

Specifies the desired PIC mode.

Options:
- `Default`: Perform the default linkage against the MFC libraries for your project type.
- `Off`: Do not link against MFC libraries.
- `On`: Link against the MFC libraries corresponding with the runtime type you are using (static or dynamic).
- `Static`: Force static linkage to the MFC libraries.
- `Dynamic`: Force dynamic linkage to the MFC libraries.

Premake 5.0-beta4 or later on Visual Studio.
]]
---@param value Premake.Mfc Specifies the desired PIC mode.
function mfc(value) end

--[[
Sets the minimal rebuild option for Visual Studio projects. This feature was deprecated by Microsoft in Visual Studio 2015 and later versions. When enabled, minimal rebuild allows the compiler to recompile only the source files that are affected by changes to C++ class definitions.

Sets the minimal rebuild option for Visual Studio projects. This feature was deprecated by Microsoft in Visual Studio 2015 and later versions. When enabled, minimal rebuild allows the compiler to recompile only the source files that are affected by changes to C++ class definitions.

Options:
- `Default`: Uses the default behavior for the toolset.
- `On`: Enables minimal rebuild (Visual Studio 2015 and earlier only).
- `Off`: Disables minimal rebuild.

Premake 5.0.0-beta8 or later for Visual Studio 2015 and earlier.
]]
---@param value Premake.MinimalRebuild Sets the minimal rebuild option for Visual Studio projects. This feature was deprecated by Microsoft in Visual Studio 2015 and later versions. When enabled, minimal rebuild allows the compiler to recompile only the source files that are affected by changes to C++ class definitions.
function minimalrebuild(value) end

--[[
Controls whether multiple processors are used for compilation.

Controls whether multiple processors are used for compilation.

Options:
- `Default`: Use the compiler's default behavior.
- `On`: Use multiple processes for compilation.
- `Off`: Use a single process for compilation.

Premake 5.0.0-beta8 or later for the `msc` toolset or in Visual Studio exporters.
]]
---@param value Premake.MultiprocessorCompile Controls whether multiple processors are used for compilation.
function multiprocessorcompile(value) end

--[[
Sets the root namespace of a project.
By default, the root namespace for a project which match the target (assembly) name. This function allows you to override that default.

Currently, this is only applicable to Visual Studio C# projects.

The desired root namespace for the project.

Premake 5.0 or later.

#### Examples

```lua
project "MyProject"
   namespace "MyCompany.MyProject"
```
]]
---@param name string The desired root namespace for the project.
function namespace(name) end

--[[
Enables or disables native wchar (wide character) support by the compiler.
If no value is set for a configuration, the toolset's default wchar support will be used.

Specifies the desired state.

Options:
- `Default`: Use the toolset's default settings.
- `On`: Enable native wide character handling.
- `Off`: Disable native wide character handling.

Premake 5.0.
]]
---@param value Premake.NativeWChar Specifies the desired state.
function nativewchar(value) end

--[[
Specifies whether to omit default libraries when linking.

Specifies whether to omit default libraries when linking.

Options:
- `Default`: Use the toolset's default behavior
- `On`: Omit all default libraries
- `Off`: Include default libraries (explicit setting)

Premake 5.0.0-beta8 or later.

#### Examples

Omit all default libraries:

```lua
nodefaultlib "On"
```

Explicitly include default libraries (usually not needed):

```lua
nodefaultlib "Off"
```
]]
---@param value Premake.NodefaultLib Specifies whether to omit default libraries when linking.
function nodefaultlib(value) end

--[[
Specifies a list of NuGet packages that this project depends on. Only supported in Visual Studio C++ and C# projects.

A list of NuGet package names and versions, where the version is separated from the name with a colon.

Only supported in Visual Studio C++ and C# projects.

Premake 5.0 or later.

#### Examples

Link against some NuGet packages.

```lua
project "foo"
   nuget { "sdl2.v140:2.0.4", "sdl2.v140.redist:2.0.4" }
```
]]
---@param references (string | string[]) A list of NuGet package names and versions, where the version is separated from the name with a colon.
function nuget(references) end

--[[
Used to specify the NuGet package source. Only NuGet "galleries" are currently supported. Defaults to the official NuGet Gallery at nuget.org.

The NuGet v3 feed URL.

Premake 5.0.0 alpha 12 or later.

#### Examples

```lua
nugetsource "https://api.nuget.org/v3/index.json"
```
]]
---@param url string The NuGet v3 feed URL.
function nugetsource(url) end

--[[
Sets the directory where object and other intermediate files should be placed when building a project.
By default, intermediate files will be stored in a directory named "obj" in the same directory as the project. The `objdir` function allows you to change this location.

To avoid conflicts between build configurations, Premake will ensure that each intermediate directory is unique by appending one or more of the build configuration name, platform name, or project name. You may use the "!" prefix to prevent this behavior, and allow overlapping intermediate directories. See the examples below for more information.

The directory where the object and intermediate files should be stored, specified relative to the currently executing script file.

Premake 4.0 or later. The "!" prefix was introduced in Premake 5.0.

#### Examples

Use a directory named "obj" (the default) for intermediate files. Actual directories will be `obj/Debug` and `obj/Release`.

```lua
workspace "MyWorkspace"
   configurations { "Debug", "Release" }

project "MyProject"
   objdir "obj"
```

Use a directory named "obj" (the default) for intermediate files. Actual directories will be `obj/Debug/x32`, `obj/Debug/x64`, `obj/Release/x32`, and `obj/Release/x64`.

```lua
workspace "MyWorkspace"
   configurations { "Debug", "Release" }
   platforms { "x32", "x64" }

project "MyProject"
   objdir "obj"
```

Use tokens to reformat the path. Since the end result is unique, Premake will not append any extra directories. Actual directories will be `obj/x32_Debug`, `obj/x64_Debug`, `obj/x32_Release`, and `obj/x64_Release`.

```lua
workspace "MyWorkspace"
   configurations { "Debug", "Release" }
   platforms { "x32", "x64" }

project "MyProject"
   objdir "obj/%{cfg.platform}_%{cfg.buildcfg}"
```

Use the "!" prefix to force a specific directory using Visual Studio's provided environment variables instead of Premake tokens.

```lua
workspace "MyWorkspace"
   configurations { "Debug", "Release" }
   platforms { "x32", "x64" }

project "MyProject"
   objdir "!obj/$(Platform)_$(Configuration)"
```
]]
---@param path string The directory where the object and intermediate files should be stored, specified relative to the currently executing script file.
function objdir(path) end

--[[
Controls whether the frame pointer is omitted during compilation.

Controls whether the frame pointer is omitted during compilation.

Options:
- `Default`: Use the compiler's default behavior.
- `On`: Omit the frame pointer.
- `Off`: Keep the frame pointer.

Premake 5.0.0 alpha 14 or later.

#### Examples

Keep frame pointer in debug builds for better stack traces:
```lua
filter "configurations:Debug"
    omitframepointer "Off"
```

Omit frame pointer in release builds:
```lua
filter "configurations:Release"
    omitframepointer "On"
```

Use compiler defaults across all configurations:
```lua
omitframepointer "Default"
```
]]
---@param value Premake.OmitFramePointer Controls whether the frame pointer is omitted during compilation.
function omitframepointer(value) end

--[[
Enables or disables [OpenMP](https://en.wikipedia.org/wiki/OpenMP).
If no value is set for a configuration, the toolset's default OpenMP option (usually "Off") will be performed.

Enables or disables OpenMP.

If no value is set for a configuration, the toolset's default OpenMP option (usually "Off") will be performed.

Options:
- `On`: Turn on OpenMP.
- `Off`: Turn off OpenMP.

Premake 5.0-beta1 or later for Visual Studio 2010+ and the MSC toolset.
Premake 5.0-beta2 or later for the GCC and Clang toolsets and for xcode.
]]
---@param value Premake.OpenMp Enables or disables OpenMP.
function openmp(value) end

--[[
The **optimize** function specifies the level and type of optimization used while building the target configuration.
If no value is set for a configuration, the toolset's default optimization (usually none) will be performed.

Options:
- `Off`: No optimization will be performed.
- `On`: Perform a balanced set of optimizations.
- `Debug`: Optimization with some debugger step-through support.
- `Size`: Optimize for the smallest file size.
- `Speed`: Optimize for the best performance.
- `Full`: Full optimization.

Premake 5.0.
]]
---@param value Premake.Optimize
function optimize(value) end

--[[
Specifies the #include form of the precompiled header file name.
See [Precompiled Headers](Precompiled-Headers.md) for more information.

The name of the precompiled header, as it is specified in the #include statements of the project source code.

If your source code includes the header like this:

```
c#include "myproject.h"
```

specify the header in your script like this, even if the file itself is located on a different path relative to the project (and presumably found at compile time via the include file search paths):

```
lua
pchheader "myproject.h"
```

Premake 4.0 and up.
]]
---@param name string The name of the precompiled header, as it is specified in the #include statements of the project source code.
function pchheader(name) end

--[[
Specifies the C/C++ source code file which controls the compilation of the header.
See [Precompiled Headers](Precompiled-Headers.md) for more information.

The name of the source code file which triggers the compilation of the header. This file must contain the header file's `#include` statement as the first line of code; this is usually the only statement in the file.

(Can anyone find a good link to this in the MSDN docs? They just rearranged the site and I'm not finding anything useful right now.)

Premake 4.0 and up.
]]
---@param sourcefile_cpp string The name of the source code file which triggers the compilation of the header. This file must contain the header file's `#include` statement as the first line of code; this is usually the only statement in the file.
function pchsource(sourcefile_cpp) end

--[[
Enable generation of position independent code.
Position Independent Code is required when building dynamic libraries, or static lib's that will be linked to dynamic libraries. PIC will be enabled by default when building dynamic libraries. It will be disabled by default otherwise.

Options:
- `Off`: Do not generate position independent code.
- `On`: Generate position independent code.

Premake 5.0.
]]
---@param value Premake.Pic
function pic(value) end

--[[
Specifies a set of build platforms, which act as another configuration axis when building.
The platforms listed here are just names to be displayed in the IDE, with no intrinsic meaning. A platform named "x86_64" will not create a 64-bit build; the appropriate architecture still must be specified. For more information, see [Configurations and Platforms](Configurations-and-Platforms.md).

A list of platform names. Spaces are allowed, but may make using certain Premake features, such as command-line configuration selection, more difficult.

Premake 5.0 or later.

#### Examples

Specify debug and release configurations for a workspace, with static and shared library "platforms" in 32- and 64-bit variations.

```lua
workspace "MyWorkspace"
  configurations { "Debug", "Release" }
  platforms { "Static32", "Shared32", "Static64", "Shared64" }

  filter "platforms:Static32"
    kind "StaticLib"
    architecture "x32"

  filter "platforms:Static64"
    kind "StaticLib"
    architecture "x64"

  filter "platforms:Shared32"
    kind "SharedLib"
    architecture "x32"

  filter "platforms:Shared64"
    kind "SharedLib"
    architecture "x64"
```
]]
---@param names (string | string[]) A list of platform names. Spaces are allowed, but may make using certain Premake features, such as command-line configuration selection, more difficult.
function platforms(names) end

--[[
Specifies shell commands to run after build is finished.

One or more shell commands to run after the build is finished.

Premake 4.4 or later.

#### Examples

```lua
postbuildcommands { "{COPYFILE} %[default.config] %[bin/project.config]" }
```
]]
---@param commands (string | string[]) One or more shell commands to run after the build is finished.
function postbuildcommands(commands) end

--[[
Specifies a message to display to the user before starting execution of any specified [post-build commands](postbuildcommands.md).

The message to be displayed.

Premake 5.0 or later.

#### Examples

```lua
project "MyProject"
   postbuildcommands { "{COPYFILE} %[dependencies/*.lib] %[bin]" }
   postbuildmessage "Copying dependencies..."
```
]]
---@param message string The message to be displayed.
function postbuildmessage(message) end

--[[
Specifies shell commands to run before each build.

One or more shell commands to run before each build.

Premake 4.4 or later.

#### Examples

```lua
prebuildcommands { "{COPYFILE} %[default.config] %[bin/project.config]" }
```
]]
---@param commands (string | string[]) One or more shell commands to run before each build.
function prebuildcommands(commands) end

--[[
Specifies a message to display to the user before starting execution of any specified [pre-build commands](prebuildcommands.md).

The message to be displayed to the user before starting execution of any specified pre-build commands.

Premake 4.4 or later.

#### Examples

```lua
project "MyProject"
   prebuildcommands { "{COPYFILE} %[dependencies/*.lib] %[bin]" }
   prebuildmessage "Copying dependencies..."
```
]]
---@param message string The message to be displayed to the user before starting execution of any specified pre-build commands.
function prebuildmessage(message) end

--[[
Options:
- `Default`: needs documentation.
- `x86`: needs documentation.
- `x86_64`: needs documentation.

Premake 5.0.0 alpha 12 or later.
]]
---@param value Premake.PreferredToolArchitecture
function preferredtoolarchitecture(value) end

--[[
Specifies shell commands to run after the source files have been compiled, but before the link step (if unsupported by the action, it will be treated the same as [prebuildcommands](prebuildcommands.md)).

One or more shell commands.

Premake 4.4 or later.

#### Examples

```lua
prelinkcommands { "{COPYFILE} %[default.config] %[bin/project.config]" }
```
]]
---@param commands (string | string[]) One or more shell commands.
function prelinkcommands(commands) end

--[[
Specifies a message to display to the user before starting execution of any specified [pre-link commands](prelinkcommands.md).

The message to be displayed before starting execution of any specified pre-link commands.

Premake 4.4 or later.

#### Examples

```lua
project "MyProject"
   prelinkcommands { "{COPYFILE} %[dependencies/*.lib] %[bin]" }
   prelinkmessage "Copying dependencies..."
```
]]
---@param message string The message to be displayed before starting execution of any specified pre-link commands.
function prelinkmessage(message) end

--[[
Enable or disable instrumented performance profiling support for binaries.

Premake 5.0-beta6 or later.

#### Examples

```lua
project "MyProject"
    kind "ConsoleApp"
    profile "On"
```
]]
---@param value boolean
function profile(value) end

--[[
Creates a new project within the scope of a workspace.  After a project is invoked, any previous filter settings are cleared (i.e., reset).
Projects contain all of the settings necessary to build a single binary target, and are synonymous with a Visual Studio project. These settings include the list of source code files, the programming language used by those files, compiler flags, include directories, and which libraries to link against.

Every project belongs to a workspace.

The name for the project, which must be unique within the workspace.

If no name is given, the current project scope is returned, and also made active. By default, the project name will be used as the file name of the generated project file; be careful with spaces and special characters. You can override this default with the [filename](filename.md) call.

Premake 4.0 or later.

#### Examples

Create a new project named "MyProject". Note that a workspace must exist to contain the project. The indentation is for readability and is optional.

```lua
workspace "MyWorkspace"
   configurations { "Debug", "Release" }

project "MyProject"
   kind "ConsoleApp"
   language "C++"
```
]]
---@param name string The name for the project, which must be unique within the workspace.
function project(name) end

--[[
Creates a new property for a [custom rule](Custom-Rules.md).
Custom rules, and therefore property definitions, are currently only supported for Visual Studio 2010+.

The property definition is specified as a table with the following values. Note that no data validation is currently performed on property definition parameters at this time.

Available in Premake 5.0 or later for Visual Studio 2010 or later.

#### Examples

A simple boolean property to control a switch.

```lua
propertydefinition {
  name = "DebuggingSymbols",
  kind = "boolean",
  display = "Debugging Symbols",
  description = "Add debugging information to the generated output",
  value = false,
  switch = "-g"
}
```

To use this property in the rule:

```lua
-- If set to true, evaluates to: `tool.exe -g`
buildcommand "tool.exe [DebuggingSymbols]"
```

Enum properties allow selection from a list of possible values.

```lua
propertydefinition {
  name = "OptimizationLevel",
  display = "Optimization Level",
  values = {
    [0] = "None",
    [1] = "Size",
    [2] = "Speed",
  },
  switch = {
    [0] = "-O0",
    [1] = "-O1",
    [2] = "-O3",
  },
  value = 2,
}
```

Enum properties are set using the value names.

```lua
filter "configurations:Release"
  myCustomRuleVars { OptimizationLevel = "None" }
```
]]
---@param property_definition any The property definition is specified as a table with the following values. Note that no data validation is currently performed on property definition parameters at this time.
function propertydefinition(property_definition) end

--[[
Specifies one or more shell commands to be executed to rebuild a [Makefile project](Makefile-Projects.md).

Specifies a list of one or more shell commands to be executed. The commands may use tokens.

Premake 5.0 or later.

#### Examples

Use a [Makefile project](Makefile-Projects.md) to execute an external makefile.

```lua
workspace "MyWorkspace"
   configurations { "Debug", "Release" }

project "MyProject"
   kind "Makefile"

   buildcommands {
      "make %{cfg.buildcfg}"
   }

   rebuildcommands {
      "make %{cfg.buildcfg} rebuild"
   }

   cleancommands {
      "make clean %{cfg.buildcfg}"
   }

```
]]
---@param commands (string | string[]) Specifies a list of one or more shell commands to be executed. The commands may use tokens.
function rebuildcommands(commands) end

--[[
Directory on the remote machine where the project will be deployed to.

Specifies the directory on the remote machine where the project is deployed.

Premake 5.0.0 beta 3 or later, only applies to Visual Studio Linux projects.
]]
---@param path string Specifies the directory on the remote machine where the project is deployed.
function remotedeploydir(path) end

--[[
Project directory as seen by the Windows Subsystem for Linux shell.

Specifies the directory on the remote machine that WSL sees the project in

Premake 5.0.0 beta 3 or later, only applies to Visual Studio Linux projects.

#### Examples

```lua
remoteprojectdir "$(RemoteRootDir)/$(ProjectName)"
```
]]
---@param path string Specifies the directory on the remote machine that WSL sees the project in
function remoteprojectdir(path) end

--[[
Specifies the subdirectory on the remote machine to copy each project's source code to.

Specifies the directory on the remote machine where the source files of a single project will be copied to before compiling, relative to the root path.

Premake 5.0.0 beta 3 or later, only applies to Visual Studio Linux projects.

#### Examples

```lua
remoteprojectrelativedir "%{prj.name}"
```
]]
---@param path string Specifies the directory on the remote machine where the source files of a single project will be copied to before compiling, relative to the root path.
function remoteprojectrelativedir(path) end

--[[
Specifies the base directory on the remote machine to deploy the source code to before compiling.

Specifies the directory on the remote machine where the source files will be copied to before compiling.

Premake 5.0.0 beta 3 or later, only applies to Visual Studio Linux projects.

#### Examples

```lua
remoterootdir "~/projects/%{prj.name}"
```
]]
---@param path string Specifies the directory on the remote machine where the source files will be copied to before compiling.
function remoterootdir(path) end

--[[
Sets the `RemoveUnreferencedCodeData` property for a configuration or all configurations within a project or workspace, adding or removing the `/Zc:inline[-]` build option.

[/Zc:inline (Remove unreferenced COMDAT)](https://docs.microsoft.com/en-us/cpp/build/reference/zc-inline-remove-unreferenced-comdat?view=msvc-160)

If this property is unset, it defaults to `true` in Visual Studio.

Premake 5.0 alpha 16 or later.
]]
---@param value boolean
function removeunreferencedcodedata(value) end

--[[
Specifies preprocessor symbols for the resource compiler.

Specifies a list of symbols to be defined.

Premake 4.0 or later.

#### Examples

Define two new symbols in the current project.

```lua
resdefines { "DEBUG", "TRACE" }
```

Symbols may also assign values.

```lua
resdefines { "CALLSPEC=__dllexport" }
```
]]
---@param symbols (string | string[]) Specifies a list of symbols to be defined.
function resdefines(symbols) end

--[[
Specifies the include file search paths for the resource compiler.

Specifies a list of include file search directories. Paths should be specified relative to the currently running script file.

Premake 4.0 or later.

#### Examples

Define two include file search paths.

```lua
resincludedirs { "../lua/include", "../zlib" }
```

You can also use wildcards to match multiple directories. The * will match against a single directory, ** will recurse into subdirectories as well.

```lua
resincludedirs { "../includes/**" }
```
]]
---@param paths (string | string[]) Specifies a list of include file search directories. Paths should be specified relative to the currently running script file.
function resincludedirs(paths) end

--[[
Passes arguments directly to the resource compiler command line without translation.

A list of resource compiler flags and options, specific to a particular compiler.

Premake 4.0 or later.

#### Examples

Use `pkg-config` style configuration when building on Linux with GCC. Build options are always compiler specific and should be targeted to a particular toolset.

```lua
filter { "system:linux", "action:gmake" }
  resoptions { "`wx-config --cxxflags`", "-ansi", "-pedantic" }
```
]]
---@param options (string | string[]) A list of resource compiler flags and options, specific to a particular compiler.
function resoptions(options) end

--[[
Options:
- `internal`
- `public`

Premake 5.0.0 alpha 12 or later.
]]
---@param value Premake.ResourceGenerator
function resourcegenerator(value) end

--[[
Enable or disable [run-time type information](https://en.wikipedia.org/wiki/Run-time_type_information).

Enable or disable run-time type information.

Options:
- `Default`: Use the toolset's default setting for run-time type information.
- `On`: Turn on RTTI.
- `Off`: Turn off RTTI.

Premake 5.0 or later.
]]
---@param value Premake.Rtti Enable or disable run-time type information.
function rtti(value) end

--[[
Imports one or more [custom rules](Custom-Rules.md) into a project.

Specifies a list of one or more names of custom rules, which must be defined elsewhere in the project scripts.

Premake 5.0 or later.
]]
---@param rule_names (string | string[]) Specifies a list of one or more names of custom rules, which must be defined elsewhere in the project scripts.
function rules(rule_names) end

--[[
Runs code analysis during the build process for Visual Studio projects.

The `runcodeanalysis` option enforces code analysis during the build process in Visual Studio projects. This may significantly increase build time for projects.

Specifies whether code analysis should be run during the build process.

Premake 5.0.0 beta 3 or later for Visual Studio 2019 and later.

#### Examples

Run clang-tidy code analysis during the build process.

```lua
clangtidy("On")
runcodeanalysis("On")
```
]]
---@param value boolean Specifies whether code analysis should be run during the build process.
function runcodeanalysis(value) end

--[[
Specifies the runtime search paths used by the runtime shared library dynamic loader. OSX and Linux-specific.

Specifies a list of runtime search path directories used by shared library dynamic loader.

Paths should be specified relative to the currently running script file.

Premake 5.0 or later.
]]
---@param paths (string | string[]) Specifies a list of runtime search path directories used by shared library dynamic loader.
function runpathdirs(paths) end

--[[
Choose the type of runtime library to use.
If the runtime type is not set, Premake will try to determine the configuration type based on the setting of symbol generation and optimization flags and use the appropriate runtime automatically.

Specifies the type of runtime library to use.

Options:
- `Debug`
- `Release`

Premake 5.0 or later.

#### Examples

Force selection of a release runtime.

```lua
filter { "configurations:Debug" }
   symbols "On"
   runtime "Release"
```
]]
---@param type Premake.RunTime Specifies the type of runtime library to use.
function runtime(type) end

--[[
Controls whether runtime error checking is enabled for Visual Studio C/C++ projects.
If no value is set for a configuration, the toolset's default behavior will be used. By default, runtime checks are enabled for debug builds.

Specifies the desired behavior for runtime error checking in Visual Studio C/C++ projects.

Controls whether runtime error checking is enabled for Visual Studio C/C++ projects. If no value is set for a configuration, the toolset's default behavior will be used. By default, runtime checks are enabled for debug builds.

Options:
- `Off`: Turns off runtime error checking
- `Default`: Use the toolset default behavior (Default value)
- `StackFrames`: Enables runtime checks for stack frames
- `UninitializedVariables`: Enables runtime checks for uninitialized variables
- `FastChecks`: Enables all fast runtime checks

Premake 5.0.0-beta8 or later in Visual Studio only.

#### Examples

Disable runtime checks:

```lua
runtimechecks "Off"
```

Enable runtime checks even in optimized builds:

```lua
filter { "configurations:Release" }
	optimize "On"
	runtimechecks "FastChecks"
```
]]
---@param value Premake.RuntimeChecks Specifies the desired behavior for runtime error checking in Visual Studio C/C++ projects.
function runtimechecks(value) end

--[[
Enables various `fsanitize` options for compilers.

Specifies the desired `fsanitize` options to enable.

Options:
- `Address`: Enables compiler support for AddressSanitizer (ASan). Visual Studio support starts with 2019 16.9.
- `Fuzzer`: Enables support for LibFuzzer, a coverage-guided fuzzing library. Unsupported with GCC. Visual Studio support starts with 2019 16.9.
- `Thread`: Enables compiler support for ThreadSanitizer (TSan). GCC & Clang only.
- `UndefinedBehavior`: Enables compiler support for UndefinedBehaviorSanitizer (UBSan). GCC & Clang only.

Premake 5.0 or later.
]]
---@param value_list Premake.Sanitize[] Specifies the desired `fsanitize` options to enable.
function sanitize(value_list) end

--[[
Enables the `Scan Sources for Module Dependencies` option for Visual Studio projects.

Enables or disables the 'Scan Sources for Module Dependencies' option for Visual Studio projects.

Premake 5.0-beta2 or later. Only available for Visual Studio 2019 16.9.x and later.
]]
---@param value boolean Enables or disables the 'Scan Sources for Module Dependencies' option for Visual Studio projects.
function scanformoduledependencies(value) end

--[[
- This page was auto-generated. Feel free to help us improve the documentation by creating a pull request.

Options:
- `NoListing`
- `AssemblyCode`
- `AssemblyCodeAndHex`

Premake 5.0.0 alpha 14 or later.
]]
---@param value Premake.ShaderAssembler
function shaderassembler(value) end

--[[
- This page was auto-generated. Feel free to help us improve the documentation by creating a pull request.

Needs documentation.

Premake 5.0.0 alpha 14 or later.
]]
---@param value string Needs documentation.
function shaderassembleroutput(value) end

--[[
- This page was auto-generated. Feel free to help us improve the documentation by creating a pull request.

Needs documentation.

Premake 5.0.0 alpha 14 or later.
]]
---@param value (string | string[]) Needs documentation.
function shaderdefines(value) end

--[[
- This page was auto-generated. Feel free to help us improve the documentation by creating a pull request.

needs documentation.

Premake 5.0.0 alpha 14 or later.
]]
---@param value string needs documentation.
function shaderentry(value) end

--[[
- This page was auto-generated. Feel free to help us improve the documentation by creating a pull request.

needs documentation.

Premake 5.0.0 alpha 14 or later.
]]
---@param value string needs documentation.
function shaderheaderfileoutput(value) end

--[[
- This page was auto-generated. Feel free to help us improve the documentation by creating a pull request.

Needs documentation.

Premake 5.0.0 alpha 16 or later.
]]
---@param value (string | string[]) Needs documentation.
function shaderincludedirs(value) end

--[[
Specifies the shader model.

Specifies the shader model.

Options:
- `2.0`: Shader Model 2.0
- `3.0`: Shader Model 3.0
- `4.0_level_9_1`: Shader Model 4.0 Level 9_1
- `4.0_level_9_3`: Shader Model 4.0 Level 9_3
- `4.0`: Shader Model 4.0
- `4.1`: Shader Model 4.1
- `5.0`: Shader Model 5.0
- `5.1`: Shader Model 5.1
- `rootsig_1.0`: Root Signature Version 1.0
- `rootsig_1.1`: Root Signature Version 1.1
- `6.0`: Shader Model 6.0
- `6.1`: Shader Model 6.1
- `6.2`: Shader Model 6.2
- `6.3`: Shader Model 6.3
- `6.4`: Shader Model 6.4
- `6.5`: Shader Model 6.5
- `6.6`: Shader Model 6.6

Premake 5.0.0 alpha 14 or later.
]]
---@param value Premake.ShaderModel Specifies the shader model.
function shadermodel(value) end

--[[
Specifies the output object of compiled HLSL files.

The output path of HLSL files that have been compiled into Compiled Shader Objects.

Premake 5.0.0 alpha 14 or later.

#### Examples

This Visual Studio project will compile HLSL files to the shaders folder with a .cso extension.

```lua
shaderobjectfileoutput "shaders/%%(Filename).cso"
```
]]
---@param path string The output path of HLSL files that have been compiled into Compiled Shader Objects.
function shaderobjectfileoutput(path) end

--[[
- This page was auto-generated. Feel free to help us improve the documentation by creating a pull request.

Needs documentation.

Premake 5.0.0 alpha 14 or later.
]]
---@param value (string | string[]) Needs documentation.
function shaderoptions(value) end

--[[
Specifies the type of shader.

Specifies the type of shader.

Options:
- `Effect`
- `Vertex`
- `Pixel`
- `Geometry`
- `Hull`
- `Domain`
- `Compute`
- `Library`
- `Mesh`
- `Amplification`
- `Texture`
- `RootSignature`

Premake 5.0.0 alpha 14 or later.
]]
---@param value Premake.ShaderType Specifies the type of shader.
function shadertype(value) end

--[[
- This page was auto-generated. Feel free to help us improve the documentation by creating a pull request.

needs documentation.

Premake 5.0.0 alpha 14 or later.
]]
---@param value string needs documentation.
function shadervariablename(value) end

--[[
Options:
- `OSXBundle`: needs documentation.
- `OSXFramework`: needs documentation.
- `XCTest`: needs documentation.

Premake 5.0.0 alpha 12 or later.
]]
---@param value Premake.SharedLibType
function sharedlibtype(value) end

--[[
Specify the startup project for a workspace.
Startup projects are currently only supported by Visual Studio.

The name of the startup project, which should match the name provided in the call to project() when the project is defined.

5.0 or later.

#### Examples

```lua
workspace "MyWorkspace"
    configurations { "Debug", "Release" }
    startproject "MyProject2"

project "MyProject1"
    -- define project 1 here

project "MyProject2"
    -- define project 2 here
```
]]
---@param name string The name of the startup project, which should match the name provided in the call to project() when the project is defined.
function startproject(name) end

--[[
Options:
- `Default`: Does not set a value for `<RuntimeLibrary>`.
- `On`: Sets `<RuntimeLibrary>` to "MultiThreaded".
- `Off`: Sets `<RuntimeLibrary>` to "MultiThreadedDLL".

Premake 5.0.0 alpha 12 or later.
]]
---@param value Premake.StaticRuntime
function staticruntime(value) end

--[[
Specifies which C++ Standard Library to use.
The `staticruntime` API is used to determine if a static or shared version of the STL is used.

Options:
- `none`: Minimal C++ runtime library.
- `gabi++`: C++ runtime library.
- `stlport`: STLport runtime library.
- `gnu`: GNU STL library.
- `libc++`: LLVM libc++ library.

Premake 5.0.0 alpha 14 or later.
]]
---@param value Premake.Stl
function stl(value) end

--[[
Sets the level of allowed pointer aliasing.
If no value is set for a configuration, the toolset's settings will be used.

Specifies the desired level of optimization.

Options:
- `Off`: No strict aliasing tests will be performed.
- `Level1`
- `Level2`
- `Level3`

Premake 5.0.
]]
---@param value Premake.StrictAliasing Specifies the desired level of optimization.
function strictaliasing(value) end

--[[
Premake 5.0.0 alpha 12 or later.
]]
---@param value boolean
function stringpooling(value) end

--[[
- Specifies 1, 2, 4, 8, 16-byte boundary for struct member alignment.

Specifies the boundary for struct member alignment.

Options:
- `1`
- `2`
- `4`
- `8`
- `16`

Premake 5.0.0 alpha 14 or later for visual studio (non-clang).
Premake 5.0.0 beta 7 for others
]]
---@param value Premake.StructMemberAlign Specifies the boundary for struct member alignment.
function structmemberalign(value) end

--[[
- This page was auto-generated. Feel free to help us improve the documentation by creating a pull request.

Options:
- `4.0`
- `4.2`
- `5.0`

Premake 5.0.0 beta 1 or later.
]]
---@param value Premake.SwiftVersion
function swiftversion(value) end

--[[
Turn on/off debug symbol table generation.
By default, the generated project files will use the compilers default settings for debug symbol generation. This might be on, or off, or entirely dependent on the configuration.

An identifier for symbol information.

Options:
- `Default`: Always available.
- `Off`: Always available.
- `On`: Always available.
- `FastLink`: Available in Visual Studio 2015 or newer.
- `Full`: Available in Visual Studio 2017 or newer.

Premake 5.0 or later.

#### Examples

This project generates debug symbol information for better debugging.

```lua
project "MyProject"
    symbols "On"
```
]]
---@param switch Premake.Symbols An identifier for symbol information.
function symbols(switch) end

--[[
Specify the target location of the debug symbols.
For the Visual Studio action, this allows you to specify the location and name of the .pdb output.
Not specifying this option will result in the compilers default behavior.

The target location of the symbols.

Premake 5.0 or later.

#### Examples

This project while specific to Visual Studio shows how to output the .pdb file right next to the lib/exe/dll using the name of the lib/exe/dll itself.

```lua
project "MyProject"
    symbolspath '$(OutDir)$(TargetName).pdb'
```
]]
---@param filename string The target location of the symbols.
function symbolspath(filename) end

--[[
Specifies the system library search paths.
For Visual Studio, these paths are placed in the "VC++ Directories" properties panel. For all other tools they are treated as a normal library search path.

Specifies a list of library search directories. Paths should be specified relative to the currently running script file.

Premake 5.0 or later.

#### Examples

Define two system library search paths.

```lua
syslibdirs { "../lua/libs", "../zlib" }
```

You can also use wildcards to match multiple directories. The * will match against a single directory, ** will recurse into subdirectories as well.

```lua
syslibdirs { "../libs/**" }
```
]]
---@param paths (string | string[]) Specifies a list of library search directories. Paths should be specified relative to the currently running script file.
function syslibdirs(paths) end

--[[
Specifies the target operating system.
If no system is specified, Premake will identify and target the current operating system. This can be overridden with the `--os` command line argument, providing one of the system identifiers below.

Specifies the target operating system.

Options:
- `aix`
- `android`
- `bsd`
- `emscripten`: Supported only for the gmake and gmakelegacy actions.
- `haiku`
- `ios`
- `linux`
- `macosx`
- `solaris`
- `tvos`
- `uwp`
- `wii`
- `windows`
- `xbox360`

Premake 5.0 or later.

#### Examples

```lua
workspace "MyWorkspace"
   configurations { "Debug", "Release" }
   system { "Windows", "Unix", "Mac" }

   filter "system:Windows"
      system "windows"

   filter "system:Unix"
      system "linux"

   filter "system:Mac"
      system "macosx"
```
]]
---@param value Premake.System Specifies the target operating system.
function system(value) end

--[[
Specifies the target operation system min and max versions.

A colon-delimited string specifying the min and max version in the format `min:max`.

Ranges are currently only supported by the Windows targets with the Visual Studio actions. Otherwise, only a minimum version can be set for macOS/iOS/tvOS targets with `xcode` and `gmake`-based actions.

Premake 5.0 or later.

#### Examples

```lua
filter "system:windows"
   systemversion "10.0.10240.0" -- To specify the version of the SDK you want
```

```lua
filter "system:windows"
   systemversion "latest" -- To use the latest version of the SDK available
```

```lua
filter "system:windows"
   systemversion "10.0.10240.0:latest" -- To specify a range of minumum and maximum versions
```

```lua
filter "system:macosx"
   systemversion "13.0" -- To target a minimum macOS deployment version of 13.0
```
]]
---@param value string A colon-delimited string specifying the min and max version in the format `min:max`.
function systemversion(value) end

--[[
---
slug: premake-tags  # docusaurus reserves /docs/tags
---

tags
See the [pull request](https://github.com/premake/premake-core/pull/789) for more information; help authoring documentation is appreciated!

Needs documentation.

Premake 5.0.0 alpha 12 or later.
]]
---@param value (string | string[]) Needs documentation.
function tags(value) end

--[[
- This page was auto-generated. Feel free to help us improve the documentation by creating a pull request.

needs documentation.

Premake 5.0.0 alpha 14 or later.
]]
---@param value boolean needs documentation.
function tailcalls(value) end

--[[
Specifies the bundle extension for the MacOSX bundle.
By default, the project will use the MacOSX's normal naming conventions: .bundle for OSX Bundles, .framework for OSX Framework, and so on. The `targetbundleextension` function allows you to change this default.

The new bundle extension, including the leading dot.

Premake 5.0 beta 7 or later.
]]
---@param ext string The new bundle extension, including the leading dot.
function targetbundleextension(ext) end

--[[
Sets the destination directory for the compiled binary target.
By default, the generated project files will place their compiled output in the same directory as the script. The `targetdir` function allows you to change this location.

The file system path to the directory where the compiled target file should be stored, specified relative to the currently executing script file.

Premake 4.0 or later.

#### Examples

This project separates its compiled output by configuration type.

```lua
project "MyProject"

  filter { "configurations:Debug" }
    targetdir "bin/debug"

  filter { "configurations:Release" }
    targetdir "bin/release"
```
]]
---@param path string The file system path to the directory where the compiled target file should be stored, specified relative to the currently executing script file.
function targetdir(path) end

--[[
Specifies the file extension for the compiled binary target.
By default, the project will use the system's normal naming conventions: .exe for Windows executables, .so for Linux shared libraries, and so on. The `targetextension` function allows you to change this default.

The new file extension, including the leading dot.

Premake 4.0 or later.
]]
---@param ext string The new file extension, including the leading dot.
function targetextension(ext) end

--[[
Specifies the base file name for the compiled binary target.
By default, the project name will be used as the file name of the compiled binary target. A Windows executable project named "MyProject" will produce a binary named MyProject.exe. The `targetname` function allows you to change this default.

The new base file name.

Premake 4.0 or later.
]]
---@param name string The new base file name.
function targetname(name) end

--[[
Specifies the file name prefix for the compiled binary target.
By default, the system naming convention will be used: a "lib" prefix for POSIX libraries (as in `libMyProject.so`), and no prefix elsewhere. The `targetprefix` function allows you to change this default.

The new file name prefix.

Premake 4.0 or later.

#### Examples

```lua
targetprefix "plugin"
```

The prefix may also be set to an empty string for no prefix.

```lua
targetprefix ""
```
]]
---@param prefix string The new file name prefix.
function targetprefix(prefix) end

--[[
Specifies a file name suffix for the compiled binary target.

The new filename suffix.

Premake 4.0 or later.

#### Examples

```lua
-- Add "-d" to debug versions of files
filter { "configurations:Debug" }
   targetsuffix "-d"
```
]]
---@param suffix string The new filename suffix.
function targetsuffix(suffix) end

--[[
Specifies whether the code generation uses ARM or Thumb instruction sets.

Specifies whether the code generation uses ARM or Thumb instruction sets.

Options:
- `thumb`: Uses the Thumb instruction set.
- `arm`: Uses the ARM instruction set.
- `disabled`: Disables usage of Thumb instruction set.

Premake 5.0.0 alpha 14 or later.
]]
---@param value Premake.ThumbMode Specifies whether the code generation uses ARM or Thumb instruction sets.
function thumbmode(value) end

--[[
Specifies the version of the toolchain to use.

Specifies the version of the toolchain to use.

Premake 5.0.0 alpha 14 or later, only applies to Android projects.
Premake 5.0.0 beta 3 or later, only applies to Visual Studio Linux projects.
]]
---@param value Premake.ToolChainVersion Specifies the version of the toolchain to use.
function toolchainversion(value) end

--[[
Selects the compiler, linker, etc. which are used to build a project or configuration.
If no toolset is specified for a configuration, the system or IDE default will be used.

A string identifier for the toolset.

If a specific toolset version is desired, it may be specified as part of the identifier, separated by a dash.

Premake 5.0 and later. Versions are currently only implemented for Visual Studio 2010+.

#### Examples

Specify version 110 of the Windows platform toolset.

```lua
toolset "msc-v110" -- or...
toolset "v100"    -- for those more familiar with Visual Studio's way
```

Use [Clang/C2](http://llvm.org/builds/) with Visual Studio
```lua
toolset "msc-llvm-vs2014" -- pre VS 2019
toolset "clang" -- VS 2019 and newer
```

Use the toolset for Windows XP
```lua
toolset "v140_xp"
```
]]
---@param identifier string A string identifier for the toolset.
function toolset(identifier) end

--[[
Selects the tools version which is used to build a project.
If no version is specified for a configuration, the build tool will define the a default version.

A string identifier for the toolset version.

Premake 5.0 and later. Versions are currently only implemented for Visual Studio 2017+.

#### Examples

Specify tool version 14.27.29110 of the toolset.

```lua
toolsversion "14.27.29110"
```
]]
---@param identifier string A string identifier for the toolset version.
function toolsversion(identifier) end

--[[
Removes preprocessor or compiler symbols from a project.
If a project includes multiple calls to `undefines` the lists are concatenated, in the order in which they appear in the script.

Specifies a list of symbols to be undefined.

Premake 5.0 or later

#### Examples

Undefine two symbols in the current project.

```lua
undefines { "DEBUG", "TRACE" }
```
]]
---@param symbols (string | string[]) Specifies a list of symbols to be undefined.
function undefines(symbols) end

--[[
Removes preprocessor or compiler symbols from a project.
If a project includes multiple calls to `undefines` the lists are concatenated, in the order in which they appear in the script.

Specifies a list of symbols to be undefined.

Premake 5.0 or later

#### Examples

Undefine two symbols in the current project.

```lua
undefines { "DEBUG", "TRACE" }
```
]]
---@param symbols (string | string[]) Specifies a list of symbols to be undefined.
function undefines(symbols) end

--[[
Force sign of `char`
Note that `char` is still a distinct type from `signed char` and `unsigned char`.

Don't use that api to have default for gcc/clang

Premake 5.0.0 alpha 14 or later.
]]
---@param value boolean
function unsignedchar(value) end

--[[
Specifies a reusable block of configuration to be consumed at a later point.
The `usage` API is used to define configuration to be consumed by the `uses` API.  Usages must have unique names, except for magic usage block names (as described below).
]]
---@param value string
function usage(value) end

--[[
Turn on/off full paths usage in diagnostics
By default, the generated project files will use the compilers default settings, which is in most cases "On" for debug and "Off" for release.
In Visual Studio, this overrides the /FC flag which is forced on when using debug builds.

Specifies whether to use relative or absolute paths in diagnostics.

Premake 5.0.0 beta 1 or later.

#### Examples

```lua
project "MyProject"
    usefullpaths "On" -- Uses full paths in diagnostics
```
]]
---@param value boolean Specifies whether to use relative or absolute paths in diagnostics.
function usefullpaths(value) end

--[[
Sets whether or not to generate an import library for a Windows DLL.

Specifies the desired import library behavior.

Options:
- `Default`: Performs the toolset default behavior of generating an import library.
- `Off`: Prevents the generation of an import library for a Windows DLL.
- `On`: Explicitly generates an import library for a Windows DLL.

Premake 5.0.0-beta8 or later.
]]
---@param value Premake.UseImportlib Specifies the desired import library behavior.
function useimportlib(value) end

--[[
Controls whether the linker uses relative or absolute paths for library references.
If no value is set for a configuration, the toolset's default behavior will be used.

Specifies the desired behavior.

Controls whether the linker uses relative or absolute paths for library references. If no value is set for a configuration, the toolset's default behavior will be used.

Options:
- `Default`: Use the toolset default behavior (Default value)
- `On`: Use relative paths for library references
- `Off`: Use absolute paths for library references

Premake 5.0.0-beta8 or later.

#### Examples

Use relative paths for library linking:

```lua
userelativelinks "On"
```
]]
---@param value Premake.Userelativelinks Specifies the desired behavior.
function userelativelinks(value) end

--[[
Specifies which usage blocks a project should consume.
The `uses` API is used to consume `usage` blocks from within a project. The `usage` blocks are case sensitive.

#### Examples

Demonstration of using `uses`. When specifying a `uses` matching a project name containing a `PUBLIC` or `INTERFACE` usage block, the `uses` statement will match against that. If a `project` with a `PUBLIC` or `INTERFACE` usage block
cannot be found, then it will fall back to searching all `usage` blocks to match the provided name, as described above.

```lua
project "MyProject"
    usage "PUBLIC"
        defines { "PUBLIC_DEF" }
    usage "Custom"
        defines { "CUSTOM_DEF" }

project "MyExe"
    uses { "MyProject" }

project "MyDLL"
    uses { "Custom" }
```
]]
---@param value (string | string[])
function uses(value) end

--[[
Specifies if short enums should be used.
If no value is set for a configuration, the toolset's default option will be used.

Specifies the desired wpf setting.

Binaries compiled with short enums may not be ABI compatible with those without. It is recommended to compile all projects with the same setting.

Options:
- `Default`: Use the default behavior
- `On`: Enums are backed by the smallest legal integral.
- `Off`: Enums are backed by the default integral.

Premake 5.0.0-beta8 or later for Android projects in Visual Studio or any GCC/Clang project.
]]
---@param value Premake.UseShortEnums Specifies the desired wpf setting.
function useshortenums(value) end

--[[
Enables a token-based preprocessor conforming to C99, C++11, and later standards.

Options:
- `Off`: Do not use the conforming processor.
- `On`: Enable the conforming processor.

Premake 5.0 or later.
]]
---@param value Premake.UseStandardPreprocessor
function usestandardpreprocessor(value) end

--[[
Specifies the file search paths for `using` statements.

Specifies a list of file search directories. Paths should be specified relative to the currently running script file.

Premake 5.0 or later.

#### Examples

Define two using file search paths.

```lua
usingdirs { "../lib1", "../lib2" }
```

You can also use wildcards to match multiple directories. The * will match against a single directory, ** will recurse into subdirectories as well.

```lua
usingdirs { "../libs/**" }
```
]]
---@param paths (string | string[]) Specifies a list of file search directories. Paths should be specified relative to the currently running script file.
function usingdirs(paths) end

--[[
Sets the [Universally Unique Identifier](http://en.wikipedia.org/wiki/UUID) (UUID) for a project.
UUIDs are synonymous (for Premake's purposes) with [Globally Unique Identifiers](http://en.wikipedia.org/wiki/Globally_Unique_Identifier) (GUID).

Premake automatically assigns a UUID to each project, which is used by the Visual Studio generators to identify the project within a workspace. This UUID is essentially random and will change each time the project file is generated. If you are storing the generated Visual Studio project files in a version control system, this will create a lot of unnecessary deltas. Using the `uuid` function, you can assign a fixed UUID to each project which never changes, removing the randomness from the generated projects.

The UUID for the current project. It should take the form '01234567-ABCD-ABCD-ABCD-0123456789AB'. You can use the Visual Studio guidgen tool to create new UUIDs, or a website like www.famkruithof.net/uuid/uuidgen, or run Premake once to generate Visual Studio files and copy the assigned UUIDs.

Premake 4.0 or later.

#### Examples

Set the UUID for a current project.

```lua
uuid "BE2461B7-236F-4278-81D3-F0D476F9A4C0"
```
]]
---@param project_uuid string The UUID for the current project. It should take the form '01234567-ABCD-ABCD-ABCD-0123456789AB'. You can use the Visual Studio guidgen tool to create new UUIDs, or a website like www.famkruithof.net/uuid/uuidgen, or run Premake once to generate Visual Studio files and copy the assigned UUIDs.
function uuid(project_uuid) end

--[[
Specifies the level of vector processing extensions to enable while compiling the target configuration.
If no value is set for a configuration, the toolset's default vector extension settings will be used.

Specifies the desired level of vector processing instructions.

Options:
- `Default`: Use the toolset's default vector extension settings.
- `AVX`: Use Advanced Vector Extensions.
- `AVX2`: Use Advanced Vector Extensions 2.
- `IA32`: Use Intel Architecture 32-bit
- `SSE`: Use the basic SSE instruction set.
- `SSE2`: Use the SSE2 instruction set.
- `SSE3`: Use the SSE3 instruction set.
- `SSSE3`: Use the SSSE3 instruction set.
- `SSE4.1`: Use the SSE4.1 instruction set.
- `SSE4.2`: Use the SSE4.2 instruction set.
- `ALTIVEC`: Use Altivec (ISA 2.02) instruction set.
- `NEON`: Use the NEON instruction set (Android only)
- `MXU`: Use the XBurst SIMD instructions (Android only)

Premake 5.0.

#### Examples

```lua
-- Enable SSE2 vector processing
vectorextensions "SSE2"
```
]]
---@param level Premake.VectorExtensions Specifies the desired level of vector processing instructions.
function vectorextensions(level) end

--[[
Sets the default visibility for exported symbols in a shared object library.
By default, the generated project files will use the compilers default settings symbol visibility when building shared object libraries.

Option Availability: gcc

Options:
- `Default`
- `Hidden`
- `Internal`
- `Protected`

Premake 5.0 or later.

#### Examples

This project hides exported symbols for release builds.

```lua
project "MyProject"
    filter "configurations:Release"
        visibility "Hidden"
```
]]
---@param switch Premake.Visibility
function visibility(switch) end

--[[
Places files into groups or "virtual paths", rather than the default behavior of mirroring the filesystem in IDE-based projects. So you could, for instance, put all header files in a group called "Headers", no matter where they appeared in the source tree.
Note that Lua tables do not maintain any ordering between key-value pairs, so there is no precedence between the supplied rules. That is, you can't write a rule that rewrites the results of an earlier rule, since there is no guarantee in which order the rules will run.

A list of key/value pairs that map file patterns to the group in which they should appear.

See the examples below for a more complete explanation.

Premake 4.4 or later.

#### Examples

Place all header files into a virtual path called "Headers". Any directory information is removed, so a path such as `src/lua/lua.h` will appear in the IDE as `Headers/lua.h`.

```lua
vpaths { ["Headers"] = "**.h" }
```

You may also specify multiple file patterns using the table syntax.

```lua
vpaths {
   ["Headers"] = { "**.h", "**.hxx", "**.hpp" }
}
```

It is also possible to include the file's path in the virtual group. Using the same example as above, this rule will appear in the IDE as `Headers/src/lua/lua.h`.

```lua
vpaths { ["Headers/*"] = "**.h" }
```

Any directory information explicitly provided in the pattern will be removed from the replacement. This rule will appear in the IDE as `Headers/lua/lua.h`.

```lua
vpaths { ["Headers/*"] = "src/**.h" }
```

You can also use virtual paths to remove extra directories from the IDE. For instance, this rule will cause the previous example to appear as `lua/lua.h`, removing the `src` part of the path from *all* files.

```lua
vpaths { ["*"] = "src" }
```

And of course, you can specify more than one rule at a time.

```lua
vpaths {
   ["Headers"] = "**.h",
   ["Sources/*"] = {"**.c", "**.cpp"},
   ["Docs"] = "**.txt"
}
```
]]
---@param file_patterns any A list of key/value pairs that map file patterns to the group in which they should appear.
function vpaths(file_patterns) end

--[[
Add any property to your visual studio project
This allows you to set properties that premake does not support without extending it

Values set at one time are sorted alphabetically
If you want to output groups of values in any order, set multiple times.
Nested values are also supported.

```lua
	vsprops {
		Name1 = "value1",
		Name2 = {
			Name3 = "value3"
		}
	}
```

Allows you to set properties that premake does not support without extending it.

Values set at one time are sorted alphabetically. If you want to output groups of values in any order, set multiple times. Nested values are also supported.

Premake 5.0-beta3 or later.

#### Examples

```lua
	language "C#"
	vsprops {
		-- https://devblogs.microsoft.com/visualstudio/vs-toolbox-accelerate-your-builds-of-sdk-style-net-projects/
		AccelerateBuildsInVisualStudio = "true",
		-- https://learn.microsoft.com/en-us/visualstudio/ide/how-to-change-the-build-output-directory?view=vs-2022
		AppendTargetFrameworkToOutputPath = "false",
		-- https://learn.microsoft.com/en-us/dotnet/csharp/tutorials/nullable-reference-types
		Nullable = "enable",
	}
```
```lua
	language "C++"
	nuget {
		"Microsoft.Direct3D.D3D12:1.608.2"
	}
	vsprops {
		-- https://devblogs.microsoft.com/directx/gettingstarted-dx12agility/#2-set-agility-sdk-parameters
		Microsoft_Direct3D_D3D12_D3D12SDKPath = "custom_path",
	}
```
]]
---@param vsprops any Allows you to set properties that premake does not support without extending it.
function vsprops(vsprops) end

--[[
Controls the level of warnings that are shown by the compiler.
If no value is set for a configuration, the toolset's default warning level will be used.

Specifies the desired level of warning.

Options:
- `Off`: Do not show any warning messages.
- `Default`: Use the toolset's default warning level.
- `Extra`: Enable the toolset's maximum warning level.
- `High`
- `Everything`

Premake 5.0.
]]
---@param value Premake.Warnings Specifies the desired level of warning.
function warnings(value) end

--[[
Creates a new workspace.
Workspaces are the top-level objects in a Premake build script, and are synonymous with a Visual Studio solution. Each workspace contains one or more projects, which in turn contain the settings to generate a single binary target.

A unique name for the workspace. If a workspace with the given name already exists, it is made active and returned. If no name is given, the current workspace scope is returned, and also made active. If '*' is used, the 'root' configuration scope, which applies to all workspaces, is selected and nil is returned.

By default, the project name will be used as the file name of the generated project file; be careful with spaces and special characters. You can override this default with the [filename](filename.md) call.

Premake 4.0 or later.

#### Examples

Create a new workspace named "MyWorkspace", with debug and release build configurations.
```lua
workspace "MyWorkspace"
   configurations { "Debug", "Release" }
```
]]
---@param name string A unique name for the workspace. If a workspace with the given name already exists, it is made active and returned. If no name is given, the current workspace scope is returned, and also made active. If '*' is used, the 'root' configuration scope, which applies to all workspaces, is selected and nil is returned.
function workspace(name) end

--[[
Enable Windows Presentation Foundation (WPF) support for .NET projects.
If no value is set for a configuration, the toolset's default option will be used.

Specifies the desired wpf setting.

Enable Windows Presentation Foundation (WPF) support for .NET projects.
If no value is set for a configuration, the toolset's default option will be used.

Options:
- `Default`: Use the default behavior (WPF not enabled)
- `On`: Enable WPF support
- `Off`: Disable WPF support

Premake 5.0.0-beta8 or later for Visual Studio .NET projects.

#### Examples

Enable WPF support:

```lua
wpf "On"
```
]]
---@param value Premake.Wpf Specifies the desired wpf setting.
function wpf(value) end

--[[
*Missing documentation*
]]
---@param value any
function xcodebuildresources(value) end

--[[
Key/value pairs to apply to buildSettings blocks of the generated pbxproj.

Premake 5.0.0 alpha 12 or later.

#### Examples

```lua
xcodebuildsettings { ["MY_KEY"] = "MY_VALUE" }
```
will generate:

```
    buildSettings = {
        ...
        MY_KEY = MY_VALUE;
        ...
    }
```
]]
---@param key_value_pairs any Key/value pairs to apply to buildSettings blocks of the generated pbxproj.
function xcodebuildsettings(key_value_pairs) end

--[[
- This page was auto-generated. Feel free to help us improve the documentation by creating a pull request.

needs documentation.

Premake 5.0.0 alpha 14 or later.
]]
---@param value string needs documentation.
function xcodecodesigningidentity(value) end

--[[
- This page was auto-generated. Feel free to help us improve the documentation by creating a pull request.

Needs documentation.

Premake 5.0.0 alpha 14 or later.
]]
---@param value boolean Needs documentation.
function xcodesystemcapabilities(value) end


--[[
Find and execute a Lua source file, but continue without error if the file is not present.

```lua
dofileopt("filename")
```
]]
function dofileopt() end

--[[
The **iif** function implements an immediate "if" clause, returning one of two possible values.

```lua
result = iif(condition, trueval, falseval)
```
]]
function iif() end

--[[
Looks for and executes another script file, if it hasn't been run previously.

```lua
include("path")
```
]]
function include() end

--[[
Evaluates a script, and marks any containers created by that script as external.

```lua
includeexternal("path")
```

For complex multi-workspace builds, it can be advantageous to have a set of projects that are generated by one workspace, and then used by the other workspaces as-is, without regenerating.

With this function, you can include a script which may contain one or more project or rule definitions. All such containers will be marked as external, and simply referenced, but not regenerated.
]]
function includeexternal() end

--[[
The `printf` performs like its C counterpart, printing a formatted string.

```lua
printf("format", ...)
```

It is equivalent to this Lua code:

```lua
print(string.format(format, unpack(arg))
```
]]
function printf() end

--[[
An extension of [Lua's require() function](http://www.lua.org/pil/8.1.html) which adds support for Premake modules and version checking.

```lua
require ("modname", "versions")
```

Premake will use its [extended set of module locations](Locating-Scripts.md) when locating the requested module.
]]
function require() end

--[[
The `verbosef` performs `printf`, printing a formatted string, but only when the **verbose** flag was set (ex. in the command line).

```lua
verbosef("format", ...)
```
]]
function verbosef() end

http = {}

--[[
Downloads an HTTP resource from the specified URL to a file.

```lua
http.download(url, file, { options })
```
]]
function http.download() end

--[[
Perform a HTTP GET request using the specified URL.

```lua
http.get(url, { options })
```
]]
function http.get() end

--[[
Perform a HTTP POST request to the specified URL.

```lua
http.post(url, data, { options })
```
]]
function http.post() end

json = {}

--[[
Decodes a JSON string into a table.

```lua
result, err = json.decode("s")
```
]]
function json.decode() end

--[[
Encodes a table to JSON.

```lua
result, err = json.encode(tbl)
```
]]
function json.encode() end

--[[
Encodes a table to JSON with spacing and tabulation.

```lua
result, err = json.encode_pretty(tbl)
```
]]
function json.encode_pretty() end

--[[
Changes the current working directory.

```lua
ok, err = os.chdir("path")
```
]]
function os.chdir() end

--[[
Changes the file system permissions of a file.

```lua
ok, err = os.chmod(path, mask)
```
]]
function os.chmod() end

--[[
Compares two files for binary equality.

```lua
equality, err = os.comparefiles("filename1", "filename2")
```
]]
function os.comparefiles() end

--[[
Copies a file from one location to another.

```lua
ok, err = os.copyfile("source", "destination")
```
]]
function os.copyfile() end

--[[
Execute a system command

```lua
os.execute("command")
```
]]
function os.execute() end

--[[
Execute a system command, just like `os.execute()`, but accepting a format string and values as arguments.

```lua
os.executef("format", ...)
```
]]
function os.executef() end

--[[
Scan the well-known system locations looking for a header file.

```lua
p = os.findheader("headerfile" [, additionalpaths])
```
]]
function os.findheader() end

--[[
Scan the well-known system locations looking for a library file.

```lua
p = os.findlib("libname" [, additionalpaths])
```

This function does not work to locate system libraries on macOS 11 or later; it may still be used to locate user libraries. From [the release notes](https://developer.apple.com/documentation/macos-release-notes/macos-big-sur-11_0_1-release-notes):

> New in macOS Big Sur 11.0.1, the system ships with a built-in dynamic linker cache of all system-provided libraries. As part of this change, copies of dynamic libraries are no longer present on the filesystem. Code that attempts to check for dynamic library presence by looking for a file at a path or enumerating a directory will fail.
]]
function os.findlib() end

--[[
Identify the currently targeted operating system.

```lua
id = os.get()
```
]]
function os.get() end

--[[
Gets the current working directory.

```lua
cwd = os.getcwd()
```
]]
function os.getcwd() end

--[[
Gets the value of an environment variable from the host system.

```lua
id = os.getenv(var)
```
]]
function os.getenv() end

--[[
Gets the number of logical CPU cores.

```lua
os.getnumcpus()
```
]]
function os.getnumcpus() end

--[[
Prompt the user to enter a password.

```lua
password = os.getpass('please enter your password:')
```
]]
function os.getpass() end

--[[
Returns the list of tags corresponding to a system.

There are tags specific to each operating system (see [system()](system.md) for a complete list of identifiers.),
and meta tags like `posix`, `darwin`, `desktop` and `mobile` tags.
]]
function os.getSystemTags() end

--[[
Retrieve version information for the host operating system.

```lua
sysinfo = os.getversion()
```
]]
function os.getversion() end

--[[
Identify the currently executing operating system.

```lua
id = os.host()
```
]]
function os.host() end

--[[
Identify the architecture for the currently executing operating system.

```lua
id = os.hostarch()
```
]]
function os.hostarch() end

--[[
:::caution
**This function has been deprecated.** Use [os.istarget()](os.istarget.md), [os.target()](os.target.md), or [os.host()](os.host.md) instead.
:::

Checks the current operating system identifier against a particular value.

```lua
os.is("id")
```
]]
function os.is() end

--[[
Determines if the host is using a 64-bit processor.

```lua
os.is64bit()
```
]]
function os.is64bit() end

--[[
Checks for the existence of directory.

```lua
os.isdir("path")
```
]]
function os.isdir() end

--[[
Checks for the existence of file.

```lua
os.isfile("path")
```
]]
function os.isfile() end

--[[
Determines if the given path is a symlink or reparse point.

```lua
os.islink(path)
```
]]
function os.islink() end

--[[
Checks the target operating system against a particular identifier or tag.
See [os.getSystemTags](os.getSystemTags.md) for documentation about OS tags.
]]
function os.istarget() end

--[[
Creates a new symbolic link to a directory.

```lua
os.linkdir("src", "dst")
```
]]
function os.linkdir() end

--[[
Creates a new symbolic link to a file.

```lua
os.linkfile("src", "dst")
```
]]
function os.linkfile() end

--[[
Searches the [Premake path](Locating-Scripts.md) for files.

```lua
os.locate("file_name1", ...)
```
]]
function os.locate() end

--[[
Perform a wildcard match to locate one or more directories.

```lua
matches = os.matchdirs("pattern")
```
]]
function os.matchdirs() end

--[[
Perform a wildcard match to locate one or more files.

```lua
matches = os.matchfiles("pattern")
```
]]
function os.matchfiles() end

--[[
Creates a new file system directory.

```lua
os.mkdir("path")
```
]]
function os.mkdir() end

--[[
Runs a shell command and return the output.

```lua
result, errorCode = os.outputof("command")
```
]]
function os.outputof() end

--[[
Searches a collection of paths for a particular file.

```lua
p = os.pathsearch("fname", "path1", ...)
```
]]
function os.pathsearch() end

--[[
Returns the canonical absolute path of a filename.

```lua
ok, err = os.realpath(path)
```

This functions calls [realpath()](http://linux.die.net/man/3/realpath) on Posix systems and [_fullpath](http://msdn.microsoft.com/en-us/library/506720ff.aspx) on Windows.
]]
function os.realpath() end

--[[
Remove files from the file system.

```lua
os.remove("path", ...)
```
]]
function os.remove() end

--[[
Rename file system files or directories.

```lua
os.rename("path", "newpath")
```
]]
function os.rename() end

--[[
Removes an existing directory as well as any files or subdirectories it contains.

```lua
os.rmdir("path")
```
]]
function os.rmdir() end

--[[
Function retrieves information about a file.

```lua
info = os.stat("path")
```
]]
function os.stat() end

--[[
Returns the name of the operating system currently being targeted.
See [system](system.md) for a complete list of OS identifiers.

The targeted OS may be overridden on the command line with the `--os` option.
```
$ premake5 --os=macosx xcode4
```
]]
function os.target() end

--[[
Returns the id of the architecture currently being targeted.
See [architecture](architecture.md) for a complete list of architecture identifiers.

```lua
id = os.targetarch()
```

This will return `nil` by default instead of returning the architecture for the current running
system due to backwards compatibility.

A target architecture can be set either via setting [_TARGET_ARCH](globals/premake_TARGET_ARCH.md) or
by passing an architecture via the `--arch` command line option (which has the most priority).
]]
function os.targetarch() end

--[[
Updates the last modified date of a file without changing its contents.

```lua
ok, err = os.touchfile("filename")
```
]]
function os.touchfile() end

--[[
Translate [command tokens](Tokens.md#command-tokens) into their OS or action specific equivalents.

```lua
cmd = os.translateCommands("cmd", map)
```
]]
function os.translateCommands() end

--[[
Returns a [Universally Unique Identifier](http://en.wikipedia.org/wiki/UUID).

```lua
id = os.uuid(name)
```
]]
function os.uuid() end

--[[
Writes a string to a file, if the string differs from the current version of the file.

```lua
ok, err = os.writefile_ifnotequal("text", "filename")
```
]]
function os.writefile_ifnotequal() end

path = {}

--[[
Appends an extension to a file path if it is not already present.

```lua
p = path.appendExtension(p, ext)
```
]]
function path.appendExtension() end

--[[
Converts a relative path to an absolute path.

```lua
p = path.getabsolute("path", "relativeTo")
```
]]
function path.getabsolute() end

--[[
Returns the base file portion of a path, with the directory and file extension removed.

```lua
p = path.getbasename("path")
```
]]
function path.getbasename() end

--[[
Returns the directory portion of a path, with any file name removed.

```lua
p = path.getdirectory("path")
```
]]
function path.getdirectory() end

--[[
Returns the drive letter portion of a path, if present.

```lua
p = path.getdrive("path")
```
]]
function path.getdrive() end

--[[
Returns the file extension portion of a path.

```lua
p = path.getextension("path")
```
]]
function path.getextension() end

--[[
Returns the file name and extension, with any directory information removed.

```lua
p = path.getname("path")
```
]]
function path.getname() end

--[[
The **path.getrelative** function computes a relative path from one directory to another.

```lua
p = path.getrelative("src", "dest")
```
]]
function path.getrelative() end

--[[
Returns true if a file system path has the given file extension.

```lua
path.hasextension("path", "ext")
```
]]
function path.hasextension() end

--[[
Determines if a given file system path is absolute.

```lua
path.isabsolute("path")
```
]]
function path.isabsolute() end

--[[
Returns true if the specified path represents a C source code file, based on its file extension.

```lua
path.iscfile("path")
```
]]
function path.iscfile() end

--[[
Returns true if the specified path represents a C++ source code file, based on its file extension.

```lua
path.iscppfile("path")
```
]]
function path.iscppfile() end

--[[
Returns true if the specified path represents a C++ header file, based on its file extension.

```lua
path.iscppheader("path")
```
]]
function path.iscppheader() end

--[[
Returns true if the specified path represents a Cocoa framework bundle, based on its file extension.

```lua
path.isframework("path")
```
]]
function path.isframework() end

--[[
Returns true if the specified path represents a file that can be linked against, based on its file extension.

```lua
path.islinkable("path")
```
]]
function path.islinkable() end

--[[
Returns true if the specified path represents an object file, based on its file extension.

```lua
path.isobjectfile("path")
```
]]
function path.isobjectfile() end

--[[
Returns true if the specified path represents a Windows resource file, based on its file extension.

```lua
path.isresourcefile("path")
```
]]
function path.isresourcefile() end

--[[
Joins two path portions together into a single path.

```lua
path.join("leading", "trailing", ...)
```

If trailing is an absolute path, then the leading portion is ignored, and the absolute path is returned instead (see below for examples).
]]
function path.join() end

--[[
Tries to create a clean file system representation of a path.

```lua
path.normalize("path")
```

Normalization includes removing duplicate and trailing slashes, leading "./" sequences, and filtering out "../" sequences where possible.
]]
function path.normalize() end

--[[
Takes a path which is relative to one location and makes it relative to another location instead.

```lua
path.rebase("relative_path", "old_base", "new_base")
```
]]
function path.rebase() end

--[[
Replace the file extension.

```lua
path.replaceextension("path", "new_extension")
```
]]
function path.replaceextension() end

--[[
Converts the file separators in a path.

```lua
path.translate("path", "newsep")
```
]]
function path.translate() end

--[[
Converts from Premake's simple wildcard syntax to a corresponding Lua pattern.

```lua
p = path.wildcards("pattern")
```
]]
function path.wildcards() end

--[[
Capitalizes the first letter of a string.

```lua
s = string.capitalized("s")
```
]]
function string.capitalized() end

--[[
Returns true if the string contains the specified substring.

```lua
string.contains("haystack", "needle")
```
]]
function string.contains() end

--[[
Returns true if the given string ends with the provided sequence.

```lua
string.endswith("haystack", "needle")
```
]]
function string.endswith() end

--[[
Escapes the string for use in Lua patterns. Escapes the following characters `( ) . % + - * ? [ ] ^ $` with `%`.

```lua
escaped = string.escapepattern("s")
```
]]
function string.escapepattern() end

--[[
Returns an array of strings, each of which is a substring formed by splitting on the provided pattern.

```lua
parts = string.explode("str", "pattern")
```
]]
function string.explode() end

--[[
Finds the last instance of a pattern within a string.

```lua
string.findlast("str", "pattern", plain)
```
]]
function string.findlast() end

--[[
Returns a [DBJ2 hash](http://www.cse.yorku.ca/~oz/hash.html) of a string value.

```lua
string.hash("value")
```
]]
function string.hash() end

--[[
Returns the number of lines of text contained by the string.

```lua
string.lines("str")
```
]]
function string.lines() end

--[[
Returns a plural version of the provided string.

```lua
pl = string.plural("str")
```
]]
function string.plural() end

--[[
Returns a [SHA-1 hash](http://en.wikipedia.org/wiki/SHA-1) of a string value.

```lua
string.sha1("value")
```
]]
function string.sha1() end

--[[
Returns true if the given string starts with the provided sequence.

```lua
string.startswith("haystack", "needle")
```
]]
function string.startswith() end

--[[
Make a copy of the indexed elements of the table.

```lua
copy = table.arraycopy(tbl)
```
]]
function table.arraycopy() end

--[[
Determines if an array contains a particular value.

```lua
table.contains(arr, value)
```
]]
function table.contains() end

--[[
Make a complete copy of a table, including any child tables it contains.

```lua
copy = table.deepcopy(tbl)
```
]]
function table.deepcopy() end

--[[
Enumerates an array of objects and returns a new table containing only the value of one particular field.


```lua
table.extract(arr, "key")
```
]]
function table.extract() end

--[[
Removes empty strings or nil values from an array, in place.

```lua
table.filterempty(arr)
```
]]
function table.filterempty() end

--[[
Flattens a hierarchy of arrays into a single array containing all of the values.

```lua
table.flatten(arr)
```
]]
function table.flatten() end

--[[
Merge two lists into an array of objects containing pairs of values, one from each list.


```lua
table.fold(arr1, arr2)
```
]]
function table.fold() end

--[[
Walk the elements of an array and call the specified function for each non-nil element.

```lua
table.foreachi(arr, fn)
```
]]
function table.foreachi() end

--[[
Merges an array of items into a single, formatted string.

```lua
table.implode(arr, "before", "after", "between")
```
]]
function table.implode() end

--[[
Returns the key or index of a value within a table.

```lua
table.indexof(arr, value)
```
]]
function table.indexof() end

--[[
Insert a new value into a table at the index after the specified existing value. If the specified value does not exist in the table, the new value is appended to the end of the table.


```lua
table.insertafter(arr, after, value)
```
]]
function table.insertafter() end

--[[
Inserts a value of array of values into a table. If the value is itself a table, its contents are enumerated and added instead.

```lua
table.insertflat(arr, values)
```
]]
function table.insertflat() end

--[[
Returns true if the table is empty, and contains no indexed or keyed values.


```lua
table.isempty(tbl)
```
]]
function table.isempty() end

--[[
Adds the values from one array to the end of another and returns the result.


```lua
table.join(arr1, arr2, ...)
```
]]
function table.join() end

--[[
Return an array of all keys used in a table.

```lua
table.keys(tbl)
```
]]
function table.keys() end

--[[
Adds the key-value associations from one table into another and returns the resulting merged table.

```lua
table.merge(tbl1, tbl2, ...)
```
]]
function table.merge() end

--[[
Replace all instances of `value` with `replacement` in an array. Array elements are modified in place.

```lua
table.replace(tbl, value, replacement)
```
]]
function table.replace() end

--[[
Converts the contents of a table to a formatted string.

```lua
table.tostring(tbl, recurse)
```
]]
function table.tostring() end

--[[
Translates the values contained in array, using the specified translation table, and returns the results in a new array.

```lua
table.translate(arr, translation)
```
]]
function table.translate() end

term = {}

--[[
Clears the console from the cursor location to the end of the line.

```lua
term.clearToEndOfLine()
```
]]
function term.clearToEndOfLine() end

--[[
Retrieves the current color setting of text printed to the console

```lua
term.getTextColor()
```
]]
function term.getTextColor() end

--[[
Moves the console cursor left by a number of columns.

```lua
term.moveLeft(columns)
```
]]
function term.moveLeft() end

--[[
Returns the current console color setting and restores the previously saved color setting saved by the last call of [term.pushColor](term.pushColor.md)

``` lua
term.popColor()
```
]]
function term.popColor() end

--[[
Saves the current text color state and changes the color of future text printed to the console.
Use [term.popColor](term.popColor.md) to restore the previous color setting.

``` lua
term.pushColor(color)
```
]]
function term.pushColor() end

--[[
Changes the color of future text printed to the console

```lua
term.setTextColor(color)
```
]]
function term.setTextColor() end

zip = {}

--[[
```lua
zip.extract(sourceZip, destinationDir)
```
]]
function zip.extract() end

