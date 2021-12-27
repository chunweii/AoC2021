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
const math = __importStar(require("mathjs"));
const fs_1 = require("fs");
function getOrientations() {
    let result = [];
    for (let i of [-1, 1]) {
        for (let j of [-1, 1]) {
            for (let perm of [[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]]) {
                let temp = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
                temp[0][perm[0]] = i;
                temp[1][perm[1]] = j;
                temp[2] = math.cross(temp[0], temp[1]).valueOf();
                result.push(math.matrix(temp));
            }
        }
    }
    return result;
}
function checkCommonDistances(unknownScanner, knownScanner, distancesOfKnownScanner) {
    const distancesOfUnknownScanner = distancesSquared[unknownScanner];
    for (let i = 0; i < distancesOfUnknownScanner.length; i++) {
        const toCheck = distancesOfUnknownScanner[i];
        for (let j = 0; j < distancesOfKnownScanner.length; j++) {
            let numberOfCommonDistances = 0;
            const distFromKnownPoint = distancesOfKnownScanner[j];
            toCheck.forEach(x => distFromKnownPoint.has(x) ? numberOfCommonDistances++ : undefined);
            if (numberOfCommonDistances >= 11) {
                correctOrientation(knownScanner, unknownScanner, j, i);
                unknownScanners.delete(unknownScanner);
                knownScanners.push(unknownScanner);
                return;
            }
        }
    }
}
function correctOrientation(knownScanner, unknownScanner, knownBeacon, unknownBeacon) {
    const knownBeaconCoordinates = rawBeaconData[knownScanner][knownBeacon];
    const unknownBeaconCoordinates = rawBeaconData[unknownScanner][unknownBeacon];
    for (const rotationMatrix of allRotationMatrices) {
        const translationVector = math.subtract([knownBeaconCoordinates], math.transpose(math.multiply(rotationMatrix, math.transpose([unknownBeaconCoordinates])))).valueOf()[0];
        const tempArr = [];
        for (let i = 0; i < rawBeaconData[unknownScanner].length; i++) { // check all beacons
            const oldBeaconCoordinates = rawBeaconData[unknownScanner][i];
            const newBeaconCoordinates = math.add([translationVector], math.transpose(math.multiply(rotationMatrix, math.transpose([oldBeaconCoordinates])))).valueOf()[0];
            tempArr.push(newBeaconCoordinates);
        }
        // check for at least 12 overlapping points
        let counter = 0;
        for (const coord of tempArr) {
            for (const goodCoord of rawBeaconData[knownScanner]) {
                if (arrayEqual(coord, goodCoord)) {
                    counter++;
                    break;
                }
            }
        }
        if (counter >= 12) {
            rawBeaconData[unknownScanner] = tempArr;
            scannerLocations[unknownScanner] = translationVector;
            tempArr.forEach(x => allBeacons.add(x.toString()));
            return;
        }
    }
    throw new Error("None of the rotations are valid");
}
function arrayEqual(array1, array2) {
    return array1.length === array2.length && array1.every((value, index) => value === array2[index]);
}
function manhattanDistance(scanner1, scanner2) {
    return Math.abs(scanner1[0] - scanner2[0]) + Math.abs(scanner1[1] - scanner2[1]) + Math.abs(scanner1[2] - scanner2[2]);
}
console.time();
const allRotationMatrices = getOrientations();
const lines = (0, fs_1.readFileSync)(0).toString().trim().split(/\n+/); // STDIN_FILENO = 0
const rawBeaconData = [];
let counter = -1;
for (const line of lines) {
    if (line[4] === "s") {
        rawBeaconData[++counter] = [];
    }
    else {
        const arr = rawBeaconData[counter];
        arr.push(line.split(",").map(x => parseInt(x)));
    }
}
// Fix scanner 0
const scannerLocations = [[0, 0, 0]];
const allBeacons = new Set();
rawBeaconData[0].forEach(x => allBeacons.add(x.toString()));
const distancesSquared = []; // distancesSquared[x][y] is at scanner x and beacon y
for (const beaconsOfAScanner of rawBeaconData) {
    const toPush = [];
    for (let i = 0; i < beaconsOfAScanner.length; i++) {
        const resultSet = new Set();
        const coordinate = beaconsOfAScanner[i];
        for (let j = 0; j < beaconsOfAScanner.length; j++) {
            if (i === j)
                continue;
            const differenceVector = math.subtract(coordinate, beaconsOfAScanner[j]);
            resultSet.add(math.dot(differenceVector, differenceVector));
        }
        toPush.push(resultSet);
    }
    distancesSquared.push(toPush);
}
// check for same distances
const unknownScanners = new Set();
Array.from({ length: rawBeaconData.length - 1 }, (v, k) => k + 1).forEach(x => unknownScanners.add(x));
const knownScanners = [0];
while (unknownScanners.size !== 0) {
    const knownScanner = knownScanners.pop();
    const distancesOfKnownScanner = distancesSquared[knownScanner];
    for (const unknownScanner of unknownScanners) {
        checkCommonDistances(unknownScanner, knownScanner, distancesOfKnownScanner);
    }
}
console.log(allBeacons.size);
let maxDist = 0;
for (const scanner1 of scannerLocations) {
    for (const scanner2 of scannerLocations) {
        maxDist = Math.max(maxDist, manhattanDistance(scanner1, scanner2));
    }
}
console.log(maxDist);
console.timeEnd();
