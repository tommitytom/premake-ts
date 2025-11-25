import { workspace } from "../src/index.ts";

export default workspace("MyWorkspace", (w) => {
	w.configurations(["Debug", "Release"]);

	w.project("MyProject", (p) => {
		p.toolSet('Clang')

		p
			.kind("ConsoleApp")
			.language("C++")
			.characterset("Unicode")
			.cppdialect("C++23")
			.targetdir("bin/")
			.files(["*.c"])
			.when('configurations:Release', (p) => {
				p.files(["src/release/**.cpp"]);
			});
	});
});
