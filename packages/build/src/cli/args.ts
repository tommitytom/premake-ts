import { Command } from "commander";
import { resolve } from "node:path";

export interface OrbCliArgs {
	command: "generate" | "build" | "list" | "clean";
	action?: string;
	file?: string;
	emitOnly: boolean;
	premakeBinary?: string;
	group?: string;
	config?: string;
	options?: Record<string, unknown>;
}

export function parseArgs(argv: string[]): OrbCliArgs {
	let result: OrbCliArgs = {
		command: "generate",
		emitOnly: false,
		options: {},
	};

	const program = new Command();
	program
		.name("orb")
		.description("Orb Build — modular C++ build system")
		.version("0.1.0");

	program
		.command("generate [action]")
		.description("Generate premake files")
		.option("--file <path>", "Path to orb.ts file")
		.option("--emit-only", "Only emit Lua, don't run premake", false)
		.option("--premake-binary <path>", "Path to premake5 binary")
		.option("--group <name>", "Only generate for a specific build group")
		.action((action, opts) => {
			result.command = "generate";
			result.action = action;
			result.file = opts.file;
			result.emitOnly = opts.emitOnly ?? false;
			result.premakeBinary = opts.premakeBinary;
			result.group = opts.group;
		});

	program
		.command("build [action]")
		.description("Generate and build")
		.option("--file <path>", "Path to orb.ts file")
		.option("--premake-binary <path>", "Path to premake5 binary")
		.option("--config <name>", "Build configuration")
		.option("--group <name>", "Only build a specific build group")
		.action((action, opts) => {
			result.command = "build";
			result.action = action;
			result.file = opts.file;
			result.premakeBinary = opts.premakeBinary;
			result.config = opts.config;
			result.group = opts.group;
		});

	program
		.command("list")
		.description("Print the dependency graph")
		.option("--file <path>", "Path to orb.ts file")
		.action((opts) => {
			result.command = "list";
			result.file = opts.file;
		});

	program
		.command("clean")
		.description("Remove build artifacts")
		.option("--file <path>", "Path to orb.ts file")
		.action((opts) => {
			result.command = "clean";
			result.file = opts.file;
		});

	// Extract custom options (--optionName=value) before commander processes
	const orbOptions: Record<string, unknown> = {};
	const filteredArgv: string[] = [];
	for (const arg of argv) {
		const match = arg.match(/^--(?!file|emit-only|premake-binary|group|config|help|version)([a-zA-Z][a-zA-Z0-9._-]*)=(.+)$/);
		if (match) {
			const key = match[1];
			let value: unknown = match[2];
			// Try to parse as JSON for booleans/numbers
			try { value = JSON.parse(value as string); } catch { }
			orbOptions[key] = value;
		} else {
			filteredArgv.push(arg);
		}
	}

	program.parse(filteredArgv, { from: "user" });
	result.options = orbOptions;

	return result;
}
