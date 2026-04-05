import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import type { DocumentedField, SanitizedField } from './types.ts';
import { removeSimpleExamples, toUpperCamelCase } from './utils.ts';
import type { IClass } from './documentation.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getParamType(field: DocumentedField): string {
	const { kind, allowed } = field;
	if (allowed && allowed.length > 0) {
		const typeName = 'Premake.' + toUpperCamelCase(field.name);
		if (kind.startsWith('list:')) {
			return `${typeName}[]`;
		}

		return typeName;
	}

	switch (field.kind) {
		case 'path':
		case 'file':
		case 'directory':
		case 'string':
			return `string`;
		case 'list:path':
		case 'list:file':
		case 'list:directory':
		case 'list:string':
			return `(string | string[])`;
		case 'boolean':
			return `boolean`;
		default:
			return `any`;
	}
}

function generateFieldFunction(field: SanitizedField): string {
	const items: string[] = [];

	const hasDescription = field.description && field.description !== '';
	const hasOptions = field.allowed && field.allowed.length > 0 && field.parameter && field.parameter.options && field.parameter.options.length > 0;
	const hasAvailability = field.availability && field.availability !== '';
	const hasExamples = field.examples && field.examples !== '';

	if (hasDescription) {
		items.push(field.description);
	}

	if (field.parameter.description && field.parameter.description !== '') {
		if (items.length) items.push('');
		items.push(field.parameter.description);
	}

	if (field.parameter.additional && field.parameter.additional !== '') {
		if (items.length) items.push('');
		items.push(field.parameter.additional);
	}

	if (hasOptions) {
		if (items.length) items.push('');
		items.push('Options:');
		items.push(...field.parameter.options.map(a => '- `' + a.name + '`' + (a.description ? ': ' + a.description : '')));
	}
	if (field.availability && field.availability !== '') {
		if (items.length) items.push('');
		items.push(field.availability);
	}
	if (field.examples && field.examples !== '') {
		if (items.length) items.push('');
		items.push('#### Examples');
		items.push('');
		items.push(field.examples);
	}

	let description = `--[[\n${items.join('\n')}\n]]`;
	description += `\n---@param ${field.parameter.name} ${getParamType(field)}${field.parameter.description && field.parameter.description !== '' ? ' ' + field.parameter.description : ''}`;
	description += `\nfunction ${field.name.toLowerCase()}(${field.parameter.name}) end\n`;

	return description;
}

function getSection(sections: Record<string, string>, key: string): string | undefined {
	return sections[key.toLowerCase()];
}

const RESERVED = new Set<string>(['globals', 'string', 'table', 'os']);

function generateUtilFunctions(utils: IClass[]): string {
	const output: string[] = [];
	for (const util of utils) {
		const isReserved = RESERVED.has(util.name.toLowerCase());
		const functionPrefix = util.name === 'globals' ? '' : `${util.name}.`;

		if (!isReserved) {
			output.push(`${util.name} = {}`);
			output.push('');
		}

		for (const func of util.functions) {
			output.push('--[[');

			const desc = getSection(func.sections, 'description');
			if (desc) output.push(desc);

			output.push(']]');
			output.push(`function ${functionPrefix}${func.name}() end`);
			output.push('');
		}
	}

	return output.join('\n');
}

function sanitizeFields(fields: SanitizedField[]) {
	const makeSettings = fields.find(field => field.name === 'makeSettings')!;
	makeSettings.examples = '';
}

export function generateFunctionType(field: DocumentedField): string {
	return `---@alias Premake.${toUpperCamelCase(field.name)}
${field.allowed.map(a => `---|'${a}'`).join('\n')}\n`;
}

/**
 * Generates all scope interfaces from sanitized data
 * @param sanitized Array of sanitized fields
 */
export function generateLuaDefinitions(sanitized: SanitizedField[], utils: IClass[]): void {
	sanitizeFields(sanitized);
	removeSimpleExamples(sanitized);

	let output = '---@meta\n\n';

	output += sanitized.filter(f => f.allowed && f.allowed.length > 0).map(f => generateFunctionType(f)).join('\n') + '\n';

	output += sanitized.map(f => generateFieldFunction(f)).join('\n');

	output += '\n\n' + generateUtilFunctions(utils) + '\n';

	const config = {
		$schema: "https://raw.githubusercontent.com/LuaLS/LLS-Addons/main/schemas/addon_config.schema.json",
		name: "premake",
		settings: {
			"Lua.diagnostics.globals": [...sanitized.map(f => f.name.toLowerCase()), ...utils.map(u => u.name)].sort(),
		},
		files: [
			"**/premake5.lua"
		]
	};

	const outputDir = path.join(__dirname, '..', 'types', 'lua');
	const typesOutputDir = path.join(outputDir, 'library');
	if (!fs.existsSync(typesOutputDir)) {
		fs.mkdirSync(typesOutputDir, { recursive: true });
	}

	const outputPath = path.join(typesOutputDir, `premake.lua`);
	fs.writeFileSync(outputPath, output, 'utf-8');

	const configPath = path.join(outputDir, `config.json`);
	fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf-8');
}
