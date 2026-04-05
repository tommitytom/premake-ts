import { z } from "zod";

/**
 * Resolve options from Zod schemas + options file + CLI flags.
 * Resolution order: schema defaults → options file → CLI flags.
 */
export function resolveOptions(
	schemas: Record<string, { schema: z.ZodType<any> }>,
	cliFlags: Record<string, unknown>,
	optionsFile?: Record<string, unknown>
): Record<string, unknown> {
	const resolved: Record<string, unknown> = {};

	for (const [key, { schema }] of Object.entries(schemas)) {
		const fileValue = optionsFile?.[key];
		const cliValue = cliFlags[key];

		// Merge: CLI overrides file overrides defaults
		let input: unknown;
		if (typeof fileValue === "object" && fileValue !== null && typeof cliValue === "object" && cliValue !== null) {
			input = { ...fileValue, ...cliValue };
		} else {
			input = cliValue ?? fileValue ?? undefined;
		}

		resolved[key] = schema.parse(input);
	}

	return resolved;
}
