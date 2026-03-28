import { existsSync, unlinkSync, writeFileSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import { loadProject } from "./config/loader.ts";
import { resolveOptions } from "./config/options.ts";
import { buildDependencyGraph } from "./resolver/graph.ts";
import { generatePremake } from "./generator/premake.ts";
import { findProjectRoot } from "./utils/paths.ts";
import { dumpGlobals, execPremake } from "@orb/premake-ts/util";
import type { IGlobals } from "@orb/premake-ts/scopes/PremakeScope";
import * as logger from "./utils/logger.ts";
import { parseArgs } from "./cli/args.ts";

async function main() {
	const args = parseArgs(process.argv.slice(2));

	// Find the orb.ts file
	const orbFile = args.file ?? findOrbFile();
	if (!orbFile || !existsSync(orbFile)) {
		logger.error(`Could not find orb.ts. Use --file to specify the path.`);
		process.exit(1);
	}

	const projectRoot = dirname(resolve(orbFile));

	if (args.command === "list") {
		await listDependencies(orbFile);
		return;
	}

	if (args.command === "clean") {
		// TODO: implement clean
		logger.info("Clean not yet implemented.");
		return;
	}

	// generate or build
	const action = args.action;
	if (!action) {
		logger.error("No action specified. Usage: orb generate <action> (e.g., vs2022, gmake2)");
		process.exit(1);
	}

	// Load the project
	const project = await loadProject(orbFile);

	// Resolve options
	let resolvedOpts: Record<string, unknown> = {};
	if (project.definition.options) {
		resolvedOpts = resolveOptions(project.definition.options, args.options ?? {});
	}

	// Build dependency graph
	const graph = buildDependencyGraph(project, resolvedOpts);

	// Get premake globals
	const globals = dumpGlobals(action) as IGlobals;

	// Generate premake Lua
	const lua = generatePremake({
		graph,
		project: project.definition,
		projectRoot: project.projectRoot,
		globals,
		resolvedOptions: resolvedOpts,
	});

	// Write Lua file
	const luaFilePath = join(projectRoot, "premake5.lua");
	writeFileSync(luaFilePath, lua, "utf-8");
	logger.info(`Generated ${luaFilePath}`);

	if (args.emitOnly) return;

	// Run premake
	const premakeBinary = args.premakeBinary ?? "premake5";
	try {
		await execPremake([`--file=${luaFilePath}`, action], premakeBinary);
	} finally {
		// Clean up intermediate Lua file
		if (existsSync(luaFilePath)) {
			unlinkSync(luaFilePath);
		}
	}

	// If build command, invoke the build tool
	if (args.command === "build") {
		// TODO: implement build invocation (msbuild, make, etc.)
		logger.info("Build invocation not yet implemented. Premake files generated successfully.");
	}
}

function findOrbFile(): string | undefined {
	const root = findProjectRoot(process.cwd());
	if (root) return join(root, "orb.ts");
	return undefined;
}

async function listDependencies(orbFile: string) {
	const project = await loadProject(orbFile);
	const graph = buildDependencyGraph(project);

	logger.info(`Project: ${project.definition.name}\n`);

	for (const qualifiedName of graph.topologicalOrder) {
		const mod = graph.modules.get(qualifiedName)!;
		const deps = mod.resolvedDeps;
		const marker = mod.isRoot ? " (root)" : "";
		const reachable = mod.reachable ? "" : " [unreachable]";

		if (deps.length > 0) {
			logger.info(`  ${qualifiedName}${marker}${reachable} → ${deps.join(", ")}`);
		} else {
			logger.info(`  ${qualifiedName}${marker}${reachable}`);
		}
	}
}

main().catch((err) => {
	logger.error(err.message ?? err);
	process.exit(1);
});