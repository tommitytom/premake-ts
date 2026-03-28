import { dirname, join, resolve } from "node:path";
import { existsSync } from "node:fs";

/**
 * Find the project root by walking up from startDir looking for orb.ts.
 */
export function findProjectRoot(startDir: string): string | undefined {
	let dir = resolve(startDir);
	while (true) {
		if (existsSync(join(dir, "orb.ts"))) {
			return dir;
		}
		const parent = dirname(dir);
		if (parent === dir) return undefined;
		dir = parent;
	}
}

/**
 * Resolve a path relative to a base directory. If the path is already absolute, return it.
 */
export function resolvePath(base: string, relativePath: string): string {
	return resolve(base, relativePath);
}

/**
 * Make an absolute path relative to a base directory.
 * Uses forward slashes for premake compatibility.
 */
export function makeRelative(from: string, to: string): string {
	const fromParts = resolve(from).replace(/\\/g, "/").split("/");
	const toParts = resolve(to).replace(/\\/g, "/").split("/");

	// Find common prefix length
	let common = 0;
	while (common < fromParts.length && common < toParts.length && fromParts[common].toLowerCase() === toParts[common].toLowerCase()) {
		common++;
	}

	const ups = fromParts.length - common;
	const remaining = toParts.slice(common);

	const parts: string[] = [];
	for (let i = 0; i < ups; i++) parts.push("..");
	parts.push(...remaining);

	return parts.join("/") || ".";
}
