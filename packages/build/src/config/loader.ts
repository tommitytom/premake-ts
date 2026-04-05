import { dirname, join, resolve } from "node:path";
import { existsSync } from "node:fs";
import { pathToFileURL } from "node:url";
import type { IProject, IPackage, IModule } from "./schema.ts";
import * as logger from "../utils/logger.ts";

interface LoadedModule {
	definition: IModule;
	/** Absolute path to the directory that defines this module (for path resolution). */
	sourceDir: string;
}

interface LoadedPackage {
	definition: IPackage;
	modules: LoadedModule[];
	sourceDir: string;
}

export interface LoadedProject {
	definition: IProject;
	packages: LoadedPackage[];
	projectRoot: string;
}

/**
 * Load a TypeScript file and return its default export.
 */
async function loadTsFile(filePath: string): Promise<any> {
	const absPath = resolve(filePath);
	const fileUrl = pathToFileURL(absPath).href;
	const mod = await import(fileUrl);
	return mod.default;
}

/**
 * Resolve a module reference (string name) from a package directory.
 * Looks for:
 *   1. <packageDir>/<name>/orb.module.ts
 *   2. <packageDir>/<name>.ts
 */
function resolveModulePath(packageDir: string, name: string): string | undefined {
	const candidates = [
		join(packageDir, name, "orb.module.ts"),
		join(packageDir, name, "orb.ts"),
		join(packageDir, `${name}.ts`),
	];
	for (const candidate of candidates) {
		if (existsSync(candidate)) return candidate;
	}
	return undefined;
}

/**
 * Resolve a package reference (string path) from the project root.
 * Looks for:
 *   1. <projectRoot>/<path>/orb.package.ts
 *   2. <projectRoot>/<path>/orb.ts (for convenience)
 */
function resolvePackagePath(projectRoot: string, path: string): string | undefined {
	const candidates = [
		join(projectRoot, path, "orb.package.ts"),
		join(projectRoot, path, "orb.ts"),
	];
	for (const candidate of candidates) {
		if (existsSync(candidate)) return candidate;
	}
	return undefined;
}

/**
 * Load a single module from a file path.
 */
async function loadModuleFromFile(filePath: string): Promise<LoadedModule> {
	const exported = await loadTsFile(filePath);
	if (!exported || typeof exported !== "object" || !exported.name) {
		throw new Error(`Expected a module definition (from defineLibrary/defineExecutable/etc.) in ${filePath}`);
	}
	return {
		definition: exported as IModule,
		sourceDir: dirname(resolve(filePath)),
	};
}

/**
 * Load a package and all its modules.
 */
async function loadPackage(packageDef: IPackage, packageDir: string): Promise<LoadedPackage> {
	const modules: LoadedModule[] = [];

	for (const item of packageDef.items) {
		if (typeof item === "string") {
			// String reference — resolve to a file
			const modulePath = resolveModulePath(packageDir, item);
			if (!modulePath) {
				throw new Error(
					`Module "${item}" not found in package "${packageDef.name}".\n` +
					`  Searched:\n` +
					`    ${join(packageDir, item, "orb.module.ts")}\n` +
					`    ${join(packageDir, item + ".ts")}`
				);
			}
			const loaded = await loadModuleFromFile(modulePath);
			modules.push(loaded);
		} else {
			// Inline module definition
			modules.push({
				definition: item,
				sourceDir: packageDir,
			});
		}
	}

	return { definition: packageDef, modules, sourceDir: packageDir };
}

/**
 * Auto-wrap a single entity into a full project.
 * - IModule → wrapped in IPackage("default") → wrapped in IProject
 * - IPackage → wrapped in IProject
 * - IProject → used as-is
 */
function normalizeToProject(exported: any, sourceDir: string): { project: IProject; sourceDir: string } {
	if (!exported || typeof exported !== "object" || !exported.type) {
		throw new Error(`orb.ts must export a project, package, or module definition`);
	}

	if (exported.type === "Project") {
		return { project: exported as IProject, sourceDir };
	}

	if (exported.type === "Package") {
		const pkg = exported as IPackage;
		return {
			project: {
				type: "Project",
				name: pkg.name,
				packages: [pkg],
			},
			sourceDir,
		};
	}

	// Must be a module kind
	const mod = exported as IModule;
	return {
		project: {
			type: "Project",
			name: mod.name,
			packages: [{
				type: "Package",
				name: "default",
				items: [mod],
			}],
		},
		sourceDir,
	};
}

/**
 * Load a full project starting from an orb.ts file.
 */
export async function loadProject(orbFilePath: string): Promise<LoadedProject> {
	const absPath = resolve(orbFilePath);
	const projectRoot = dirname(absPath);

	logger.debug(`Loading project from ${absPath}`);

	const exported = await loadTsFile(absPath);
	const { project } = normalizeToProject(exported, projectRoot);

	const packages: LoadedPackage[] = [];

	for (const pkgRef of project.packages) {
		if (typeof pkgRef === "string") {
			// String reference — resolve to a file
			const packagePath = resolvePackagePath(projectRoot, pkgRef);
			if (!packagePath) {
				throw new Error(
					`Package at path "${pkgRef}" not found.\n` +
					`  Searched:\n` +
					`    ${join(projectRoot, pkgRef, "orb.package.ts")}\n` +
					`    ${join(projectRoot, pkgRef, "orb.ts")}`
				);
			}

			const pkgExported = await loadTsFile(packagePath);
			if (!pkgExported || pkgExported.type !== "Package") {
				throw new Error(`Expected a package definition (from definePackage()) in ${packagePath}`);
			}

			const pkgDir = dirname(resolve(packagePath));
			const loaded = await loadPackage(pkgExported as IPackage, pkgDir);
			packages.push(loaded);
		} else {
			// Inline package definition — resolve modules relative to project root
			const loaded = await loadPackage(pkgRef, projectRoot);
			packages.push(loaded);
		}
	}

	return { definition: project, packages, projectRoot };
}
