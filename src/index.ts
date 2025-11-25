import { PremakeScope } from "./scopes/PremakeScope.ts";
import type { WorkspaceScope } from "./scopes/scopes.ts";

export function workspace(name: string, func: (scope: WorkspaceScope) => void) {
	const scope = new PremakeScope();
	scope.command("workspace", name);
	func(scope.createProxy<WorkspaceScope>());
	return scope;
}
