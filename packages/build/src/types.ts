import type { KindType } from "@orb/premake-ts/scopes";
import type { ProjectScope } from "@orb/premake-ts/scopes";

export type OrbType = KindType|'Package';

export interface IOrbBase {
	type: OrbType;
	name: string;
}

export interface IModule extends IOrbBase {
	type: KindType;
	dependencies?: string[];
	rootDir?: string;
	headerOnly?: boolean;
	public?: (ctx: ProjectScope) => void;
	private?: (ctx: ProjectScope) => void;
	link?: (ctx: ProjectScope) => void;
}

export interface IPackage extends IOrbBase {
	type: 'Package';
	items: Array<string|IModule>;
	author?: string;
	version?: string;
	description?: string;
	license?: string;
}

export function defineLibrary(module: Omit<IModule, 'type'>): IModule {
	return {type: 'StaticLib', ...module};
}

export function defineExecutable(module: Omit<IModule, 'type'|'public'>): IModule {
	return {type: 'ConsoleApp', ...module};
}

export function definePackage(pkg: Omit<IPackage, 'type'>): IPackage {
	return { type: 'Package', ...pkg };
}
