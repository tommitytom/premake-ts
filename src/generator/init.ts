import fs from 'node:fs';
import { createInterface } from 'node:readline';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export interface InitOptions {
	workspaceName: string;
	installTypes: boolean;
}

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
 * Gather initialization options from user
 */
export async function gatherInitOptions(): Promise<InitOptions> {
	console.log('This utility will walk you through creating a premake5.ts file.\n');

	const workspaceName = await prompt('Workspace name', 'MyWorkspace');
	const installTypes = await promptYesNo('Install TypeScript type definitions? (./.premake/premake-ts.d.ts and ./tsconfig.json)', true);

	console.log('');

	return {
		workspaceName,
		installTypes
	};
}

/**
 * Generate the premake5.ts file content
 */
function generatePremake5Content(workspaceName: string): string {
	return `import { workspace } from "premake-ts";

export default workspace("${workspaceName}", (p) => {
	p.configurations("Debug", "Release");

	p.project("${workspaceName}", (p) => {
		p.kind("ConsoleApp");
		p.language("C++");
		p.files("**.h", "**.cpp");
	});
});
`;
}

/**
 * Copy type definitions to project
 */
export function copyTypeDefinitions(targetDir: string): void {
	// Find the types/premake-ts.d.ts file relative to this module
	const typesSource = join(__dirname, '../../types/premake-ts.d.ts');
	const typesTarget = join(targetDir, '.premake/premake-ts.d.ts');
	const tsConfigSource = join(__dirname, '../../types/tsconfig.json');
	const tsConfigTarget = join(targetDir, 'tsconfig.json');

	// Create .premake directory if it doesn't exist
	const premakeDir = dirname(typesTarget);
	if (!fs.existsSync(premakeDir)) {
		fs.mkdirSync(premakeDir, { recursive: true });
	}

	fs.copyFileSync(typesSource, typesTarget);
	fs.copyFileSync(tsConfigSource, tsConfigTarget);
	console.log(`Created ${typesTarget} and ${tsConfigTarget}`);
}

/**
 * Initialize a new premake-ts project
 */
export async function initProject(cwd: string = process.cwd()): Promise<void> {
	// Check if premake5.ts already exists
	const premakeFile = join(cwd, 'premake5.ts');
	if (fs.existsSync(premakeFile)) {
		console.error('Error: premake5.ts already exists in this directory');
		process.exit(1);
	}

	// Gather options from user
	const options = await gatherInitOptions();

	// Generate and write premake5.ts
	const content = generatePremake5Content(options.workspaceName);
	fs.writeFileSync(premakeFile, content, 'utf-8');
	console.log(`Created premake5.ts`);

	// Copy type definitions if requested
	if (options.installTypes) {
		copyTypeDefinitions(cwd);
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
	const typesTarget = join(cwd, '.premake/premake-ts.d.ts');

	if (fs.existsSync(typesTarget)) {
		console.log('Type definitions already exist at .premake/premake-ts.d.ts');
		const overwrite = await promptYesNo('Overwrite existing types?', false);
		if (!overwrite) {
			console.log('Installation cancelled.');
			return;
		}
	}

	copyTypeDefinitions(cwd);
	console.log('\nDone! TypeScript definitions installed to .premake/premake-ts.d.ts');
}
