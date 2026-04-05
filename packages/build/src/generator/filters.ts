import type { FilterAtom, FilterNot, FilterOr, FilterExpr, FilterArg } from "../config/schema.ts";

export function not(expr: FilterAtom): FilterNot {
	return { kind: "not", expr };
}

export function or(...exprs: FilterAtom[]): FilterOr {
	return { kind: "or", exprs };
}

/**
 * Compiles a FilterArg into premake filter syntax.
 * Returns an array of strings for the premake filter call.
 *
 * Examples:
 *   "system:windows"                        → ["system:windows"]
 *   not("system:windows")                   → ["system:not windows"]
 *   or("system:windows", "system:macosx")   → ["system:windows or system:macosx"]
 *   ["action:gmake*", "toolset:gcc"]        → ["action:gmake*", "toolset:gcc"]
 */
export function compileFilter(arg: FilterArg): string[] {
	if (Array.isArray(arg)) {
		return arg.map(compileSingleExpr);
	}
	return [compileSingleExpr(arg)];
}

function compileSingleExpr(expr: FilterExpr): string {
	if (typeof expr === "string") {
		return expr;
	}
	if (expr.kind === "not") {
		const colonIdx = expr.expr.indexOf(":");
		const category = expr.expr.substring(0, colonIdx);
		const value = expr.expr.substring(colonIdx + 1);
		return `${category}:not ${value}`;
	}
	if (expr.kind === "or") {
		return expr.exprs.join(" or ");
	}
	throw new Error(`Unknown filter expression: ${JSON.stringify(expr)}`);
}
