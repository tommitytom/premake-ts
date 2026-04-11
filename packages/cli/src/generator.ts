import { PremakeScope } from "./premake-scope.js";

const RENAME_COMMANDS = new Map<string, string>([["when", "filter"]]);
const SCOPED_COMMANDS = new Set(["workspace", "project", "filter", "group", "usage"]);

function sanitizeCommand(cmd: string): string {
	if (RENAME_COMMANDS.has(cmd)) {
		return RENAME_COMMANDS.get(cmd)!;
	}

	return cmd;
}

function formatArgs(arg: string | string[]): string {
	if (Array.isArray(arg)) {
		return '{ ' + arg.map(a => `"${a}"`).join(", ") + ' }';
	}
	return `"${arg}"`;
}

export function generate(scope: PremakeScope): string {
	const commands = scope.getCommands();

	let output: string[] = [];
	let indent = 0;

	for (const cmd of commands) {
		let cmdName = sanitizeCommand(cmd.name);
		const isScopedCmd = SCOPED_COMMANDS.has(cmdName);

		if (isScopedCmd && cmd.args === undefined) {
			--indent;

			if (cmdName === 'filter') {
				output.push(`${"\t".repeat(indent)}filter {}`);
			} else if (cmdName === 'usage') {
				output.push(`${"\t".repeat(indent)}${cmdName} "PRIVATE"`);
			} else if (cmdName === 'group') {
				output.push(`${"\t".repeat(indent)}${cmdName} ""`);
			}
		} else {
			output.push(`${"\t".repeat(indent)}${cmdName.toLowerCase()} ${formatArgs(cmd.args!)}`);

			if (isScopedCmd) {
				++indent;
			}
		}
	}

	return output.join("\n");
}
