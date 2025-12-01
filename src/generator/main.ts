import { execSync } from 'node:child_process';
import fs from 'node:fs';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { type IGlobals, PremakeScope } from '../scopes/PremakeScope.ts';
import type { WorkspaceFunc, WorkspaceScope } from '../scopes/scopes.ts';
import { displayHelp, parseCliArgs } from './cli-args.ts';
import { generate } from './generator.ts';
import { initProject, installTypes } from './init.ts';
import { runPremake } from './util.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function processScope(globals: IGlobals, name: string, func: WorkspaceFunc): PremakeScope {
	const scope = new PremakeScope(globals);
	scope.command("workspace", name);
	func(scope.createProxy<WorkspaceScope>());
	return scope;
}

export function extractGlobals(scriptPath: string): IGlobals {
	const args = process.argv.slice(2);

	const filePath = join(scriptPath);
	let globals: Partial<IGlobals> = {};

	const output = execSync(`premake5 --file=${filePath}`, { encoding: 'utf-8' });
	globals = JSON.parse(output) as IGlobals;

	// Parse the last argument that does not start with --
	globals.action = args.find(arg => !arg.startsWith('--'));
	if (!globals.action) {
		throw new Error('No action specified');
	}

	return globals as IGlobals;
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
		await installTypes();
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
		const dumpGlobalsPath = join(__dirname, 'dumpglobals.lua');
		const globals = extractGlobals(dumpGlobalsPath);

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

		fs.writeFileSync(luaFilePath, result, 'utf-8');

		// If emitOnly, stop here
		if (cliArgs.emitOnly) {
			console.log(`Generated ${luaFilePath}`);
			return;
		}

		// Pass the generated Lua file path to premake
		const premakeBinary = cliArgs.premakeBinary || 'premake5';
		await runPremake([`--file=${luaFilePath}`, cliArgs.action, ...cliArgs.premakeArgs], premakeBinary);

		// Clean up intermediate file unless keepIntermediate or emitOnly is set
		if (!shouldKeepIntermediate && fs.existsSync(luaFilePath)) {
			fs.unlinkSync(luaFilePath);
		}
	} catch (error) {
		console.error('Error running script:', error);

		// Clean up intermediate file on error unless keepIntermediate or emitOnly is set
		if (!shouldKeepIntermediate && luaFilePath && fs.existsSync(luaFilePath)) {
			fs.unlinkSync(luaFilePath);
		}

		process.exit(1);
	}
}

main();
