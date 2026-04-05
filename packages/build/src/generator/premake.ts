import type { ModuleScope, FilterArg, IProject, IConfigDefaults } from "../config/schema.ts";
import type { DependencyGraph, ResolvedModule } from "../resolver/graph.ts";
import { getTransitiveDeps } from "../resolver/graph.ts";
import { compileFilter } from "./filters.ts";
import { makeRelative } from "../utils/paths.ts";
import { PremakeScope } from "@orb/premake-ts/scopes/PremakeScope";
import type { WorkspaceScope, ProjectScope } from "@orb/premake-ts/scopes";
import { generate as generateLua } from "@orb/premake-ts/generator";
import type { IGlobals } from "@orb/premake-ts/scopes/PremakeScope";

// ============================================================================
// ModuleScopeImpl — records operations for later replay into premake-ts
// ============================================================================

interface ScopeOperation {
	type: string;
	args: any[];
	children?: ScopeOperation[];
}

class ModuleScopeImpl implements ModuleScope {
	operations: ScopeOperation[] = [];

	files(...patterns: string[]): void {
		this.operations.push({ type: "files", args: patterns });
	}

	removeFiles(...patterns: string[]): void {
		this.operations.push({ type: "removeFiles", args: patterns });
	}

	includeDirs(...dirs: string[]): void {
		this.operations.push({ type: "includeDirs", args: dirs });
	}

	externalIncludeDirs(...dirs: string[]): void {
		this.operations.push({ type: "externalIncludeDirs", args: dirs });
	}

	defines(...defs: string[]): void {
		this.operations.push({ type: "defines", args: defs });
	}

	undefines(...defs: string[]): void {
		this.operations.push({ type: "undefines", args: defs });
	}

	links(...libs: string[]): void {
		this.operations.push({ type: "links", args: libs });
	}

	libDirs(...dirs: string[]): void {
		this.operations.push({ type: "libDirs", args: dirs });
	}

	buildOptions(...opts: string[]): void {
		this.operations.push({ type: "buildOptions", args: opts });
	}

	linkOptions(...opts: string[]): void {
		this.operations.push({ type: "linkOptions", args: opts });
	}

	warnings(level: "Off" | "Default" | "High" | "Extra" | "Everything"): void {
		this.operations.push({ type: "warnings", args: [level] });
	}

	disableWarnings(...ids: string[]): void {
		this.operations.push({ type: "disableWarnings", args: ids });
	}

	fatalWarnings(enabled: boolean): void {
		this.operations.push({ type: "flags", args: enabled ? ["FatalWarnings"] : [] });
	}

	optimize(level: "Off" | "Debug" | "On" | "Size" | "Speed" | "Full"): void {
		this.operations.push({ type: "optimize", args: [level] });
	}

	symbols(mode: "Off" | "On" | "FastLink" | "Full"): void {
		this.operations.push({ type: "symbols", args: [mode] });
	}

	runtime(mode: "Debug" | "Release"): void {
		this.operations.push({ type: "runtime", args: [mode] });
	}

	staticRuntime(mode: "Off" | "On"): void {
		this.operations.push({ type: "staticRuntime", args: [mode] });
	}

	cppDialect(version: string): void {
		this.operations.push({ type: "cppDialect", args: [version] });
	}

	cDialect(version: string): void {
		this.operations.push({ type: "cDialect", args: [version] });
	}

	when(conditions: FilterArg, fn: (ctx: ModuleScope) => void): void {
		const inner = new ModuleScopeImpl();
		fn(inner);
		this.operations.push({
			type: "when",
			args: [conditions],
			children: inner.operations,
		});
	}

	targetDir(dir: string): void {
		this.operations.push({ type: "targetDir", args: [dir] });
	}

	objDir(dir: string): void {
		this.operations.push({ type: "objDir", args: [dir] });
	}

	moduleFiles(...patterns: string[]): void {
		this.operations.push({ type: "files", args: patterns });
	}

