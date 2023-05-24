import * as cctl from "./consolectl";

const lines = {
	cross: "┼",
	vertical: "│",
	horizontal: "─",
};
export type XOCell = "x" | "o" | number;
export const STARTING_CELLS: XOCell[][] = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
];

function _flattenCells(cells: XOCell[][]): XOCell[] {
	return cells.reduce((p, n) => [...p, ...n], []);
}
export function tableFilled(cells: XOCell[][]): boolean {
	return _flattenCells(cells).every((cell) => cell === "x" || cell === "o");
}

export function buildTable(cells: XOCell[][]) {
	const [frst, mdl, last] = cells;
	cctl.writeline(" " + frst.join(` ${lines.vertical} `));
	cctl.writeline(
		[
			lines.horizontal.repeat(3),
			lines.horizontal.repeat(3),
			lines.horizontal.repeat(3),
		].join(lines.cross)
	);
	cctl.writeline(" " + mdl.join(` ${lines.vertical} `));
	cctl.writeline(
		[
			lines.horizontal.repeat(3),
			lines.horizontal.repeat(3),
			lines.horizontal.repeat(3),
		].join(lines.cross)
	);
	cctl.writeline(" " + last.join(` ${lines.vertical} `));
}

export async function handleTurn(cells: XOCell[][], turn: "x" | "o") {
	const availableCells = _flattenCells(cells)
		.map((v) => v.toString())
		.filter((v) => v !== "x" && v !== "y");
	const chosenCell = parseInt(await cctl.expect(availableCells));
	const row = Math.floor(chosenCell / 3);
	const idx = chosenCell % 3;
	cells[row][idx] = turn;
}

function _checkAdjacency(cells: XOCell[][], v: "x" | "o") {
	const ADJACENCY_CHAINS = [
		[
			[2, 0],
			[1, 1],
			[0, 2],
		], // Diagonals
		[
			[0, 0],
			[1, 1],
			[2, 2],
		], // Diagonals
		[
			[0, 0],
			[0, 1],
			[0, 2],
		], // First row
		[
			[1, 0],
			[1, 1],
			[1, 2],
		], // Second row
		[
			[2, 0],
			[2, 1],
			[2, 2],
		], // Third row
		[
			[0, 0],
			[1, 0],
			[2, 0],
		], // First column
		[
			[0, 1],
			[1, 1],
			[2, 1],
		], // Second column
		[
			[0, 2],
			[1, 2],
			[2, 2],
		], // Third column
	];
	const resolvedChains = ADJACENCY_CHAINS.map((chain) =>
		chain.map(([i, j]) => cells[i][j])
	);
	return resolvedChains.some((chain) => chain.every((p) => p === v));
}

export function winner(cells: XOCell[][]): "x" | "o" | null {
	if (_checkAdjacency(cells, "x")) return "x";
	if (_checkAdjacency(cells, "o")) return "o";
	return null;
}
