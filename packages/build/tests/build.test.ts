import { describe, it, expect } from "vitest";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { loadProject } from "../src/config/loader.ts";
import { buildDependencyGraph } from "../src/resolver/graph.ts";
import { generatePremake } from "../src/generator/premake.ts";
import type { IGlobals } from "@orb/premake-ts/scopes/PremakeScope";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const fixtureRoot = resolve(__dirname, "fixtures/project/orb.ts");

const globals: IGlobals = {
	premakeVersion: "5.0.0-beta4",
	targetOs: "windows",
	action: "vs2022",
};

describe("loader", () => {
	it("loads the project and discovers all packages and modules", async () => {
		const project = await loadProject(fixtureRoot);

		expect(project.definition.name).toBe("TestProject");
		expect(project.packages).toHaveLength(2);

		const pkgNames = project.packages.map((p) => p.definition.name);
		expect(pkgNames).toContain("main");
		expect(pkgNames).toContain("thirdparty");

		const mainPkg = project.packages.find((p) => p.definition.name === "main")!;
		const moduleNames = mainPkg.modules.map((m) => m.definition.name);
		expect(moduleNames).toEqual(["core", "app"]);

		const thirdpartyPkg = project.packages.find((p) => p.definition.name === "thirdparty")!;
		expect(thirdpartyPkg.modules).toHaveLength(1);
		expect(thirdpartyPkg.modules[0].definition.name).toBe("mocklib");
		expect(thirdpartyPkg.modules[0].definition.type).toBe("HeaderOnly");
	});
});

describe("resolver", () => {
	it("builds the dependency graph and resolves transitive deps", async () => {
		const project = await loadProject(fixtureRoot);
		const graph = buildDependencyGraph(project);

		expect(graph.modules.size).toBe(3); // core, app, mocklib

		// core depends on thirdparty/mocklib
		const core = graph.modules.get("main/core")!;
		expect(core.resolvedDeps).toEqual(["thirdparty/mocklib"]);

		// app depends on core (bare name resolves within same package)
		const app = graph.modules.get("main/app")!;
		expect(app.resolvedDeps).toEqual(["main/core"]);

		// mocklib has no deps
		const mocklib = graph.modules.get("thirdparty/mocklib")!;
		expect(mocklib.resolvedDeps).toEqual([]);
	});

	it("marks executables as roots and their deps as reachable", async () => {
		const project = await loadProject(fixtureRoot);
		const graph = buildDependencyGraph(project);

		const app = graph.modules.get("main/app")!;
		expect(app.isRoot).toBe(true);
		expect(app.reachable).toBe(true);

		// core is reachable via app
		const core = graph.modules.get("main/core")!;
		expect(core.isRoot).toBe(false);
		expect(core.reachable).toBe(true);

		// mocklib is reachable via core → app
		const mocklib = graph.modules.get("thirdparty/mocklib")!;
		expect(mocklib.reachable).toBe(true);
	});

	it("produces a valid topological order", async () => {
		const project = await loadProject(fixtureRoot);
		const graph = buildDependencyGraph(project);

		const order = graph.topologicalOrder;

		// Kahn's algorithm: 0-in-degree nodes first (dependents before dependencies)
		const mocklibIdx = order.indexOf("thirdparty/mocklib");
		const coreIdx = order.indexOf("main/core");
		const appIdx = order.indexOf("main/app");

		// app has no dependents → first, then core, then mocklib
		expect(appIdx).toBeLessThan(coreIdx);
		expect(coreIdx).toBeLessThan(mocklibIdx);
	});
});

describe("generator", () => {
	it("generates valid premake Lua with workspace and projects", async () => {
		const project = await loadProject(fixtureRoot);
		const graph = buildDependencyGraph(project);

		const lua = generatePremake({
			graph,
			project: project.definition,
			projectRoot: project.projectRoot,
			globals,
		});

		// Workspace
		expect(lua).toContain('workspace "TestProject"');
		expect(lua).toContain('configurations { "Debug", "Release" }');

		// Projects should exist
		expect(lua).toContain('project "core"');
		expect(lua).toContain('project "app"');

		// core is a static lib
		expect(lua).toContain('kind "StaticLib"');
		// app is a console app
		expect(lua).toContain('kind "ConsoleApp"');
	});

	it("includes transitive public includes from dependencies", async () => {
		const project = await loadProject(fixtureRoot);
		const graph = buildDependencyGraph(project);

		const lua = generatePremake({
			graph,
			project: project.definition,
			projectRoot: project.projectRoot,
			globals,
		});

		// core depends on mocklib which has public externalIncludeDirs(".")
		// mocklib.ts lives in thirdparty/, so "." resolves to "thirdparty"
		expect(lua).toContain('externalincludedirs { "thirdparty" }');
	});

	it("auto-links libraries for executables", async () => {
		const project = await loadProject(fixtureRoot);
		const graph = buildDependencyGraph(project);

		const lua = generatePremake({
			graph,
			project: project.definition,
			projectRoot: project.projectRoot,
			globals,
		});

		// app should auto-link core (but not mocklib since it's HeaderOnly)
		expect(lua).toContain('links { "core" }');
		// mocklib should NOT appear in links
		expect(lua).not.toMatch(/links\s*\{[^}]*"mocklib"/);
	});

	it("emits configuration defaults", async () => {
		const project = await loadProject(fixtureRoot);
		const graph = buildDependencyGraph(project);

		const lua = generatePremake({
			graph,
			project: project.definition,
			projectRoot: project.projectRoot,
			globals,
		});

		// Debug config
		expect(lua).toContain('filter "configurations:Debug"');
		expect(lua).toContain('symbols "On"');
		expect(lua).toContain('defines { "DEBUG" }');

		// Release config
		expect(lua).toContain('filter "configurations:Release"');
		expect(lua).toContain('defines { "NDEBUG" }');
		expect(lua).toContain('optimize "Full"');
	});

	it("sets the output location", async () => {
		const project = await loadProject(fixtureRoot);
		const graph = buildDependencyGraph(project);

		const lua = generatePremake({
			graph,
			project: project.definition,
			projectRoot: project.projectRoot,
			globals,
		});

		expect(lua).toContain('location "build/vs2022"');
	});
});
