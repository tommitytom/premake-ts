import { resolve as resolvePath } from "node:path";
import type { IModule, DependencyRef } from "../config/schema.ts";
import type { LoadedProject } from "../config/loader.ts";

// ============================================================================
// Graph Types
// ============================================================================

export interface ResolvedModule {
	/** Fully qualified name: "package/module" */
	qualifiedName: string;
	/** The original module definition. */
	definition: IModule;
	/** Absolute path to the module's root directory. */
	rootDir: string;
	/** Resolved dependency qualified names. */
	resolvedDeps: string[];
	/** Optional deps that were not found or disabled — silently skipped. */
	skippedDeps: string[];
	/** Whether this module is a build root (executable or explicitly requested). */
	isRoot: boolean;
	/** Whether this module is reachable from a root. Set during pruning. */
	reachable: boolean;
}

export interface DependencyGraph {
	/** All modules by qualified name. */
	modules: Map<string, ResolvedModule>;
	/** Adjacency list: module → its dependencies. */
	edges: Map<string, string[]>;
	/** Reverse adjacency: module → modules that depend on it. */
	reverseEdges: Map<string, string[]>;
	/** Topologically sorted qualified names (dependencies before dependents). */
	topologicalOrder: string[];
}

// ============================================================================
// Graph Construction
// ============================================================================

export function buildDependencyGraph(project: LoadedProject, resolvedOptions?: Record<string, unknown>): DependencyGraph {
	const modules = new Map<string, ResolvedModule>();
	const bareNameIndex = new Map<string, string[]>(); // bare name → qualified names

	// 1. Register all modules by qualified name and bare name
	for (const pkg of project.packages) {
		for (const loadedMod of pkg.modules) {
			const mod = loadedMod.definition;
			const qualifiedName = `${pkg.definition.name}/${mod.name}`;

			// Resolve rootDir: if set, relative to sourceDir; otherwise sourceDir itself
			let rootDir: string;
			if (mod.rootDir) {
				rootDir = resolvePath(loadedMod.sourceDir, mod.rootDir);
			} else {
				rootDir = loadedMod.sourceDir;
			}

			const resolved: ResolvedModule = {
				qualifiedName,
				definition: mod,
				rootDir,
				resolvedDeps: [],
				skippedDeps: [],
				isRoot: mod.type === "ConsoleApp" || mod.type === "WindowedApp",
				reachable: false,
			};

			if (modules.has(qualifiedName)) {
				throw new Error(`Duplicate module: "${qualifiedName}" is defined more than once`);
			}
			modules.set(qualifiedName, resolved);

			// Track bare names for ambiguity detection
			const bare = mod.name;
			if (!bareNameIndex.has(bare)) {
				bareNameIndex.set(bare, []);
			}
			bareNameIndex.get(bare)!.push(qualifiedName);
		}
	}

	// 2. Evaluate enabled callbacks and remove disabled modules
	if (resolvedOptions) {
		for (const [name, mod] of modules) {
			if (mod.definition.enabled && !mod.definition.enabled(resolvedOptions)) {
				modules.delete(name);
			}
		}
	}

	// 3. Resolve dependency references
	const edges = new Map<string, string[]>();
	const reverseEdges = new Map<string, string[]>();

	for (const [, mod] of modules) {
		edges.set(mod.qualifiedName, []);
		reverseEdges.set(mod.qualifiedName, []);
	}

	for (const [, mod] of modules) {
		const depRefs = getDependencyRefs(mod.definition, resolvedOptions);
		const packageName = mod.qualifiedName.split("/")[0];

		for (const ref of depRefs) {
			const { name: depName, optional } = normalizeDependencyRef(ref);
			const resolved = resolveDependencyName(depName, packageName, modules, bareNameIndex);

			if (!resolved) {
				if (optional) {
					mod.skippedDeps.push(depName);
					continue;
				}
				// Build helpful error message
				const available = Array.from(modules.keys()).sort();
				throw new Error(
					`Module '${mod.qualifiedName}' depends on '${depName}' which does not exist.\n\n` +
					`  Available modules: ${available.join(", ")}`
				);
			}

			mod.resolvedDeps.push(resolved);
			edges.get(mod.qualifiedName)!.push(resolved);
			if (!reverseEdges.has(resolved)) {
				reverseEdges.set(resolved, []);
			}
			reverseEdges.get(resolved)!.push(mod.qualifiedName);
		}
	}

	// 4. Detect cycles via topological sort
	const topologicalOrder = topologicalSort(modules, edges);

	// 5. Mark reachable modules from roots
	markReachable(modules, edges);

	return { modules, edges, reverseEdges, topologicalOrder };
}

function getDependencyRefs(mod: IModule, opts?: Record<string, unknown>): DependencyRef[] {
	if (!mod.dependencies) return [];
	if (typeof mod.dependencies === "function") {
		return mod.dependencies(opts);
	}
	return mod.dependencies;
}

function normalizeDependencyRef(ref: DependencyRef): { name: string; optional: boolean } {
	if (typeof ref === "string") {
		return { name: ref, optional: false };
	}
	return { name: ref.name, optional: ref.optional ?? false };
}