	moduleExports(...moduleNames: string[]): void {
		// Forward-looking: no-op for now
	}

	characterSet(set: "Default" | "Unicode" | "MBCS"): void {
		this.operations.push({ type: "characterSet", args: [set] });
	}

	flags(...flags: string[]): void {
		this.operations.push({ type: "flags", args: flags });
	}

	raw(luaCode: string): void {
		this.operations.push({ type: "raw", args: [luaCode] });
	}
}

// ============================================================================
// Path resolution for operations
// ============================================================================

/** Commands whose arguments are file paths that need resolution. */
const PATH_COMMANDS = new Set([
	"files", "removeFiles", "includeDirs", "externalIncludeDirs",
	"libDirs", "targetDir", "objDir",
]);

/**
 * Resolve paths in operations relative to the workspace root.
 */
function resolveOperationPaths(
	operations: ScopeOperation[],
	moduleRootDir: string,
	workspaceRoot: string
): ScopeOperation[] {
	return operations.map(op => {
		if (op.type === "when" && op.children) {
			return {
				...op,
				children: resolveOperationPaths(op.children, moduleRootDir, workspaceRoot),
			};
		}

		if (PATH_COMMANDS.has(op.type)) {
			return {
				...op,
				args: op.args.map(arg => {
					if (typeof arg !== "string") return arg;
					// Resolve relative to module root, then make relative to workspace root
					const relFromRoot = makeRelative(workspaceRoot, moduleRootDir);
					if (relFromRoot === ".") return arg;
					const combined = `${relFromRoot}/${arg}`;
					// Normalize trailing /. and redundant slashes
					return combined.replace(/\/\.$/, "").replace(/\/+/g, "/");
				}),
			};
		}

		return op;
	});
}

// ============================================================================
// Replay operations into premake-ts proxy
// ============================================================================

function replayOperations(ops: ScopeOperation[], proxy: ProjectScope): void {
	for (const op of ops) {
		if (op.type === "when" && op.children) {
			const filterArg = op.args[0] as FilterArg;
			const filterStrings = compileFilter(filterArg);
			const filterValue = filterStrings.length === 1 ? filterStrings[0] : filterStrings;
			(proxy as any).when(filterValue, (inner: ProjectScope) => {
				replayOperations(op.children!, inner);
			});
		} else if (op.type === "raw") {
			// Raw lua — not directly supported by premake-ts proxy; skip for now
		} else {
			const fn = (proxy as any)[op.type];
			if (typeof fn === "function") {
				fn.call(proxy, ...op.args);
			}
		}
	}
}

// ============================================================================
// Kind mapping
// ============================================================================

function moduleKindToPremake(kind: string): string {
	switch (kind) {
		case "StaticLib": return "StaticLib";
		case "SharedLib": return "SharedLib";
		case "ConsoleApp": return "ConsoleApp";
		case "WindowedApp": return "WindowedApp";
		case "HeaderOnly": return "None";
		default: return kind;
	}
}

// ============================================================================
// Main generation function
// ============================================================================

export interface GenerateOptions {
	graph: DependencyGraph;
	project: IProject;
	projectRoot: string;
	globals: IGlobals;
	resolvedOptions?: Record<string, unknown>;
}

/**
 * Generate premake Lua from the resolved dependency graph.
 */
export function generatePremake(opts: GenerateOptions): string {
	const { graph, project, projectRoot, globals, resolvedOptions } = opts;
	const defaults = project.defaults ?? {};
	const configurations = defaults.configurations ?? ["Debug", "Release"];

	const scope = new PremakeScope(globals);

	// Emit workspace
	scope.command("workspace", project.name);

	// Direct output to build/<action>/ subdirectory
	scope.command("location", `build/${globals.action}`);

	const proxy = scope.createProxy<WorkspaceScope>();

	// Emit configurations
	proxy.configurations(...configurations);

	// Emit configuration defaults
	emitConfigurationDefaults(defaults, proxy, projectRoot);

	// Emit default language settings
	if (defaults.cppDialect) {
		proxy.cppDialect(defaults.cppDialect as any);
	}
	if (defaults.characterSet) {
		proxy.characterSet(defaults.characterSet);
	}

	// Emit each reachable module as a premake project
	for (const qualifiedName of graph.topologicalOrder) {
		const mod = graph.modules.get(qualifiedName)!;
		if (!mod.reachable) continue;

		emitModule(mod, graph, scope, projectRoot, defaults, resolvedOptions);
	}

	return generateLua(scope);
}

