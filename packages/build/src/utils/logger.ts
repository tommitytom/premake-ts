import chalk from "chalk";

export type LogLevel = "debug" | "info" | "warn" | "error";

let currentLevel: LogLevel = "info";

const levels: Record<LogLevel, number> = { debug: 0, info: 1, warn: 2, error: 3 };

export function setLogLevel(level: LogLevel): void {
	currentLevel = level;
}

function shouldLog(level: LogLevel): boolean {
	return levels[level] >= levels[currentLevel];
}

export function debug(...args: unknown[]): void {
	if (shouldLog("debug")) console.log(chalk.gray("[debug]"), ...args);
}

export function info(...args: unknown[]): void {
	if (shouldLog("info")) console.log(...args);
}

export function warn(...args: unknown[]): void {
	if (shouldLog("warn")) console.warn(chalk.yellow("warning:"), ...args);
}

export function error(...args: unknown[]): void {
	if (shouldLog("error")) console.error(chalk.red("error:"), ...args);
}
