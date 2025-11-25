import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
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
	const scriptArgs = process.argv.slice(2);
	const scriptPath = 'test/premake5.ts';

	if (!scriptPath) {
		console.error('Error: Please provide a script path as an argument');
		console.error('Usage: node --experimental-strip-types main.ts <script.ts>');
		process.exit(1);
	}

	try {
		const absolutePath = resolve(scriptPath);
		const fileUrl = pathToFileURL(absolutePath).href;
		const module = await import(fileUrl);

		const result = generate(module.default);

		fs.writeFileSync('test/premake5.lua', result, 'utf-8');

		runPremake(['--file=test/premake5.lua', ...scriptArgs]);
	} catch (error) {
		console.error('Error running script:', error);
		process.exit(1);
	}
}

main();
