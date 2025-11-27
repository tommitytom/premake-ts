/**
 * Utility functions shared across the parser
 */
import type { DocumentedField, PremakeParameter } from './types.ts';

/**
 * Extracts a specific section from markdown content
 */
export function getSection(content: string, section: 'description' | 'parameters' | 'appliesTo' | 'availability' | 'examples'): string | null {
	const sections: Record<string, string> = {
		parameters: '# Parameters',
		appliesTo: '# Applies To',
		availability: '# Availability',
		examples: '# Examples'
	};

	let start = 0;

	if (section !== 'description') {
		const sectionHeader = sections[section];
		start = content.indexOf(sectionHeader);
		if (start === -1) return null;
		start = content.indexOf('\n', start) + 1;
	}

	const end = content.indexOf('##', start);
	return content.slice(start, end !== -1 ? end : undefined).trim();
}

/**
 * Formats text for JSDoc comments
 */
export function jsdocFormat(text: string): string {
	const lines = text.split('\n').map(line => `\t * ${line}`);
	return lines.join('\n');
}

/**
 * Formats parameters for JSDoc comments
 */
export function jsdocFormatParams(param: PremakeParameter): string {
	const lines: string[] = [];

	lines.push(`\t * @param ${param.name}${param.description ? ' ' + param.description : ''}`);

	if (param.options && param.options.length > 0) {
		lines.push(`\t * Available options:`);
		param.options.forEach(option => {
			lines.push(`\t * - \`${option.name}\`${option.description ? ': ' + option.description : ''}`);
		});
	}

	return lines.join('\n');
}

/**
 * Converts from lowerCamelCase to UpperCamelCase
 */
export function toUpperCamelCase(str: string): string {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Determines the TypeScript parameter type for a field
 */
export function getParamType(name: string, field: DocumentedField): string {
	const { kind, allowed } = field;
	if (allowed && allowed.length > 0) {
		const typeName = toUpperCamelCase(field.name) + 'Type';
		if (kind.startsWith('list:')) {
			return `...${name}: ${typeName}[]`;
		}

		return `${name}: ${typeName}`;
	}

	switch (kind) {
		case 'path':
		case 'file':
		case 'directory':
		case 'string':
			return `${name}: string`;
		case 'list:path':
		case 'list:file':
		case 'list:directory':
		case 'list:string':
			return `...${name}: string[]`;
		case 'boolean':
			return `${name}: boolean`;
		default:
			return `${name}: any`;
	}
}

/**
 * Generates a TypeScript function definition
 */
export function generateFunctionDefinition(field: DocumentedField): string {
	const parameter = (field.parameter as PremakeParameter);

	if (!parameter) {
		throw new Error(`Field ${field.name} has no parameters`);
	}

	return `${field.name}(${getParamType(parameter.name, field)}): this;`;
}

/**
 * Generates a TypeScript type definition for allowed values
 */
export function generateFunctionType(field: DocumentedField): string {
	return `export type ${toUpperCamelCase(field.name)}Type = ${field.allowed.map(a => `'${a}'`).join(' | ')}`;
}

export function countOccurrences(str: string, char: string) {
	return str.split(char).length - 1;
}

export function removeSimpleExamples(fields: DocumentedField[]) {
	fields.forEach(field => {
		if (field.examples && field.examples.startsWith('```lua') && field.examples.endsWith('```') &&
				countOccurrences(field.examples, '\n') === 2 &&
				countOccurrences(field.examples, '%') === 0 &&
				countOccurrences(field.examples, '/') === 0 )
		{
			field.examples = '';
		}
	});
}

/**
 * Generates a complete function definition with JSDoc comments
 */
export function generateFunction(field: DocumentedField): string {
    return `\t/**
${jsdocFormat(field.description + '\n')}
${jsdocFormat(field.availability ? '\n' + field.availability : '')}
${jsdocFormatParams(field.parameter as PremakeParameter)}
${jsdocFormat(field.examples ? '\n### Examples\n' + field.examples : '')}
	 */
	${generateFunctionDefinition(field)}
`;
}
