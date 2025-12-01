import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path, { basename, dirname, join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { fileURLToPath } from 'url';
import { type IGlobals, PremakeScope } from '../scopes/PremakeScope.ts';
import type { WorkspaceFunc, WorkspaceScope } from '../scopes/scopes.ts';
import { generate } from './generator.ts';
import { runPremake } from './util.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function processScope(globals: IGlobals, name: string, func: WorkspaceFunc): PremakeScope {
	const scope = new PremakeScope(globals);
	scope.command("workspace", name);
	func(scope.createProxy<WorkspaceScope>());
	return scope;
}

export function extractGlobals(scriptPath: string): IGlobals {
	const args = process.argv.slice(2);

	const filePath = path.join(scriptPath);
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
	const args = process.argv.slice(2);

	const filePath = path.join(__dirname, 'dumpglobals.lua');
	const globals = extractGlobals(filePath);

	// Parse --file argument
	let scriptPath = 'premake5.ts'; // Default to premake5.ts in current directory
	const fileArgIndex = args.findIndex(arg => arg.startsWith('--file='));

	if (fileArgIndex !== -1) {
		scriptPath = args[fileArgIndex].split('=')[1];
		// Remove --file from args so it's not passed to premake
		args.splice(fileArgIndex, 1);
	}

	try {
		const absolutePath = resolve(scriptPath);
		const fileUrl = pathToFileURL(absolutePath).href;
		const module = await import(fileUrl);
		const workspace = module.default as { name: string; func: WorkspaceFunc };
		const scope = processScope(globals as IGlobals, workspace.name, workspace.func);
		const result = generate(scope);

		// Write the Lua file to the same directory as the TypeScript file
		const scriptDir = dirname(absolutePath);
		const luaFileName = basename(scriptPath, '.ts') + '.lua';
		const luaFilePath = join(scriptDir, luaFileName);

		fs.writeFileSync(luaFilePath, result, 'utf-8');

		// Pass the generated Lua file path to premake
		runPremake([`--file=${luaFilePath}`, ...args]);
	} catch (error) {
		console.error('Error running script:', error);
		process.exit(1);
	}
}

main();
