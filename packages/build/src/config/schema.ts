import { z } from "zod";

// ============================================================================
// Enums and Literal Types
// ============================================================================

export type ModuleKind =
	| "StaticLib"
	| "SharedLib"
	| "ConsoleApp"
	| "WindowedApp"
	| "HeaderOnly";

export type OrbEntityType = "Project" | "Package" | ModuleKind;

// ============================================================================
// Filter System
// ============================================================================

export type FilterCategory =
	| "architecture"
	| "configurations"
	| "files"
	| "kind"
	| "language"
	| "options"
	| "platforms"
	| "system"
	| "tags"
	| "toolset";

export type FilterAtom = `${FilterCategory}:${string}`;

export interface FilterNot {
	kind: "not";
	expr: FilterAtom;
}

export interface FilterOr {
	kind: "or";
	exprs: FilterAtom[];
}

export type FilterExpr = FilterAtom | FilterNot | FilterOr;

export type FilterArg = FilterExpr | FilterExpr[];

// ============================================================================
// Module Scope
// ============================================================================

export interface ModuleScope {
	files(...patterns: string[]): void;
	removeFiles(...patterns: string[]): void;

	includeDirs(...dirs: string[]): void;
	externalIncludeDirs(...dirs: string[]): void;

	defines(...defs: string[]): void;
	undefines(...defs: string[]): void;

	links(...libs: string[]): void;
	libDirs(...dirs: string[]): void;

	buildOptions(...opts: string[]): void;
	linkOptions(...opts: string[]): void;

	warnings(level: "Off" | "Default" | "High" | "Extra" | "Everything"): void;
	disableWarnings(...ids: string[]): void;
	fatalWarnings(enabled: boolean): void;

	optimize(level: "Off" | "Debug" | "On" | "Size" | "Speed" | "Full"): void;
	symbols(mode: "Off" | "On" | "FastLink" | "Full"): void;
	runtime(mode: "Debug" | "Release"): void;
	staticRuntime(mode: "Off" | "On"): void;

	cppDialect(version: string): void;
	cDialect(version: string): void;

	when(conditions: FilterArg, fn: (ctx: ModuleScope) => void): void;

	targetDir(dir: string): void;
	objDir(dir: string): void;

	moduleFiles(...patterns: string[]): void;
	moduleExports(...moduleNames: string[]): void;

	characterSet(set: "Default" | "Unicode" | "MBCS"): void;
	flags(...flags: string[]): void;

	raw(luaCode: string): void;
}

// ============================================================================
// Module Definition
// ============================================================================

export type DependencyRef =
	| string
	| { name: string; optional?: boolean };

export interface IModule {
	type: ModuleKind;
	name: string;
	rootDir?: string;
	dependencies?: DependencyRef[] | ((opts: any) => DependencyRef[]);
	autoLink?: boolean;
	enabled?: (opts: any) => boolean;
	public?: (ctx: ModuleScope, opts?: any) => void;
	private?: (ctx: ModuleScope, opts?: any) => void;
	link?: (ctx: ModuleScope, opts?: any) => void;
}

// ============================================================================
// Package Definition
// ============================================================================

export interface IPackage {
	type: "Package";
	name: string;
	items: Array<string | IModule>;
	author?: string;
	version?: string;
	description?: string;
	license?: string;
}

// ============================================================================
// External Dependencies
// ============================================================================

export interface IExternalDep {
	git?: string;
	ref?: string;
	registry?: string;
	build?: string;
	strip?: string[];
	destination?: string;
	vendored?: boolean;
}

// ============================================================================
// Build Strategy
// ============================================================================

export interface IBuildGroup {
	packages: string[];
	output?: string;
	linkFrom?: string[];
}

export type BuildStrategy =
	| "monolithic"
	| {
		mode: "grouped";
		groups: Record<string, IBuildGroup>;
		default?: string[];
	};

// ============================================================================
// Configuration Defaults
// ============================================================================

export interface IConfigDefaults {
	configurations?: string[];
	configurationDefaults?: Record<string, (ctx: ModuleScope) => void>;
	cppDialect?: string;
	characterSet?: "Default" | "Unicode" | "MBCS";
	action?: string;
	msvcRuntime?: "dynamic" | "static";
	libraryType?: "StaticLib" | "SharedLib";
}

// ============================================================================
// Project Definition
// ============================================================================

export interface IProject {
	type: "Project";
	name: string;
	packages: Array<string | IPackage>;
	dependencies?: Record<string, IExternalDep>;
	defaults?: IConfigDefaults;
	strategy?: BuildStrategy;
	options?: Record<string, {
		schema: z.ZodType<any>;
		description: string;
	}>;
}
