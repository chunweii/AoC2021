"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
function convertHexToBin(str) {
    function helper(c) {
        return parseInt(c, 16).toString(2).padStart(4, '0');
    }
    let result = '';
    for (const c of str) {
        result += helper(c);
    }
    return result;
}
const input = fs.readFileSync(path.join(__dirname, "input.txt")).toString().trim();
const bits = convertHexToBin(input);
// console.log(bits);
function solvePacket(start, end = bits.length - 1) {
    const typeId = bits.substring(start + 3, start + 6);
    let ptr = start + 6;
    if (typeId === "100") { // literal
        let firstBit = bits[ptr];
        let str = "";
        while (firstBit === '1') {
            str += bits.substring(ptr + 1, ptr + 5);
            ptr += 5;
            firstBit = bits[ptr];
        }
        str += bits.substring(ptr + 1, ptr + 5);
        return { end: ptr + 4, result: parseInt(str, 2) };
    }
    else { // operator
        const op = (typeId === "000" ? (a, b) => a + b
            : typeId === "001" ? (a, b) => a * b
                : typeId === "010" ? (a, b) => Math.min(a, b)
                    : typeId === "011" ? (a, b) => Math.max(a, b)
                        : typeId === "101" ? (a, b) => a > b ? 1 : 0
                            : typeId === "110" ? (a, b) => a < b ? 1 : 0
                                : typeId === "111" ? (a, b) => a === b ? 1 : 0
                                    : (a, b) => 0);
        const lengthId = bits[ptr++];
        if (lengthId === '0') { // next 15 bits is length of sub packets
            const lenOfSubPackets = parseInt(bits.substring(ptr, ptr + 15), 2);
            ptr += 15;
            let tempStart = ptr;
            const limit = ptr + lenOfSubPackets;
            if (tempStart >= limit)
                return { end: limit, result: 0 };
            let tempResult;
            ({ end: tempStart, result: tempResult } = solvePacket(tempStart));
            tempStart++;
            while (tempStart < limit) {
                let x;
                ({ end: tempStart, result: x } = solvePacket(tempStart));
                tempStart++;
                tempResult = op(tempResult, x);
            }
            return { end: limit - 1, result: tempResult };
        }
        else { // next 11 bits is number of subpackets
            const numberOfSubPackets = parseInt(bits.substring(ptr, ptr + 11), 2);
            ptr += 11;
            if (numberOfSubPackets === 0)
                return { end: ptr - 1, result: 0 };
            let tempResult;
            ({ end: ptr, result: tempResult } = solvePacket(ptr));
            ptr++;
            for (let i = 1; i < numberOfSubPackets; i++) {
                let x;
                ({ end: ptr, result: x } = solvePacket(ptr));
                ptr++;
                tempResult = op(tempResult, x);
            }
            return { end: ptr - 1, result: tempResult };
        }
    }
}
console.log(solvePacket(0));