/**
 * Resolve a dependency name to a qualified name.
 * - If it contains "/", treat as qualified name.
 * - Otherwise, check same package first, then globally, error if ambiguous.
 */
function resolveDependencyName(
	name: string,
	currentPackage: string,
	modules: Map<string, ResolvedModule>,
	bareNameIndex: Map<string, string[]>
): string | undefined {
	// Qualified name
	if (name.includes("/")) {
		return modules.has(name) ? name : undefined;
	}

	// Bare name — check same package first
	const samePackageQualified = `${currentPackage}/${name}`;
	if (modules.has(samePackageQualified)) {
		return samePackageQualified;
	}

	// Check globally
	const candidates = bareNameIndex.get(name)?.filter(qn => modules.has(qn)) ?? [];
	if (candidates.length === 1) {
		return candidates[0];
	}
	if (candidates.length > 1) {
		throw new Error(
			`Ambiguous dependency '${name}'.\n\n` +
			`  Found in multiple packages:\n` +
			candidates.map(c => `    ${c}`).join("\n") + "\n\n" +
			`  Use the fully qualified name to disambiguate.`
		);
	}

	return undefined;
}

/**
 * Topological sort using Kahn's algorithm. Throws on cycle.
 */
function topologicalSort(
	modules: Map<string, ResolvedModule>,
	edges: Map<string, string[]>
): string[] {
	// Compute in-degrees (only among existing modules)
	const inDegree = new Map<string, number>();
	for (const name of modules.keys()) {
		inDegree.set(name, 0);
	}
	for (const [, deps] of edges) {
		for (const dep of deps) {
			if (inDegree.has(dep)) {
				inDegree.set(dep, inDegree.get(dep)! + 1);
			}
		}
	}

	const queue: string[] = [];
	for (const [name, degree] of inDegree) {
		if (degree === 0) queue.push(name);
	}

	const order: string[] = [];
	while (queue.length > 0) {
		const node = queue.shift()!;
		order.push(node);

		const deps = edges.get(node) ?? [];
		for (const dep of deps) {
			if (!inDegree.has(dep)) continue;
			const newDegree = inDegree.get(dep)! - 1;
			inDegree.set(dep, newDegree);
			if (newDegree === 0) queue.push(dep);
		}
	}

	if (order.length !== modules.size) {
		// Find cycle for error message
		const remaining = [...modules.keys()].filter(n => !order.includes(n));
		const cyclePath = findCycle(remaining, edges);
		throw new Error(
			`Dependency cycle detected:\n  ${cyclePath.join(" → ")}`
		);
	}

	return order;
}

/**
 * Find a cycle among the given nodes for error reporting.
 */
function findCycle(nodes: string[], edges: Map<string, string[]>): string[] {
	const nodeSet = new Set(nodes);
	const visited = new Set<string>();
	const stack: string[] = [];
	const onStack = new Set<string>();

	for (const start of nodes) {
		if (visited.has(start)) continue;
		const cycle = dfsForCycle(start, nodeSet, edges, visited, stack, onStack);
		if (cycle) return cycle;
	}
	return nodes; // fallback
}

function dfsForCycle(
	node: string,
	nodeSet: Set<string>,
	edges: Map<string, string[]>,
	visited: Set<string>,
	stack: string[],
	onStack: Set<string>
): string[] | null {
	visited.add(node);
	stack.push(node);
	onStack.add(node);

	for (const dep of edges.get(node) ?? []) {
		if (!nodeSet.has(dep)) continue;
		if (onStack.has(dep)) {
			const cycleStart = stack.indexOf(dep);
			return [...stack.slice(cycleStart), dep];
		}
		if (!visited.has(dep)) {
			const result = dfsForCycle(dep, nodeSet, edges, visited, stack, onStack);
			if (result) return result;
		}
	}

	stack.pop();
	onStack.delete(node);
	return null;
}

/**
 * BFS from roots to mark reachable modules.
 */
function markReachable(
	modules: Map<string, ResolvedModule>,
	edges: Map<string, string[]>
): void {
	const queue: string[] = [];

	for (const [name, mod] of modules) {
		if (mod.isRoot) {
			mod.reachable = true;
			queue.push(name);
		}
	}

	while (queue.length > 0) {
		const current = queue.shift()!;
		const deps = edges.get(current) ?? [];
		for (const dep of deps) {
			const mod = modules.get(dep);
			if (mod && !mod.reachable) {
				mod.reachable = true;
				queue.push(dep);
			}
		}
	}
}

/**
 * Get all transitive dependencies for a module (in topological order, dependencies first).
 */
export function getTransitiveDeps(
	qualifiedName: string,
	graph: DependencyGraph
): string[] {
	const visited = new Set<string>();
	const result: string[] = [];

	function walk(name: string) {
		if (visited.has(name)) return;
		visited.add(name);
		const deps = graph.edges.get(name) ?? [];
		for (const dep of deps) {
			walk(dep);
		}
		result.push(name);
	}

	const directDeps = graph.edges.get(qualifiedName) ?? [];
	for (const dep of directDeps) {
		walk(dep);
	}

	return result; // topological order: dependencies first
}
