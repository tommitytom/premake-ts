#!/usr/bin/env node
import { spawn } from 'child_process';
import { dirname, join } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const tsFile = join(__dirname, '../src/main.ts');
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