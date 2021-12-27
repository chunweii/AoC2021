"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const lines = (0, fs_1.readFileSync)(0).toString().trim().split(/\n+/); // STDIN_FILENO = 0
const algorithm = lines[0];
let imageMap = new Map(); // true if it is lit (#)
let minX = 0;
let minY = 0;
let maxX = lines.length - 2;
let maxY = lines[1].length - 1;
let defaultBoolean = false;
// load image
for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const mapOfBooleans = new Map();
    for (let j = 0; j < line.length; j++) {
        mapOfBooleans.set(j, line[j] === "#");
    }
    imageMap.set(i - 1, mapOfBooleans);
}
function getNewPixel(x, y) {
    let binaryString = 0;
    for (let i = x - 1; i <= x + 1; i++) {
        const row = imageMap.get(i) || new Map();
        for (let j = y - 1; j <= y + 1; j++) {
            binaryString *= 2;
            let bool = row.get(j);
            if (bool === undefined)
                bool = defaultBoolean;
            binaryString += bool ? 1 : 0;
        }
    }
    return algorithm[binaryString] === "#";
}
for (let i = 0; i < 50; i++) {
    const newImageMap = new Map();
    for (let i = minX - 2; i <= maxX + 2; i++) {
        const mapOfBooleans = new Map();
        for (let j = minY - 2; j <= maxY + 2; j++) {
            mapOfBooleans.set(j, getNewPixel(i, j));
        }
        newImageMap.set(i, mapOfBooleans);
    }
    imageMap = newImageMap;
    minX--;
    minY--;
    maxX++;
    maxY++;
    if (lines[0][0] === "#")
        defaultBoolean = !defaultBoolean;
}
let numberOfPixels = 0;
imageMap.forEach(v => {
    v.forEach(vv => vv ? numberOfPixels++ : undefined);
});
console.log(numberOfPixels);
