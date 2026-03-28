import { describe, it, expect } from "vitest";
import { PremakeScope, type IGlobals } from "../src/scopes/PremakeScope.ts";
import type { WorkspaceScope, ProjectScope } from "../src/scopes/scopes.ts";
import { generate } from "../src/generator.ts";

const globals: IGlobals = {
	premakeVersion: "5.0.0-beta4",
	targetOs: "windows",
	action: "vs2022",
};

describe("premake-ts generator", () => {
	it("generates a basic workspace with one project", () => {
		const scope = new PremakeScope(globals);
		scope.command("workspace", "TestWorkspace");
		const w = scope.createProxy<WorkspaceScope>();

		w.configurations("Debug", "Release");

		w.project("TestApp", (p: ProjectScope) => {
			p.kind("ConsoleApp");
			p.language("C++");
			p.files("*.cpp", "*.h");
		});

		const lua = generate(scope);

		expect(lua).toContain('workspace "TestWorkspace"');
		expect(lua).toContain('configurations { "Debug", "Release" }');
		expect(lua).toContain('project "TestApp"');
		expect(lua).toContain('kind "ConsoleApp"');
		expect(lua).toContain('language "C++"');
		expect(lua).toContain('files { "*.cpp", "*.h" }');
	});

	it("generates filter blocks from when()", () => {
		const scope = new PremakeScope(globals);
		scope.command("workspace", "FilterTest");
		const w = scope.createProxy<WorkspaceScope>();

		w.configurations("Debug", "Release");
		w.project("App", (p: ProjectScope) => {
			p.kind("ConsoleApp");
			p.language("C++");
			p.when("configurations:Debug", (inner: ProjectScope) => {
				inner.defines("DEBUG");
				inner.symbols("On");
			});
			p.when("configurations:Release", (inner: ProjectScope) => {
				inner.defines("NDEBUG");
				inner.optimize("Full");
			});
		});

		const lua = generate(scope);

		expect(lua).toContain('filter "configurations:Debug"');
		expect(lua).toContain('defines { "DEBUG" }');
		expect(lua).toContain('symbols "On"');
		expect(lua).toContain('filter "configurations:Release"');
		expect(lua).toContain('defines { "NDEBUG" }');
		expect(lua).toContain('optimize "Full"');
		// filter blocks should be closed
		expect(lua).toContain("filter {}");
	});

	it("generates multiple projects in a workspace", () => {
		const scope = new PremakeScope(globals);
		scope.command("workspace", "MultiProject");
		const w = scope.createProxy<WorkspaceScope>();
		w.configurations("Debug", "Release");

		w.project("CoreLib", (p: ProjectScope) => {
			p.kind("StaticLib");
			p.language("C++");
			p.files("math.cpp", "math.h");
		});

		w.project("App", (p: ProjectScope) => {
			p.kind("ConsoleApp");
			p.language("C++");
			p.files("main.cpp");
			p.links("CoreLib");
		});

		const lua = generate(scope);

		expect(lua).toContain('project "CoreLib"');
		expect(lua).toContain('kind "StaticLib"');
		expect(lua).toContain('project "App"');
		expect(lua).toContain('kind "ConsoleApp"');
		expect(lua).toContain('links { "CoreLib" }');
	});

	it("exposes globals through the proxy", () => {
		const scope = new PremakeScope(globals);
		const proxy = scope.createProxy<WorkspaceScope>();

		expect(proxy.action).toBe("vs2022");
		expect(proxy.premakeVersion).toBe("5.0.0-beta4");
		expect(proxy.targetOs).toBe("windows");
	});
});
