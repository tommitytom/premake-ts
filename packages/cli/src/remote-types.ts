import { existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const RAW_BASE = 'https://raw.githubusercontent.com/tommitytom/premake-types/main';
const MANIFEST_URL = `${RAW_BASE}/manifest.json`;

export interface ManifestEntry {
	generatorVersion: string;
	date: string;
}

export interface Manifest {
	generatorVersion: string;
	latest: string;
	latestDev: string;
	releases: Record<string, ManifestEntry>;
	dev: Record<string, ManifestEntry>;
}

/**
 * Fetch the types manifest from GitHub
 */
export async function fetchManifest(): Promise<Manifest> {
	const res = await fetch(MANIFEST_URL);
	if (!res.ok) {
		throw new Error(`Failed to fetch types manifest: ${res.status} ${res.statusText}`);
	}
	return res.json() as Promise<Manifest>;
}

/**
 * Resolve a version string to a manifest entry and its path in the repo
 */
export function resolveVersion(manifest: Manifest, version?: string): { entry: ManifestEntry; label: string; repoPath: string } {
	const requested = version || 'latest';

	if (requested === 'latest') {
		const entry = manifest.releases[manifest.latest];
		if (!entry) {
			throw new Error(`Latest version "${manifest.latest}" not found in manifest`);
		}
		return { entry, label: manifest.latest, repoPath: `releases/${manifest.latest}` };
	}

	if (requested === 'dev') {
		const entry = manifest.dev[manifest.latestDev];
		if (!entry) {
			throw new Error(`Latest dev version "${manifest.latestDev}" not found in manifest`);
		}
		return { entry, label: `dev-${manifest.latestDev}`, repoPath: `dev/${manifest.latestDev}` };
	}

	// Try releases first, then dev
	if (manifest.releases[requested]) {
		return { entry: manifest.releases[requested], label: requested, repoPath: `releases/${requested}` };
	}

	if (manifest.dev[requested]) {
		return { entry: manifest.dev[requested], label: `dev-${requested}`, repoPath: `dev/${requested}` };
	}

	throw new Error(
		`Version "${requested}" not found. ` +
		`Available releases: ${Object.keys(manifest.releases).join(', ') || 'none'}. ` +
		`Available dev builds: ${Object.keys(manifest.dev).join(', ') || 'none'}.`
	);
}

/**
 * Download a text file from the types repo
 */
async function downloadFile(repoPath: string): Promise<string> {
	const url = `${RAW_BASE}/${repoPath}`;
	const res = await fetch(url, { redirect: 'follow' });
	if (!res.ok) {
		throw new Error(`Failed to download ${url}: ${res.status} ${res.statusText}`);
	}
	return res.text();
}

/**
 * Download a set of files from the types repo into a local directory
 */
async function downloadFiles(repoPath: string, files: string[], destDir: string): Promise<void> {
	if (existsSync(destDir)) {
		rmSync(destDir, { recursive: true });
	}

	for (const file of files) {
		const content = await downloadFile(`${repoPath}/${file}`);
		const destPath = join(destDir, file);
		mkdirSync(dirname(destPath), { recursive: true });
		writeFileSync(destPath, content, 'utf-8');
		console.log(`  ${file}`);
	}
}

/** Files that make up the LuaLS addon */
const LUA_TYPE_FILES = [
	'lua/config.json',
	'lua/library/premake.lua',
];

/**
 * Install Lua type definitions (LuaLS addon)
 */
export async function installLuaTypes(version?: string, cwd: string = process.cwd()): Promise<void> {
	console.log('Fetching types manifest...');
	const manifest = await fetchManifest();

	const { entry, label, repoPath } = resolveVersion(manifest, version);
	console.log(`Installing Lua types for premake ${label} (generator ${entry.generatorVersion})...`);

	const destDir = join(cwd, '.premake-ts', 'lua-types');
	await downloadFiles(repoPath, LUA_TYPE_FILES, destDir);

	console.log(`\nLua types installed to ${destDir}`);
	console.log('\nTo use with LuaLS, add this to your .luarc.json:');
	console.log(JSON.stringify({
		"workspace.library": [".premake-ts/lua-types/lua/library"]
	}, null, 2));
}

/**
 * Install TypeScript type definitions (premake-ts.d.ts + tsconfig.json)
 */
export async function installRemoteTypes(version?: string, cwd: string = process.cwd()): Promise<void> {
	console.log('Fetching types manifest...');
	const manifest = await fetchManifest();

	const { entry, label, repoPath } = resolveVersion(manifest, version);
	console.log(`Installing TypeScript types for premake ${label} (generator ${entry.generatorVersion})...`);

	// Download to project root (where the user's premake5.ts lives)
	const dtsContent = await downloadFile(`${repoPath}/ts/premake-ts.d.ts`);
	const tsconfigContent = await downloadFile(`${repoPath}/ts/tsconfig.json`);

	writeFileSync(join(cwd, 'premake-ts.d.ts'), dtsContent, 'utf-8');
	console.log('  ./premake-ts.d.ts');

	writeFileSync(join(cwd, 'tsconfig.json'), tsconfigContent, 'utf-8');
	console.log('  ./tsconfig.json');

	console.log('\nTypeScript types installed.');
}
