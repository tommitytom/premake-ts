import { defineProject } from "../../../src/index.ts";

export default defineProject({
	name: "TestProject",
	packages: ["src", "thirdparty"],
	defaults: {
		configurations: ["Debug", "Release"],
		cppDialect: "C++20",
		characterSet: "Unicode",
		configurationDefaults: {
			Debug: (ctx) => {
				ctx.symbols("On");
				ctx.optimize("Debug");
				ctx.defines("DEBUG");
			},
			Release: (ctx) => {
				ctx.symbols("On");
				ctx.optimize("Full");
				ctx.defines("NDEBUG");
			},
		},
	},
});
