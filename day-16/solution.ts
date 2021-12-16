import * as fs from 'fs';
import * as path from 'path';

function convertHexToBin(str: string) {
    function helper(c: string) {
        return parseInt(c, 16).toString(2).padStart(4, '0');
    }
    let result = '';
    for (const c of str) {
        result += helper(c);
    }
    return result;
}

const input : string = fs.readFileSync(path.join(__dirname, "input.txt")).toString().trim();

const bits : string = convertHexToBin(input);

// console.log(bits);

let sum: number = 0;

function solvePacket(start: number, end: number = bits.length - 1) : number { // returns the true end of the packet
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
    } else { // operator
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
        } else { // next 11 bits is number of subpackets
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