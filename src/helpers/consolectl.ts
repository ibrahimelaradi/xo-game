import * as readline from "readline";

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

export function write(str: string) {
	process.stdout.write(str);
}
export function writeline(str: string) {
	process.stdout.write(str + "\n");
}
export async function question(q: string): Promise<string> {
	return new Promise<string>((res, rej) => {
		rl.question(q + " ", (ans) => {
			res(ans);
		});
	});
}
export async function expect(expectedInput: string[]): Promise<string> {
	return new Promise<string>((res) => {
		process.stdin.addListener("data", (data) => {
			const input = data.toString();
			if (expectedInput.includes(input)) {
				res(input);
				process.stdin.removeAllListeners("data");
			}
		});
	});
}
export async function menu(
	heading: string,
	options: string[],
	printOptions: boolean = true
): Promise<[number, string]> {
	return new Promise<[number, string]>((res, rej) => {
		writeline(heading);
		if (printOptions)
			options.forEach((option, i) => {
				writeline(`${i}) ${option}`);
			});
		process.stdin.addListener("data", (buffer) => {
			const option = buffer.toString();
			process.stdout.clearLine(0);
			process.stdout.cursorTo(0);
			try {
				const numericOption = parseInt(option);
				if (numericOption < options.length) {
					res([numericOption, options[numericOption]]);
					process.stdin.removeAllListeners("data");
				}
			} catch {}
		});
	});
}
export async function confirm(msg?: string): Promise<boolean> {
	return new Promise<boolean>((res) => {
		writeline(msg || "Are you sure? (y)");
		process.stdin.addListener("data", (buffer) => {
			const ans = buffer.toString().toLowerCase();
			process.stdout.clearLine(0);
			process.stdout.cursorTo(0);
			if (ans === "n" || ans === "no") {
				res(false);
			} else res(true);
			process.stdin.removeAllListeners("data");
		});
	});
}
export async function clear() {
	async function clearLine() {
		return new Promise<void>((res) => process.stdout.clearLine(0, res));
	}
	async function cursorTo(y: number) {
		return new Promise<void>((res) => process.stdout.cursorTo(0, y, res));
	}
	for (let i = process.stdout.rows - 1; i >= 0; i--) {
		await cursorTo(i);
		await clearLine();
	}
}
