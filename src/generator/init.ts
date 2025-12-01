import { copyFileSync, existsSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { createInterface } from 'node:readline';
import { fileURLToPath } from 'node:url';

export type Language = 'C' | 'C++' | 'C#' | 'F#';

export interface InitOptions {
	workspaceName: string;
	language: Language;
	installTypes: boolean;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Prompt user for input
 */
function prompt(question: string, defaultValue?: string): Promise<string> {
	const rl = createInterface({
		input: process.stdin,
		output: process.stdout
	});

	const promptText = defaultValue
		? `${question} (${defaultValue}): `
		: `${question}: `;

	return new Promise((resolve) => {
		rl.question(promptText, (answer) => {
			rl.close();
			resolve(answer.trim() || defaultValue || '');
		});
	});
}

/**
 * Prompt user for yes/no question
 */
async function promptYesNo(question: string, defaultValue: boolean = true): Promise<boolean> {
	const defaultStr = defaultValue ? 'Y/n' : 'y/N';
	const answer = await prompt(`${question} (${defaultStr})`);

	if (!answer) {
		return defaultValue;
	}

	return answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes';
}

/**
 * Prompt user to select from a list of options
 */
async function promptChoice<T extends string>(question: string, choices: readonly T[], defaultIndex: number = 0): Promise<T> {
	console.log(question);
	for (let i = 0; i < choices.length; i++) {
		const prefix = i === defaultIndex ? '*' : ' ';
		console.log(`  ${prefix} ${i + 1}. ${choices[i]}`);
	}

	const answer = await prompt('Enter choice (number)', String(defaultIndex + 1));
	const index = parseInt(answer, 10) - 1;

	if (isNaN(index) || index < 0 || index >= choices.length) {
		return choices[defaultIndex];
	}

	return choices[index];
}

/**
 * Gather initialization options from user
 */
export async function gatherInitOptions(): Promise<InitOptions> {
	console.log('This utility will walk you through creating a premake5.ts file.\n');

	const workspaceName = await prompt('Workspace name', 'MyWorkspace');
	const language = await promptChoice('Select language:', ['C', 'C++', 'C#', 'F#'] as const, 1);
	const installTypes = await promptYesNo('Install TypeScript type definitions? (./premake-ts.d.ts and ./tsconfig.json)', true);

	console.log('');

	return {
		workspaceName,
		language,
		installTypes
	};
}

/**
 * Get file patterns for a given language
 */
function getFilePatterns(language: Language): string[] {
	switch (language) {
		case 'C':
			return ['"**.h"', '"**.c"'];
		case 'C++':
			return ['"**.h"', '"**.cpp"'];
		case 'C#':
			return ['"**.cs"'];
		case 'F#':
			return ['"**.fs"'];
	}
}

/**
 * Generate the premake5.ts file content
 */
function generatePremake5Content(workspaceName: string, language: Language): string {
	const filePatterns = getFilePatterns(language).join(', ');

	return `import { workspace } from "premake-ts";

export default workspace("${workspaceName}", (p) => {
	p.configurations("Debug", "Release");

	p.project("${workspaceName}", (p) => {
		p.kind("ConsoleApp");
		p.language("${language}");
		p.files(${filePatterns});
	});
});
`;
}

/**
 * Initialize a new premake-ts project
 */
export async function initProject(cwd: string = process.cwd()): Promise<void> {
	// Check if premake5.ts already exists
	const premakeFile = join(cwd, 'premake5.ts');
	if (existsSync(premakeFile)) {
		console.error('Error: premake5.ts already exists in this directory');
		process.exit(1);
	}

	// Gather options from user
	const options = await gatherInitOptions();

	// Generate and write premake5.ts
	const content = generatePremake5Content(options.workspaceName, options.language);
	writeFileSync(premakeFile, content, 'utf-8');
	console.log(`Created premake5.ts`);

	// Install type definitions if requested
	if (options.installTypes) {
		console.log('');
		await installTypes(cwd);
	}

	console.log('\nDone! You can now run premake-ts with an action:');
	console.log('  premake-ts vs2022');
	console.log('  premake-ts xcode');
	console.log('  premake-ts gmake');
}

/**
 * Install type definitions only
 */
export async function installTypes(cwd: string = process.cwd()): Promise<void> {
	const typesSource = join(__dirname, '../../types/premake-ts.d.ts');
	const typesTarget = join(cwd, 'premake-ts.d.ts');
	const tsConfigSource = join(__dirname, '../../types/tsconfig.json');
	const tsConfigTarget = join(cwd, 'tsconfig.json');

	// Check if files exist
	const typesExist = existsSync(typesTarget);
	const tsConfigExist = existsSync(tsConfigTarget);

	let installTypeDefs = true;
	let installTsConfig = true;

	if (typesExist) {
		console.log('premake-ts.d.ts already exists');
		installTypeDefs = await promptYesNo('Overwrite premake-ts.d.ts?', true);
	}

	if (tsConfigExist) {
		console.log('tsconfig.json already exists');
		installTsConfig = await promptYesNo('Overwrite tsconfig.json?', true);
	}

	if (!installTypeDefs && !installTsConfig) {
		console.log('Installation cancelled.');
		return;
	}

	// Install the files that were selected
	if (installTypeDefs) {
		copyFileSync(typesSource, typesTarget);
		console.log('Created ./premake-ts.d.ts');
	}

	if (installTsConfig) {
		copyFileSync(tsConfigSource, tsConfigTarget);
		console.log('Created tsconfig.json');
	}
}
