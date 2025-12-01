import { workspace } from "../src/generator/index.ts";

export default workspace("MyWorkspace", (w) => {
	w.configurations("Debug", "Release");

	w.project("MyProject", (p) => {
		p.kind("ConsoleApp")
		p.language("C++")
		p.characterSet("MBCS")
		p.cppDialect("C++23")
		p.targetDir("bin/")
		p.files("*.c")
		p.when('configurations:Release', (p) => {
			p.files("src/release/**.cpp");
		});
	});
});

