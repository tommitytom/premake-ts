/**
 * Step 3: Sanitize documentation using LLM
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import OpenAI from 'openai';
import type { DocumentedField, PremakeParameter, SanitizedField } from './types.ts';
import { sanitizeText, sanitizeToJson } from './llm.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function removeRedundantContent(field: SanitizedField): void {
	// Sometimes documentation starts with the field name, remove it
	if (field.description.startsWith(field.name)) {
		field.description = field.description.slice(field.name.length).trim();
	}

	// Find the first lua example in the description, this is mostly useless for inline documentation, remove it.
	const exampleStart = field.description.indexOf('```lua');
	if (exampleStart !== -1) {
		const exampleEnd = field.description.indexOf('```', exampleStart + 5);
		if (exampleEnd !== -1) {
			field.description = (field.description.slice(0, exampleStart).trim() + '\n' + field.description.slice(exampleEnd + 3).trim()).trim();
		}
	}
}

// Sanitizes field documentation using LLM
export async function sanitizeFields(
	client: OpenAI,
	model: string,
	documented: DocumentedField[],
	unsanitizedNames: string[],
	maxFields: number = 0
): Promise<SanitizedField[]> {
	const promptsDir = path.join(__dirname, 'prompts');
	const namePrompt = fs.readFileSync(path.join(promptsDir, 'name.md'), 'utf-8');
	const parametersPrompt = fs.readFileSync(path.join(promptsDir, 'parameters.md'), 'utf-8');

	const sanitized: SanitizedField[] = [];
	let fieldCount = 0;

	for (const fieldName of unsanitizedNames) {
		console.log('Sanitizing: ' + fieldName);

		const field = documented.find(f => f.name === fieldName)! as SanitizedField;

		removeRedundantContent(field);

		const newName = await sanitizeText(client, model, namePrompt, field.name!) as string;
		if (newName && field.name.length === newName.length) {
			field.name = newName;
		}

		const param = (field as DocumentedField).parameter! as string;

		if (param.trim() === '') {
			field.parameter = { name: 'value', description: '', options: [] };
		} else {
			field.parameter = await sanitizeToJson(client, model, parametersPrompt, {
				'FUNCTION_DESCRIPTION': field.description,
				'PARAMETER_DESCRIPTION': param
			}) as PremakeParameter;

			if (!field.parameter) {
				field.parameter = { name: 'value', description: '', options: [] };
			}
		}

		sanitized.push(field);

		fieldCount++;
		if (maxFields > 0 &&fieldCount >= maxFields) {
			break;
		}
	}

	return sanitized;
}

/**
 * Creates and configures an OpenAI client for LLM operations
 * @param baseURL The base URL for the API
 * @param apiKey The API key (defaults to 'not-needed')
 * @returns Configured OpenAI client
 */
export function createLLMClient(baseURL: string = 'http://localhost:1234/v1', apiKey: string = 'not-needed'): OpenAI {
	return new OpenAI({
		apiKey,
		baseURL,
	});
}
