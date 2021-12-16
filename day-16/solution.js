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
let sum = 0;
function solvePacket(start, end = bits.length - 1) {
    sum += parseInt(bits.substring(start, start + 3), 2); // version number
    const typeId = bits.substring(start + 3, start + 6);
    let ptr = start + 6;
    if (typeId === "100") { // literal
        let firstBit = bits[ptr];
        while (firstBit === '1') {
            ptr += 5;
            firstBit = bits[ptr];
        }
        return ptr + 4;
    }
    else { // operator
        const lengthId = bits[ptr++];
        if (lengthId === '0') { // next 15 bits is length of sub packets
            const lenOfSubPackets = parseInt(bits.substring(ptr, ptr + 15), 2);
            ptr += 15;
            let tempStart = ptr;
            const limit = ptr + lenOfSubPackets;
            while (tempStart < limit) {
                tempStart = solvePacket(tempStart) + 1;
            }
            return limit - 1;
        }
        else { // next 11 bits is number of subpackets
            const numberOfSubPackets = parseInt(bits.substring(ptr, ptr + 11), 2);
            ptr += 11;
            for (let i = 0; i < numberOfSubPackets; i++) {
                ptr = solvePacket(ptr) + 1;
            }
            return ptr - 1;
        }
    }
}
solvePacket(0);
console.log(sum);
