import { workspace } from "../src/generator/index.ts";

export default workspace("MyWorkspace", (w) => {
	w.configurations(["Debug", "Release"]);

	w.project("MyProject", (p) => {
		p
			.kind("ConsoleApp")
			.language("C++")
			.characterSet("MBCS")
			.cppDialect("C++23")
			.targetDir("bin/")
			.files("*.c")
			.when('configurations:Release', (p) => {
				p.files("src/release/**.cpp");
			});
	});
});
