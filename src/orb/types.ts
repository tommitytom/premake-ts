import type { KindType } from "../scopes/generated/ConfigScope.generated.ts";
import type { ProjectScope } from "../scopes/scopes.ts";

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

export function defineLibrary(module: Omit<IModule, 'type'>): IModule {
	return {type: 'StaticLib', ...module};
}

export function defineExecutable(module: Omit<IModule, 'type'|'public'>): IModule {
	return {type: 'ConsoleApp', ...module};
}

export interface IPackage extends IOrbBase {
	type: 'Package';
	items: string[];
	author?: string;
	version?: string;
	description?: string;
	license?: string;
}

export function definePackage(pkg: Omit<IPackage, 'type'>): IPackage {
	return { type: 'Package', ...pkg };
}
