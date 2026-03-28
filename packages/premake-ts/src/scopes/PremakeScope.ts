import type { ProjectScope, WorkspaceScope } from "./scopes.ts";
import fields from "../../data/fields.json" with { type: "json" };

export interface IGlobals {
	premakeVersion: string;
	targetOs: string;
	action: string;
}

interface ICommand {
	name: string;
	args?: string | string[];
}

export class PremakeScope {
	private _commands: ICommand[] = [];
	private _globals: IGlobals;

	constructor(globals: IGlobals) {
		this._globals = globals;
	}

	get action(): string {
		return this._globals.action;
	}

	get premakeVersion(): string {
		return this._globals.premakeVersion;
	}

	get targetOs(): string {
		return this._globals.targetOs;
	}

	addCommands(commands: ICommand[]) {
		this._commands.push(...commands);
	}

	command(name: string, args?: string | string[]) {
		this._commands.push({ name, args });
	}

	project(name: string, func: (scope: ProjectScope) => void) {
		this.command("project", name);
		func(this.createProxy<ProjectScope>());
		this.command("project");
		return this;
	}

	group(name: string, func: (scope: Omit<WorkspaceScope, 'group'>) => void) {
		this.command("group", name);
		func(this.createProxy<Omit<WorkspaceScope, 'group'>>());
		this.command("group");
		return this;
	}

	usage(name: string, func: (scope: Omit<WorkspaceScope, 'usage'>) => void) {
		this.command("usage", name);
		func(this.createProxy<Omit<WorkspaceScope, 'usage'>>());
		this.command("usage");
		return this;
	}

	when(condition: string|string[], func: (scope: ProjectScope) => void) {
		this.command("when", condition);
		func(this.createProxy<ProjectScope>());
		this.command("when");
		return this;
	}

	getCommands(): ICommand[] {
		return this._commands;
	}

	// Create a typed proxy for any interface
	createProxy<T>(): T {
		const proxy = new Proxy(this as any, {
			get: (target, prop) => {
				// If the property exists on the actual object, return it (bound)
				if (prop in target) {
					const value = target[prop];
					return typeof value === 'function' ? value.bind(target) : value;
				}

				// Otherwise, create a function that calls command()
				return (...args: any[]) => {
					let fieldName = prop.toString().toLowerCase();
					const isRemover = fieldName.startsWith("remove");
					if (isRemover) fieldName = fieldName.substring(6);

					const field = fields.find(f => f.name === fieldName)!;

					if (field.kind?.startsWith('list:')) {
						this.command(prop as string, args);
					} else {
						this.command(prop as string, args[0]);
					}

					return proxy as T;
				};
			}
		}) as T;

		return proxy;
	}
}
