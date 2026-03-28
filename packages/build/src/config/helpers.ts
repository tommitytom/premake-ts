import type { IProject, IPackage, IModule, ModuleKind } from "./schema.ts";

export function defineProject(project: Omit<IProject, "type">): IProject {
	return { type: "Project", ...project };
}

export function definePackage(pkg: Omit<IPackage, "type">): IPackage {
	return { type: "Package", ...pkg };
}

export function defineLibrary(mod: Omit<IModule, "type"> & { type?: "StaticLib" | "SharedLib" }): IModule {
	return { type: mod.type ?? "StaticLib", ...mod };
}

export function defineSharedLibrary(mod: Omit<IModule, "type">): IModule {
	return { type: "SharedLib", ...mod };
}

export function defineHeaderOnly(
	mod: Pick<IModule, "name" | "rootDir" | "public" | "enabled">
): IModule {
	return { type: "HeaderOnly", ...mod };
}

export function defineExecutable(
	mod: Omit<IModule, "type" | "public">
): IModule {
	return { type: "ConsoleApp", ...mod };
}

export function defineWindowedApp(
	mod: Omit<IModule, "type" | "public">
): IModule {
	return { type: "WindowedApp", ...mod };
}
