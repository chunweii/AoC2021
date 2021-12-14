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
let lines;
fs.readFile(path.join(__dirname, "input.txt"), (err, data) => {
    if (err)
        throw err;
    lines = data.toString().trim().split('\n');
    let currentLine = lines[0];
    const firstChar = currentLine.charAt(0);
    const lastChar = currentLine.charAt(currentLine.length - 1);
    let currentLinePairMap = new Map();
    const emptyLinePairMap = new Map();
    const mapOfPolymers = new Map();
    for (let i = 2; i < lines.length; ++i) {
        let arr = lines[i].split(" -> ");
        mapOfPolymers.set(arr[0], arr[1]);
        emptyLinePairMap.set(arr[0], 0);
    }
    emptyLinePairMap.forEach((v, k, m) => currentLinePairMap.set(k, v));
    for (let i = 0; i < currentLine.length - 1; i++) {
        const str = currentLine.charAt(i) + currentLine.charAt(i + 1);
        currentLinePairMap.set(str, (currentLinePairMap.get(str) || 0) + 1);
    }
    // for (const [key, value] of currentLinePairMap) {
    //     console.log(key + " " + value);
    // }
    // mapOfPolymers.forEach((v, k, m) => console.log(k + " " + v));
    for (let i = 0; i < 40; i++) {
        const tempMap = new Map();
        emptyLinePairMap.forEach((v, k, m) => tempMap.set(k, v));
        for (const [key, value] of currentLinePairMap) {
            if (value == 0)
                continue;
            const newElement = mapOfPolymers.get(key);
            if (newElement != undefined) {
                const str1 = key.charAt(0) + newElement;
                const str2 = newElement + key.charAt(1);
                tempMap.set(str1, (tempMap.get(str1) || 0) + value);
                tempMap.set(str2, (tempMap.get(str2) || 0) + value);
            }
            else {
                tempMap.set(key, (tempMap.get(key) || 0) + value);
            }
        }
        currentLinePairMap = tempMap;
    }
    const freqTable = new Map();
    freqTable.set(lastChar, 1);
    freqTable.set(firstChar, 1);
    for (const [key, value] of currentLinePairMap) {
        // console.log(key + " " + value);
        freqTable.set(key.charAt(0), (freqTable.get(key.charAt(0)) || 0) + value);
        freqTable.set(key.charAt(1), (freqTable.get(key.charAt(1)) || 0) + value);
    }
    for (const [key, value] of freqTable) {
        freqTable.set(key, value / 2);
    }
    console.log(Math.max(...freqTable.values()) - Math.min(...freqTable.values()));
});
