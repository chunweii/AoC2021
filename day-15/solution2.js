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
const graph_1 = require("../ts-modules/graph");
const input = fs.readFileSync(path.join(__dirname, "input.txt")).toString().trim().split("\n");
const rows = input.length * 5;
const cols = input[0].length * 5;
const inputRows = input.length;
const inputCols = input[0].length;
function getNumber(x, y) {
    const devX = Math.floor(x / inputRows);
    const devY = Math.floor(y / inputCols);
    return (parseInt(input[x % inputRows][y % inputCols]) + devX + devY - 1) % 9 + 1;
}
// console.log(input);
const graph = new graph_1.Graph();
function generateMapOfCoordinates() {
    const mapOfAllCoordinates = [];
    for (let i = 0; i < rows; ++i) {
        mapOfAllCoordinates[i] = [];
        for (let j = 0; j < cols; j++) {
            mapOfAllCoordinates[i][j] = { x: i, y: j };
            graph.addVertex(mapOfAllCoordinates[i][j]);
        }
    }
    for (let i = 0; i < rows; ++i) {
        for (let j = 0; j < cols; j++) {
            const currentVertex = mapOfAllCoordinates[i][j];
            if (i !== 0)
                graph.addEdge(currentVertex, mapOfAllCoordinates[i - 1][j], getNumber(i - 1, j));
            if (j !== 0)
                graph.addEdge(currentVertex, mapOfAllCoordinates[i][j - 1], getNumber(i, j - 1));
            if (i !== rows - 1)
                graph.addEdge(currentVertex, mapOfAllCoordinates[i + 1][j], getNumber(i + 1, j));
            if (j !== cols - 1)
                graph.addEdge(currentVertex, mapOfAllCoordinates[i][j + 1], getNumber(i, j + 1));
        }
    }
    return (x, y) => mapOfAllCoordinates[x][y];
}
const mapOfAllCoordinates = generateMapOfCoordinates();
console.log((0, graph_1.shortestPath)(graph, mapOfAllCoordinates(0, 0), mapOfAllCoordinates(rows - 1, cols - 1)));
