import OpenAI from "openai";
import { formatJsonString } from "./formatting.ts";

export async function sanitizeText(client: OpenAI, model: string, prompt: string, text: string): Promise<string|null> {
	try {
		const response = await client.chat.completions.create({
			model: model,
			messages: [
				{ role: 'user', content: prompt + '```\n' + text + '\n```' },
			],
		});

		return response.choices.length > 0 ? response.choices[0].message.content : null;
	} catch (error) {
		console.error('Error sanitizing text:', error);
	}

	return null;
}

export async function sanitizeToJson(client: OpenAI, model: string, prompt: string, text: string): Promise<object|undefined> {
	const sanitized = await sanitizeText(client, model, prompt, text);
	if (!sanitized) return undefined;

	try {
		return JSON.parse(formatJsonString(sanitized));
	} catch (error) {
		console.log(sanitized);
		console.error('Error sanitizing text:', error);
	}
}
