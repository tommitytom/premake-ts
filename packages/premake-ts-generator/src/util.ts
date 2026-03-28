import { spawn } from 'node:child_process';

export function execPremake(args: string[], binaryPath: string = 'premake5'): Promise<number> {
	return new Promise((resolve, reject) => {
		const premake = spawn(binaryPath, args, {
			stdio: 'inherit',
			shell: true
		});

		premake.on('close', (code) => {
			if (code === 0) {
				resolve(code);
			} else {
				reject(new Error(`premake exited with code ${code}. Args: ${args.join(' ')}`));
			}
		});

		premake.on('error', (error) => {
			reject(error);
		});
	});
}
