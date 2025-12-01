import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const packageRoot = join(__dirname, '..');

export async function resolve(specifier, context, nextResolve) {
	if (specifier === 'premake-ts') {
		return {
			url: pathToFileURL(join(packageRoot, 'src/generator/index.ts')).href,
			shortCircuit: true
		};
	}
	return nextResolve(specifier, context);
}
