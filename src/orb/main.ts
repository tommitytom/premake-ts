import fs from 'node:fs';
import path, { dirname, join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { generate } from '../generator/generator.ts';
import sanitized from "../parser/data/sanitized.json" with { type: "json" };
import { PremakeScope } from '../scopes/PremakeScope.ts';
import type { ProjectScope, WorkspaceScope } from '../scopes/scopes.ts';
import type { IModule, IOrbBase, IPackage } from './types.ts';
import { runPremake } from '../generator/util.ts';

export interface IBuildOrb<T extends IOrbBase = IOrbBase> {
	rootDir: string;
	filename: string;
	fullName: string;
	orbModule: T;

	privateScope?: PremakeScope;
	publicScope?: PremakeScope;
	linkScope?: PremakeScope;

	moduleScope?: PremakeScope;
}

export interface IModuleOrb extends IBuildOrb<IModule> {}

interface IPendingOrb {
	rootDir: string;
	rootName: string;
	filename?: string;
}

function findOrb(workingDir: string, rootDir: string, filePath?: string): string | null {
	if (filePath) {
		filePath = path.normalize(path.join(rootDir, filePath));

		if (fs.existsSync(path.join(workingDir, filePath))) {
			return filePath;
		}

		return null;
	}

	filePath = rootDir + '.ts';
	if (fs.existsSync(path.join(workingDir, filePath))) {
		return filePath;
	}

	filePath = path.normalize(path.join(rootDir, 'orb.ts'));
	if (fs.existsSync(path.join(workingDir, filePath))) {
		return filePath;
	}

	return null;
}

async function collectOrbs(filePath: string): Promise<IBuildOrb[]> {
	const workingDir = path.normalize(path.dirname(filePath));

	const pendingOrbs: IPendingOrb[] = [{ rootDir: '.', filename: path.basename(filePath), rootName: '' }];
	const orbs: IBuildOrb[] = [];
	let root: IBuildOrb | null = null;

	while (pendingOrbs.length > 0) {
		const pending = pendingOrbs.pop()!;
		const filePath = findOrb(workingDir, pending.rootDir, pending.filename);

		if (!filePath) {
			throw new Error(`Orb file not found: ${pending.rootDir}`);
		}

		const orbUrl = pathToFileURL(path.join(workingDir, filePath)).href;
		const orbModule = (await import(orbUrl)).default as IOrbBase;

		if (!orbModule.type) {
			throw new Error(`Orb at ${filePath} is missing a type`);
		}

		if (!root && orbModule.type !== 'Package') {
			throw new Error(`The root orb must be of type 'Package'`);
		}

		const buildOrb: IBuildOrb = {
			rootDir: path.dirname(filePath),
			filename: path.basename(filePath),
			fullName: (root && pending.rootName !== '' && pending.rootName !== root.fullName) ? pending.rootName + '/' + orbModule.name : orbModule.name,
			orbModule: orbModule
		};

		if (orbModule.type === 'Package') {
			const pkg = orbModule as IPackage;
			if (!pkg.items || pkg.items.length === 0) {
				throw new Error(`Package orb at "${filePath}" has no items`);
			}

			for (const itemName of pkg.items) {
				pendingOrbs.push({
					rootName: buildOrb.fullName,
					rootDir: path.join(pending.rootDir, itemName),
				});
			}
		}

		if (!root) {
			root = buildOrb;
		}

		orbs.push(buildOrb);
	}

	return orbs;
}

function resolveDependencies(orbs: Map<string, IModuleOrb>) {
	for (const [_, buildOrb] of orbs) {
		const module = buildOrb.orbModule;
		if (module.dependencies) {
			for (const depName of module.dependencies) {
				if (!orbs.has(depName)) {
					throw new Error(`Module "${buildOrb.fullName}" has unknown dependency "${depName}"`);
				}
			}
		}
	}
}

function createLookup(orbs: IModuleOrb[]): Map<string, IModuleOrb> {
	const map = new Map<string, IModuleOrb>();
	for (const orb of orbs) {
		map.set(orb.fullName, orb);
	}

	return map;
}

function processScopes(orbs: IModuleOrb[]) {
	for (const orb of orbs) {
		const module = orb.orbModule;

		if (module.private) {
			console.assert(orb.privateScope === undefined, "Private scope already defined");
			const privateScope = new PremakeScope();
			module.private(privateScope.createProxy<ProjectScope>());
			orb.privateScope = privateScope;
		}

		if (module.public) {
			console.assert(orb.publicScope === undefined, "Public scope already defined");
			const publicScope = new PremakeScope();
			module.public(publicScope.createProxy<ProjectScope>());
			orb.publicScope = publicScope;
		}

		if (module.link) {
			console.assert(orb.linkScope === undefined, "Link scope already defined");
			const linkScope = new PremakeScope();
			module.link(linkScope.createProxy<ProjectScope>());
			orb.linkScope = linkScope;
		}
	}
}

function resolveScopePaths(rootDir: string, scope?: PremakeScope) {
	if (!scope) {
		return;
	}

	const sanitizePath = (p: string) => {
		const fullPath = path.isAbsolute(p) ? p : path.normalize(path.join(rootDir, p));
		return fullPath.replaceAll('\\', '/');
	};

	const pathKinds = ['path', 'file', 'directory', 'list:path', 'list:file', 'list:directory'];

	const commands = scope.getCommands();
	for (const cmd of commands) {
		const found = sanitized.find(field => field.name === cmd.name && pathKinds.includes(field.kind));
		if (!found) continue;

		if (found.kind.startsWith('list:')) {
			const pathArgs = cmd.args as string[];
			const sanitizedPaths: string[] = [];
			for (let i = 0; i < pathArgs.length; ++i) {
				sanitizedPaths.push(sanitizePath(pathArgs[i]));
			}

			cmd.args = sanitizedPaths;
		} else {
			cmd.args = sanitizePath(cmd.args as string);
		}
	}
}

function resolveModulePaths(orbs: IModuleOrb[]) {
	for (const orb of orbs) {
		const rootDir = orb.orbModule.rootDir ? path.join(orb.rootDir, orb.orbModule.rootDir) : orb.rootDir;
		resolveScopePaths(rootDir, orb.publicScope);
		resolveScopePaths(rootDir, orb.privateScope);
		resolveScopePaths(rootDir, orb.linkScope);
	}
}

function setupWorkspace(w: WorkspaceScope) {
	w.configurations('Debug', 'Release');
	w.architecture('x86_64');
	w.location('build/' + w.action);
	w.cppDialect('C++20');

	w.when('configurations:Debug', w => {
		w.defines('DEBUG');
		w.symbols('On');
	}).when('configurations:Release', w => {
		w.defines('NDEBUG');
		w.optimize('On');
	});
}

function createWorkspaceScope(name: string, lookup: Map<string, IModuleOrb>): PremakeScope {
	const workspaceScope = new PremakeScope();
	workspaceScope.command("workspace", name);

	setupWorkspace(workspaceScope.createProxy<WorkspaceScope>());

	for (const orb of lookup.values()) {
		const module = orb.orbModule;
		console.assert(orb.moduleScope === undefined, "Module scope already defined");

		workspaceScope.command("project", module.name);
		workspaceScope.command("kind", module.type);
		workspaceScope.command("files", [path.join(orb.rootDir, orb.filename).replaceAll('\\', '/')]);

		if (module.dependencies) {
			for (const depName of module.dependencies) {
				const depOrb = lookup.get(depName)!;
				console.assert(!!depOrb, `Dependency orb not found: ${depName}`);

				if (depOrb.publicScope) {
					workspaceScope.addCommands(depOrb.publicScope.getCommands());
				}
			}
		}

		if (orb.publicScope) {
			workspaceScope.addCommands(orb.publicScope.getCommands());
		}

		if (orb.privateScope) {
			workspaceScope.addCommands(orb.privateScope.getCommands());
		}

		if (module.type === 'ConsoleApp' || module.type === 'WindowedApp') {
			const deps = collectDependencies(orb, lookup);
			for (const depOrb of deps) {
				if (depOrb.linkScope) {
					workspaceScope.addCommands(depOrb.linkScope.getCommands());
				} else if (!depOrb.orbModule.headerOnly) {
					workspaceScope.command("links", [depOrb.orbModule.name]);
				}
			}
		}

		workspaceScope.command("project");
	}

	return workspaceScope;
}

function collectDependencies(rootOrb: IModuleOrb, lookup: Map<string, IModuleOrb>): IModuleOrb[] {
	const dependencies: IModuleOrb[] = [];
	const pendingOrbs: IModuleOrb[] = [rootOrb];

	while (pendingOrbs.length > 0) {
		const orb = pendingOrbs.pop()!;
		const module = orb.orbModule;
		dependencies.push(orb);

		if (module.dependencies) {
			for (const depName of module.dependencies) {
				const depOrb = lookup.get(depName)!;
				console.assert(!!depOrb, `Dependency orb not found: ${depName}`);
				pendingOrbs.push(depOrb);
			}
		}
	}

	return dependencies;
}

async function main() {
	const args = process.argv.slice(2);

	let scriptPath = 'orb.ts'; // Default to orb.ts in current directory
	const fileArgIndex = args.findIndex(arg => arg.startsWith('--file='));

	if (fileArgIndex !== -1) {
		scriptPath = args[fileArgIndex].split('=')[1];
		// Remove --file from args so it's not passed to premake
		args.splice(fileArgIndex, 1);
	}

	try {
		const absolutePath = resolve(scriptPath);

		const orbs = await collectOrbs(absolutePath);
		const modules = orbs.filter(orb => orb.orbModule.type !== 'Package') as IModuleOrb[];
		const lookup = createLookup(modules);
		resolveDependencies(lookup);
		processScopes(modules);
		resolveModulePaths(modules);
		const workspaceScope = createWorkspaceScope(orbs[0].orbModule.name, lookup);
		const premakeFile = generate(workspaceScope);

		console.log(premakeFile);

		// Write the Lua file to the same directory as the TypeScript file
		const scriptDir = dirname(absolutePath);
		const luaFileName = 'premake5.lua';
		const luaFilePath = join(scriptDir, luaFileName);

		fs.writeFileSync(luaFilePath, premakeFile, 'utf-8');

		// Pass the generated Lua file path to premake
		runPremake([`--file=${luaFilePath}`, 'vs2022']);
	} catch (error) {
		console.error('Error running script:', error);
		process.exit(1);
	}
}

main();
