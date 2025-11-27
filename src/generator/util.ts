import { spawn } from 'node:child_process';

export function runPremake(args: string[]): Promise<number> {
	return new Promise((resolve, reject) => {
		const premake = spawn('premake5', args, {
			stdio: 'inherit',
			shell: true
		});

		premake.on('close', (code) => {
			if (code === 0) {
				resolve(code);
			} else {
				reject(new Error(`premake exited with code ${code}`));
			}
		});

		premake.on('error', (error) => {
			reject(error);
		});
	});
}
