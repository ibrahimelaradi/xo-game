import * as cctl from "./helpers/consolectl";
import * as xo from "./helpers/xo";

(async () => {
	let cells = xo.STARTING_CELLS;
	let playerTurn: "x" | "o" = "x";
	do {
		await cctl.clear();
		await xo.buildTable(cells);

		if (xo.tableFilled(cells)) {
			cctl.writeline("Draw!");
			process.exit(0);
		}

		const winner = xo.winner(cells);
		if (winner) {
			cctl.writeline(`${winner} won!`);
			process.exit(0);
		}

		await xo.handleTurn(cells, playerTurn);
		playerTurn = playerTurn === "x" ? "o" : "x";
	} while (true);
})();
