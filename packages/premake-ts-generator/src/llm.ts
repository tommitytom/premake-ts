import OpenAI from "openai";

function formatJsonString(jsonString: string): string {
	return jsonString.replace(/^```(?:json|markdown)?\n?/, "").replace(/\n?```$/, "");
}

export async function queryPrompt(client: OpenAI, model: string, prompt: string): Promise<string|null> {
	try {
		const response = await client.chat.completions.create({
			model: model,
			messages: [
				{ role: 'user', content: prompt },
			],
		});

		return response.choices.length > 0 ? response.choices[0].message.content : null;
	} catch (error) {
		console.error('Error sanitizing text:', error);
	}

	return null;
}

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

export async function sanitizeToJson(client: OpenAI, model: string, prompt: string, replace?: Record<string, string>): Promise<object|undefined> {
	if (replace) {
		for (const [key, value] of Object.entries(replace)) {
			prompt = prompt.replace(`{{${key}}}`, value);
		}
	}

	const sanitized = await queryPrompt(client, model, prompt);
	if (!sanitized) return undefined;

	try {
		return JSON.parse(formatJsonString(sanitized));
	} catch (error) {
		console.log(sanitized);
		console.error('Error sanitizing text:', error);
	}
}
