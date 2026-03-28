import { defineHeaderOnly } from "../../../../src/index.ts";

export default defineHeaderOnly({
	name: "mocklib",
	public(ctx) {
		ctx.externalIncludeDirs(".");
	},
});
