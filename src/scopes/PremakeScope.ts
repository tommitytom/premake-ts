import type { ProjectScope, WorkspaceScope } from "./scopes.ts";

interface ICommand {
	name: string;
	args?: string | string[];
}

export class PremakeScope {
	private _commands: ICommand[] = [];

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
					this.command(prop as string, args.length === 1 ? args[0] : args);
					return proxy as T;
				};
			}
		}) as T;

		return proxy;
	}
}
