#!/usr/bin/env node
import { spawn } from 'child_process';
import { dirname, join } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const [major, minor] = process.versions.node.split('.').map(Number);
if (major < 22 || (major === 22 && minor < 6)) {
	console.error(
		`premake-ts requires Node.js 22.6.0 or later (you have ${process.version}).\n` +
		`The --experimental-strip-types flag used for TypeScript execution is not available in older versions.\n` +
		`Please upgrade Node.js: https://nodejs.org/`
	);
	process.exit(1);
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const tsFile = join(__dirname, '../dist/main.js');
const loader = pathToFileURL(join(__dirname, 'register-loader.js')).href;

const child = spawn('node', [
	'--experimental-strip-types',
	'--disable-warning=DEP0190',
	'--import', loader,
	tsFile,
	...process.argv.slice(2)
], {
	stdio: 'inherit'
});

child.on('exit', (code) => {
	process.exit(code ?? 0);
});