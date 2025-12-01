import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const __dirname = dirname(fileURLToPath(import.meta.url));
const configPath = resolve(__dirname, "tsconfig.declarations.json");
const configDir = dirname(configPath);
const targetDir = resolve(__dirname, "..", "..", "types");
const typesDir = resolve(targetDir, "intermediate");

export function bundleTypes() {
	const configText = ts.sys.readFile(configPath);
	if (!configText) {
		throw new Error(`Could not read ${configPath}`);
	}

	const { config, error } = ts.parseConfigFileTextToJson(configPath, configText);
	if (error) {
		throw new Error(`Error parsing config: ${error.messageText}`);
	}

	const { options, fileNames, errors } = ts.parseJsonConfigFileContent(
		config,
		ts.sys,
		configDir,  // Use the config's directory as the base path
	);

	if (errors.length > 0) {
		const errorList: string[] = [];
		errors.forEach((e) => {
			errorList.push(ts.flattenDiagnosticMessageText(e.messageText, "\n"));
		});

		throw new Error(errorList.join("\n"));
	}

	// Delete existing content from target dir
	rmSync(targetDir, { recursive: true, force: true });
	mkdirSync(targetDir, { recursive: true });

	const program = ts.createProgram(fileNames, options);
	const result = program.emit();

	if (result.emitSkipped) {
		const diagnostics = ts.getPreEmitDiagnostics(program).concat(result.diagnostics);
		const errorList: string[] = [];
		diagnostics.forEach((d) => {
			const message = ts.flattenDiagnosticMessageText(d.messageText, "\n");
			if (d.file && d.start !== undefined) {
				const { line, character } = d.file.getLineAndCharacterOfPosition(d.start);
				errorList.push(`${d.file.fileName}:${line + 1}:${character + 1} - ${message}`);
			} else {
				errorList.push(message);
			}
		});

		if (errorList.length > 0) {
			throw new Error(errorList.join("\n"));
		} else {
			throw new Error("Unknown error during type declaration generation.");
		}
	}

	const files = readdirSync(typesDir, { recursive: true }).map(f => join(typesDir, f as string)).filter(f => f.endsWith('.d.ts'));

	let combined = "";
	for (const file of files) {
		const content = readFileSync(file, "utf-8");
		// Strip import statements since we're bundling
		const stripped = content
			.replace(/^import .+$/gm, "")
			.replace(/^export \{ .+ \}$/gm, "")
			.replace(/^export declare function/gm, "export function");
		combined += stripped + "\n";
	}

	// Wrap in module declaration
	const final = `declare module "premake-ts" {\n${combined}\n}`;
	writeFileSync(`${targetDir}/premake-ts.d.ts`, final);

	rmSync(typesDir, { recursive: true, force: true });
}