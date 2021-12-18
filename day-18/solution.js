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
const snailfishNumber_1 = require("./snailfishNumber");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const input = fs.readFileSync(path.join(__dirname, "input.txt")).toString().trim().split('\n');
function snailfishFromString(str, start, end) {
    if (start === end)
        return parseInt(str[start]);
    if (str[start] !== "[" || str[end] !== "]")
        throw new Error("String should start and end with bracket");
    start++;
    let headEnd = start;
    let numberOfBrackets = 1;
    while (numberOfBrackets >= 1) {
        if (str[headEnd] === "[") {
            numberOfBrackets++;
        }
        else if (str[headEnd] === "]") {
            numberOfBrackets--;
        }
        else if (str[headEnd] === "," && numberOfBrackets === 1) {
            headEnd -= 1;
            break;
        }
        headEnd++;
    }
    const head = snailfishFromString(str, start, headEnd);
    const tail = snailfishFromString(str, headEnd + 2, end - 1);
    return snailfishNumber_1.SnailfishNumber.createSnailfishNumber(head, tail);
}
function explodeLeftmostSnailfish(sf, threshold) {
    if (threshold <= 0) {
        sf.explode();
        return true;
    }
    else {
        if (sf.head instanceof snailfishNumber_1.SnailfishNumber && explodeLeftmostSnailfish(sf.head, threshold - 1))
            return true;
        if (sf.tail instanceof snailfishNumber_1.SnailfishNumber && explodeLeftmostSnailfish(sf.tail, threshold - 1))
            return true;
    }
    return false;
}
function splitLeftmostSnailfish(sf) {
    if (sf.head instanceof Array && sf.head[0] >= 10) {
        sf.split(true);
        return true;
    }
    if (sf.head instanceof snailfishNumber_1.SnailfishNumber && splitLeftmostSnailfish(sf.head))
        return true;
    if (sf.tail instanceof Array && sf.tail[0] >= 10) {
        sf.split(false);
        return true;
    }
    if (sf.tail instanceof snailfishNumber_1.SnailfishNumber && splitLeftmostSnailfish(sf.tail))
        return true;
    return false;
}
function checkSimplifiedSnailfish(sf, limit) {
    if (limit < 0)
        return false;
    if (sf instanceof Array)
        return sf[0] < 10;
    return checkSimplifiedSnailfish(sf.head, limit - 1) && checkSimplifiedSnailfish(sf.tail, limit - 1);
}
const snailFishInput = input.map(str => {
    const result = snailfishFromString(str, 0, str.length - 1);
    if (result instanceof snailfishNumber_1.SnailfishNumber)
        return result;
    else
        throw new Error("Something is wrong with input");
});
const accumulator = (prev, curr) => {
    const result = snailfishNumber_1.SnailfishNumber.createSnailfishNumber(prev, curr);
    while (!checkSimplifiedSnailfish(result, 4)) {
        if (explodeLeftmostSnailfish(result, 4)) {
            continue;
        }
        splitLeftmostSnailfish(result);
    }
    return result;
};
const finalSnailfishNumber = snailFishInput.reduce((p, c) => accumulator(p.getCopy(), c.getCopy()));
console.log(finalSnailfishNumber.toString());
console.log(finalSnailfishNumber.getMagnitude());
let maxMagnitude = 0;
snailFishInput.forEach((v, i) => {
    snailFishInput.forEach((vv, ii) => {
        if (i === ii)
            return;
        maxMagnitude = Math.max(maxMagnitude, accumulator(v.getCopy(), vv.getCopy()).getMagnitude());
    });
});
console.log(maxMagnitude);
