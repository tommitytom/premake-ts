import { pathToFileURL } from 'node:url';
import { resolve, dirname, join, basename } from 'node:path';
import fs from 'node:fs';
import { spawn } from 'node:child_process';
import { generate } from './generator.ts';

function runPremake(args: string[]): Promise<number> {
	return new Promise((resolve, reject) => {
		const premake = spawn('premake5', args, {
			stdio: 'inherit',
			shell: true
		});

		premake.on('close', (code) => {
			if (code === 0) {
				resolve(code);
			} else {
				reject(new Error(`premake exited with code ${code}`));
			}
		});

		premake.on('error', (error) => {
			reject(error);
		});
	});
}

async function main() {
	const args = process.argv.slice(2);

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

		const result = generate(module.default);

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
