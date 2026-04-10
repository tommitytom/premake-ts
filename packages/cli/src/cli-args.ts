/**
 * CLI arguments specific to premake-ts
 */
export interface PremakeTsArgs {
	/** Path to the premake5.ts file */
	file?: string;
	/** Only emit the Lua file without running premake */
	emitOnly: boolean;
	/** Custom path to premake binary */
	premakeBinary?: string;
	/** Keep the generated Lua file after execution */
	keepIntermediate: boolean;
	/** The action to run (vs2022, xcode, etc.) or 'init' */
	action?: string;
	/** Premake version for install-lua-types (e.g., "5.0.0-beta8", "dev", "latest") */
	version?: string;
	/** Remaining arguments to pass through to premake */
	premakeArgs: string[];
}

/**
 * Argument definition for help text
 */
export interface ArgDefinition {
	name: string;
	description: string;
	isFlag: boolean;
}

/**
 * Centralized argument definitions
 */
export const PREMAKE_TS_ARGS: ArgDefinition[] = [
	{ name: '--file=<path>', description: 'Path to the premake5.ts file (default: premake5.ts)', isFlag: false },
	{ name: '--premakeBinary=<path>', description: 'Path to a custom premake5 binary (default: premake5)', isFlag: false },
	{ name: '--keepIntermediate', description: 'Keep the generated premake5.lua file after execution', isFlag: true },
	{ name: '--emitOnly', description: 'Only generate the Lua file without running premake (infers --keepIntermediate)', isFlag: true },
	{ name: '--version=<version>', description: 'Premake version for install-types/install-lua-types (e.g., "5.0.0-beta8", "dev")', isFlag: false },
];

/**
 * Available commands
 */
export const PREMAKE_TS_COMMANDS: ArgDefinition[] = [
	{ name: 'init', description: 'Initialize a new premake-ts project interactively', isFlag: false },
	{ name: 'install-types', description: 'Install TypeScript type definitions to ./premake-ts.d.ts and ./tsconfig.json', isFlag: false },
	{ name: 'install-lua-types', description: 'Install Lua type definitions for Premake (LuaLS addon)', isFlag: false },
	{ name: 'help', description: 'Display this help information', isFlag: false },
	{ name: '<action>', description: 'Run premake with the specified action (e.g., vs2022, xcode, gmake)', isFlag: false }
];

/**
 * Parse command line arguments and extract premake-ts specific ones
 */
export function parseCliArgs(argv: string[]): PremakeTsArgs {
	const result: PremakeTsArgs = {
		emitOnly: false,
		keepIntermediate: false,
		premakeArgs: []
	};

	for (let i = 0; i < argv.length; i++) {
		const arg = argv[i];

		if (arg.startsWith('--file=')) {
			result.file = arg.split('=')[1];
		} else if (arg.startsWith('--version=')) {
			result.version = arg.split('=')[1];
		} else if (arg === '--emitOnly') {
			result.emitOnly = true;
		} else if (arg.startsWith('--premakeBinary=')) {
			result.premakeBinary = arg.split('=')[1];
		} else if (arg === '--keepIntermediate') {
			result.keepIntermediate = true;
		} else if (!arg.startsWith('--')) {
			// This is the action
			if (!result.action) {
				result.action = arg;
			} else {
				// Additional non-flag arguments pass through
				result.premakeArgs.push(arg);
			}
		} else {
			// Pass through other flags to premake
			result.premakeArgs.push(arg);
		}
	}

	return result;
}

/**
 * Display help information
 */
export function displayHelp(): void {
	console.log('Usage: premake-ts [options] <command|action>');
	console.log('');
	console.log('Commands:');
	for (const cmd of PREMAKE_TS_COMMANDS) {
		console.log(`  ${cmd.name.padEnd(20)} ${cmd.description}`);
	}
	console.log('');
	console.log('Options:');
	for (const arg of PREMAKE_TS_ARGS) {
		console.log(`  ${arg.name.padEnd(20)} ${arg.description}`);
	}
	console.log('');
	console.log('Examples:');
	console.log('  premake-ts init');
	console.log('  premake-ts vs2022');
	console.log('  premake-ts --file=myproject.ts xcode');
	console.log('  premake-ts --emitOnly gmake');
	console.log('');
	console.log('For more information, visit: https://github.com/tommitytom/premake-ts');
}
