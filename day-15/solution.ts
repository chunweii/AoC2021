import * as fs from 'fs';
import * as path from 'path';
import { Graph, shortestPath } from "../ts-modules/graph";

const input : string[] = fs.readFileSync(path.join(__dirname, "input.txt")).toString().trim().split("\n");
const rows = input.length;
const cols = input[0].length;

// console.log(input);

const graph = new Graph<{x: number, y: number}>();

function generateMapOfCoordinates() {
    const mapOfAllCoordinates : {x: number, y: number}[][] = [];
    for (let i = 0; i < rows; ++i) {
        mapOfAllCoordinates[i] = [];
        for (let j = 0; j < cols; j++) {
            mapOfAllCoordinates[i][j] = {x: i, y: j};
            graph.addVertex(mapOfAllCoordinates[i][j]);
        }
    }
    for (let i = 0; i < rows; ++i) {
        for (let j = 0; j < cols; j++) {
            const currentVertex = mapOfAllCoordinates[i][j];
            if (i !== 0) graph.addEdge(currentVertex, mapOfAllCoordinates[i - 1][j], parseInt(input[i - 1][j]));
            if (j !== 0) graph.addEdge(currentVertex, mapOfAllCoordinates[i][j - 1], parseInt(input[i][j - 1]));
            if (i !== rows - 1) graph.addEdge(currentVertex, mapOfAllCoordinates[i + 1][j], parseInt(input[i + 1][j]));
            if (j !== cols - 1) graph.addEdge(currentVertex, mapOfAllCoordinates[i][j + 1], parseInt(input[i][j + 1]));
        }
    }
    return (x: number, y: number) => mapOfAllCoordinates[x][y];
}

const mapOfAllCoordinates = generateMapOfCoordinates();

console.log(shortestPath(graph, mapOfAllCoordinates(0, 0), mapOfAllCoordinates(rows - 1, cols - 1)));
