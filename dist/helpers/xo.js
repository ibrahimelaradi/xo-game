"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.winner = exports.handleTurn = exports.buildTable = exports.tableFilled = exports.STARTING_CELLS = void 0;
const cctl = __importStar(require("./consolectl"));
const lines = {
    cross: "┼",
    vertical: "│",
    horizontal: "─",
};
exports.STARTING_CELLS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
];
function _flattenCells(cells) {
    return cells.reduce((p, n) => [...p, ...n], []);
}
function tableFilled(cells) {
    return _flattenCells(cells).every((cell) => cell === "x" || cell === "o");
}
exports.tableFilled = tableFilled;
function buildTable(cells) {
    const [frst, mdl, last] = cells;
    cctl.writeline(" " + frst.join(` ${lines.vertical} `));
    cctl.writeline([
        lines.horizontal.repeat(3),
        lines.horizontal.repeat(3),
        lines.horizontal.repeat(3),
    ].join(lines.cross));
    cctl.writeline(" " + mdl.join(` ${lines.vertical} `));
    cctl.writeline([
        lines.horizontal.repeat(3),
        lines.horizontal.repeat(3),
        lines.horizontal.repeat(3),
    ].join(lines.cross));
    cctl.writeline(" " + last.join(` ${lines.vertical} `));
}
exports.buildTable = buildTable;
function handleTurn(cells, turn) {
    return __awaiter(this, void 0, void 0, function* () {
        const availableCells = _flattenCells(cells)
            .map((v) => v.toString())
            .filter((v) => v !== "x" && v !== "y");
        const chosenCell = parseInt(yield cctl.expect(availableCells));
        const row = Math.floor(chosenCell / 3);
        const idx = chosenCell % 3;
        cells[row][idx] = turn;
    });
}
exports.handleTurn = handleTurn;
function _checkAdjacency(cells, v) {
    const ADJACENCY_CHAINS = [
        [
            [2, 0],
            [1, 1],
            [0, 2],
        ],
        [
            [0, 0],
            [1, 1],
            [2, 2],
        ],
        [
            [0, 0],
            [0, 1],
            [0, 2],
        ],
        [
            [1, 0],
            [1, 1],
            [1, 2],
        ],
        [
            [2, 0],
            [2, 1],
            [2, 2],
        ],
        [
            [0, 0],
            [1, 0],
            [2, 0],
        ],
        [
            [0, 1],
            [1, 1],
            [2, 1],
        ],
        [
            [0, 2],
            [1, 2],
            [2, 2],
        ], // Third column
    ];
    const resolvedChains = ADJACENCY_CHAINS.map((chain) => chain.map(([i, j]) => cells[i][j]));
    return resolvedChains.some((chain) => chain.every((p) => p === v));
}
function winner(cells) {
    if (_checkAdjacency(cells, "x"))
        return "x";
    if (_checkAdjacency(cells, "o"))
        return "o";
    return null;
}
exports.winner = winner;
