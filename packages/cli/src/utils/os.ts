import { statSync } from "fs";

export function isFile(path: string): boolean {
	return statSync(path).isFile();
}
