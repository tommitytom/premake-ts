import { execSync, spawn } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { IGlobals } from './premake-scope.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function execPremake(args: string[], binaryPath: string = 'premake5'): Promise<number> {
	return new Promise((resolve, reject) => {
		const premake = spawn(binaryPath, args, {
			stdio: 'inherit',
			shell: true
		});

		premake.on('close', (code) => {
			if (code === 0) {
				resolve(code);
			} else {
				reject(new Error(`premake exited with code ${code}. Args: ${args.join(' ')}`));
			}
		});

		premake.on('error', (error) => {
			reject(error);
		});
	});
}

export function dumpGlobals(action: string): IGlobals {
	const scriptPath = join(__dirname, 'dump-globals.lua');

	const filePath = join(scriptPath);
	let globals: Partial<IGlobals> = {};

	const output = execSync(`premake5 --file=${filePath}`, { encoding: 'utf-8' });
	globals = JSON.parse(output) as IGlobals;
	globals.action = action;

	return globals as IGlobals;
}
