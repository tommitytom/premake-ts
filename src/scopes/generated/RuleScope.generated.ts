// Auto-generated file. Do not edit directly.


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
