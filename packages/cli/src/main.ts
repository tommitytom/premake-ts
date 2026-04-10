import { existsSync, unlinkSync, writeFileSync } from 'node:fs';
import { basename, dirname, join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { type IGlobals, PremakeScope } from './PremakeScope.ts';
import type { WorkspaceFunc, WorkspaceScope } from 'premake-ts';
import { displayHelp, parseCliArgs } from './cli-args.ts';
import { generate } from './generator.ts';
import { initProject } from './init.ts';
import { installLuaTypes, installRemoteTypes } from './remote-types.ts';
import { dumpGlobals, execPremake } from './util.ts';

function processScope(globals: IGlobals, name: string, func: WorkspaceFunc): PremakeScope {
	const scope = new PremakeScope(globals);
	scope.command("workspace", name);
	func(scope.createProxy<WorkspaceScope>());
	return scope;
}

async function main() {
	const rawArgs = process.argv.slice(2);
	const cliArgs = parseCliArgs(rawArgs);

	// Handle special commands
	if (cliArgs.action === 'help') {
		displayHelp();
		return;
	}

	if (cliArgs.action === 'init') {
		await initProject();
		return;
	}

	if (cliArgs.action === 'install-types') {
		await installRemoteTypes(cliArgs.version);
		return;
	}

	if (cliArgs.action === 'install-lua-types') {
		await installLuaTypes(cliArgs.version);
		return;
	}

	// Validate that an action was provided
	if (!cliArgs.action) {
		console.error('Error: No action specified. Run "premake-ts help" for usage information.');
		process.exit(1);
	}

	const scriptPath = cliArgs.file || 'premake5.ts';
	let luaFilePath: string | undefined;

	// If emitOnly is set, keepIntermediate should be implied
	const shouldKeepIntermediate = cliArgs.keepIntermediate || cliArgs.emitOnly;

	try {
		// Extract globals from premake
		const globals = dumpGlobals(cliArgs.action);

		// Import and process the TypeScript file
		const absolutePath = resolve(scriptPath);
		const fileUrl = pathToFileURL(absolutePath).href;
		const module = await import(fileUrl);
		const workspace = module.default as { name: string; func: WorkspaceFunc };
		const scope = processScope(globals as IGlobals, workspace.name, workspace.func);
		const result = generate(scope);

		// Write the Lua file to the same directory as the TypeScript file
		const scriptDir = dirname(absolutePath);
		const luaFileName = basename(scriptPath, '.ts') + '.lua';
		luaFilePath = join(scriptDir, luaFileName);

		writeFileSync(luaFilePath, result, 'utf-8');

		// If emitOnly, stop here
		if (cliArgs.emitOnly) {
			console.log(`Generated ${luaFilePath}`);
			return;
		}

		// Pass the generated Lua file path to premake
		const premakeBinary = cliArgs.premakeBinary || 'premake5';
		await execPremake([`--file=${luaFilePath}`, cliArgs.action, ...cliArgs.premakeArgs], premakeBinary);

		// Clean up intermediate file unless keepIntermediate or emitOnly is set
		if (!shouldKeepIntermediate && existsSync(luaFilePath)) {
			unlinkSync(luaFilePath);
		}
	} catch (error) {
		console.error('Error running script:', error);

		// Clean up intermediate file on error unless keepIntermediate or emitOnly is set
		if (!shouldKeepIntermediate && luaFilePath && existsSync(luaFilePath)) {
			unlinkSync(luaFilePath);
		}

		process.exit(1);
	}
}

main();