function emitConfigurationDefaults(
	defaults: IConfigDefaults,
	proxy: WorkspaceScope,
	projectRoot: string
): void {
	if (!defaults.configurationDefaults) return;

	for (const [configName, setupFn] of Object.entries(defaults.configurationDefaults)) {
		const filterStr = `configurations:${configName}` as const;
		proxy.when(filterStr, (p: ProjectScope) => {
			const scopeImpl = new ModuleScopeImpl();
			setupFn(scopeImpl);
			const resolved = resolveOperationPaths(scopeImpl.operations, projectRoot, projectRoot);
			replayOperations(resolved, p);
		});
	}
}

function emitModule(
	mod: ResolvedModule,
	graph: DependencyGraph,
	scope: PremakeScope,
	workspaceRoot: string,
	defaults: IConfigDefaults,
	resolvedOptions?: Record<string, unknown>
): void {
	const def = mod.definition;

	scope.project(def.name, (p: ProjectScope) => {
		// Kind
		p.kind(moduleKindToPremake(def.type) as any);

		// Language
		p.language("C++");

		// Private settings
		if (def.private) {
			const privateScope = new ModuleScopeImpl();
			def.private(privateScope, resolvedOptions);
			const resolved = resolveOperationPaths(privateScope.operations, mod.rootDir, workspaceRoot);
			replayOperations(resolved, p);
		}

		// Transitive public settings from all dependencies
		const transitiveDeps = getTransitiveDeps(mod.qualifiedName, graph);
		for (const depName of transitiveDeps) {
			const dep = graph.modules.get(depName);
			if (!dep?.definition.public) continue;

			const publicScope = new ModuleScopeImpl();
			dep.definition.public(publicScope, resolvedOptions);
			const resolved = resolveOperationPaths(publicScope.operations, dep.rootDir, workspaceRoot);
			replayOperations(resolved, p);
		}

		// Transitive link settings from all dependencies
		for (const depName of transitiveDeps) {
			const dep = graph.modules.get(depName);
			if (!dep?.definition.link) continue;

			const linkScope = new ModuleScopeImpl();
			dep.definition.link(linkScope, resolvedOptions);
			const resolved = resolveOperationPaths(linkScope.operations, dep.rootDir, workspaceRoot);
			replayOperations(resolved, p);
		}

		// Auto-link: link against dependency outputs
		const autoLinks: string[] = [];
		for (const depName of transitiveDeps) {
			const dep = graph.modules.get(depName);
			if (!dep) continue;
			if (dep.definition.autoLink === false) continue;
			if (dep.definition.type === "HeaderOnly") continue;
			autoLinks.push(dep.definition.name);
		}
		if (autoLinks.length > 0) {
			p.links(...autoLinks);
		}

		// MSVC runtime settings
		emitMsvcRuntime(defaults, p);
	});
}

function emitMsvcRuntime(defaults: IConfigDefaults, proxy: ProjectScope): void {
	const msvcRuntime = defaults.msvcRuntime ?? "dynamic";
	const configurations = defaults.configurations ?? ["Debug", "Release"];

	for (const config of configurations) {
		const isDebug = config.toLowerCase().includes("debug");
		const runtimeMode = isDebug ? "Debug" : "Release";
		const staticRt = msvcRuntime === "static" ? "On" : "Off";

		proxy.when(`configurations:${config}` as const, (p: ProjectScope) => {
			p.runTime(runtimeMode as any);
			p.staticRuntime(staticRt as any);
		});
	}
}
