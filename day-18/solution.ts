import { SnailfishNumber } from "./snailfishNumber";
import * as fs from 'fs';
import * as path from 'path';

const input: string[] = fs.readFileSync(path.join(__dirname, "input.txt")).toString().trim().split('\n');

function snailfishFromString(str: string, start: number, end: number) : SnailfishNumber | number {
    if (start === end) return parseInt(str[start]);
    if (str[start] !== "[" || str[end] !== "]") throw new Error("String should start and end with bracket");
    start++;
    let headEnd = start;
    let numberOfBrackets = 1;
    while (numberOfBrackets >= 1) {
        if (str[headEnd] === "[") {
            numberOfBrackets++;
        } else if (str[headEnd] === "]") {
            numberOfBrackets--;
        } else if (str[headEnd] === "," && numberOfBrackets === 1) {
            headEnd -= 1;
            break;
        }
        headEnd++;
    }
    const head = snailfishFromString(str, start, headEnd);
    const tail = snailfishFromString(str, headEnd + 2, end - 1);
    return SnailfishNumber.createSnailfishNumber(head, tail);
}

function explodeLeftmostSnailfish(sf: SnailfishNumber, threshold: number): boolean {
    if (threshold <= 0) {
        sf.explode();
        return true;
    } else {
        if (sf.head instanceof SnailfishNumber && explodeLeftmostSnailfish(sf.head, threshold - 1)) return true;
        if (sf.tail instanceof SnailfishNumber && explodeLeftmostSnailfish(sf.tail, threshold - 1)) return true;
    }
    return false;
}

function splitLeftmostSnailfish(sf: SnailfishNumber): boolean {
    if (sf.head instanceof Array && sf.head[0] >= 10) {
        sf.split(true);
        return true;
    }
    if (sf.head instanceof SnailfishNumber && splitLeftmostSnailfish(sf.head)) return true;
    if (sf.tail instanceof Array && sf.tail[0] >= 10) {
        sf.split(false);
        return true;
    }
    if (sf.tail instanceof SnailfishNumber && splitLeftmostSnailfish(sf.tail)) return true;
    return false;
}

function checkSimplifiedSnailfish(sf: SnailfishNumber | number[], limit: number) : boolean {
    if (limit < 0) return false;
    if (sf instanceof Array) return sf[0] < 10;
    return checkSimplifiedSnailfish(sf.head, limit - 1) && checkSimplifiedSnailfish(sf.tail, limit - 1);
}

const snailFishInput: SnailfishNumber[] = input.map(str => {
    const result = snailfishFromString(str, 0, str.length - 1);
    if (result instanceof SnailfishNumber) return result;
    else throw new Error("Something is wrong with input");
});

const accumulator = (prev: SnailfishNumber | number, curr: SnailfishNumber | number) => {
    const result = SnailfishNumber.createSnailfishNumber(prev, curr);
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
        if (i === ii) return;
        maxMagnitude = Math.max(maxMagnitude, accumulator(v.getCopy(), vv.getCopy()).getMagnitude());
    });
});

console.log(maxMagnitude);