// Public API — re-exports for user orb.ts files
export {
	defineProject,
	definePackage,
	defineLibrary,
	defineSharedLibrary,
	defineHeaderOnly,
	defineExecutable,
	defineWindowedApp,
} from "./config/helpers.ts";

export type {
	IProject,
	IPackage,
	IModule,
	ModuleKind,
	ModuleScope,
	DependencyRef,
	IExternalDep,
	IConfigDefaults,
	BuildStrategy,
	FilterAtom,
	FilterArg,
	FilterExpr,
} from "./config/schema.ts";

export { not, or } from "./generator/filters.ts";
