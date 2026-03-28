import { register } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const loaderPath = pathToFileURL(join(__dirname, 'loader.js')).href;

register(loaderPath, pathToFileURL('./'));
