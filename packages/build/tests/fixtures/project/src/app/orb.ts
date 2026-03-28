import { defineExecutable } from "../../../../../src/index.ts";

export default defineExecutable({
	name: "app",
	dependencies: ["core"],
	private(ctx) {
		ctx.files("*.cpp");
	},
});
