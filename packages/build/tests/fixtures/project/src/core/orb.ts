import { defineLibrary } from "../../../../../src/index.ts";

export default defineLibrary({
	name: "core",
	dependencies: ["thirdparty/mocklib"],
	private(ctx) {
		ctx.files("*.cpp", "*.h");
	},
	public(ctx) {
		ctx.includeDirs(".");
	},
});
