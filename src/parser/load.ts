/**
 * Step 1: Load initial data from fields.json
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import type { PremakeField } from './types.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Loads existing data from a JSON file if it exists
 * @param filename The name of the file to load
 * @returns The parsed JSON array or an empty array if file doesn't exist
 */
export function loadExistingData<T>(filename: string): T[] {
	const filePath = path.join(__dirname, filename);
	if (fs.existsSync(filePath)) {
		return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
	}
	return [];
}

/**
 * Finds fields that are missing from the target array
 * @param sourceFields All available fields
 * @param targetFields Fields already processed
 * @returns Array of field names that need processing
 */
export function findMissingFields(sourceFields: PremakeField[], targetFields: { name: string }[]): string[] {
	const missing: string[] = [];
	for (const field of sourceFields) {
		if (!targetFields.find(f => f.name.toLowerCase() === field.name.toLowerCase())) {
			missing.push(field.name);
		}
	}
	return missing;
}
