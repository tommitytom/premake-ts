import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const packageRoot = join(__dirname, '..');

export async function resolve(specifier, context, nextResolve) {
	if (specifier === 'premake-ts') {
		return {
			url: pathToFileURL(join(packageRoot, 'dist/index.js')).href,
			shortCircuit: true
		};
	}
	return nextResolve(specifier, context);
}
