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
exports.clear = exports.confirm = exports.menu = exports.expect = exports.question = exports.writeline = exports.write = void 0;
const readline = __importStar(require("readline"));
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
function write(str) {
    process.stdout.write(str);
}
exports.write = write;
function writeline(str) {
    process.stdout.write(str + "\n");
}
exports.writeline = writeline;
function question(q) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((res, rej) => {
            rl.question(q + " ", (ans) => {
                res(ans);
            });
        });
    });
}
exports.question = question;
function expect(expectedInput) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((res) => {
            process.stdin.addListener("data", (data) => {
                const input = data.toString();
                if (expectedInput.includes(input)) {
                    res(input);
                    process.stdin.removeAllListeners("data");
                }
            });
        });
    });
}
exports.expect = expect;
function menu(heading, options, printOptions = true) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((res, rej) => {
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
                }
                catch (_a) { }
            });
        });
    });
}
exports.menu = menu;
function confirm(msg) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((res) => {
            writeline(msg || "Are you sure? (y)");
            process.stdin.addListener("data", (buffer) => {
                const ans = buffer.toString().toLowerCase();
                process.stdout.clearLine(0);
                process.stdout.cursorTo(0);
                if (ans === "n" || ans === "no") {
                    res(false);
                }
                else
                    res(true);
                process.stdin.removeAllListeners("data");
            });
        });
    });
}
exports.confirm = confirm;
function clear() {
    return __awaiter(this, void 0, void 0, function* () {
        function clearLine() {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise((res) => process.stdout.clearLine(0, res));
            });
        }
        function cursorTo(y) {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise((res) => process.stdout.cursorTo(0, y, res));
            });
        }
        for (let i = process.stdout.rows - 1; i >= 0; i--) {
            yield cursorTo(i);
            yield clearLine();
        }
    });
}
exports.clear = clear;
