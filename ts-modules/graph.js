"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shortestPath = exports.Graph = exports.Edge = void 0;
const fastpriorityqueue_1 = __importDefault(require("fastpriorityqueue"));
class Edge {
    constructor(end, weight) {
        this.end = end;
        this.weight = weight;
    }
}
exports.Edge = Edge;
;
class Graph {
    constructor(comparator = (a, b) => a < b) {
        this.allVertices = new Set();
        this.allEdges = new Map();
        this._comparator = comparator;
    }
    copyFrom(graph) {
        graph.allVertices.forEach(v => this.allVertices.add(v));
        graph.allEdges.forEach((v, k) => this.allEdges.set(k, v));
    }
    addVertex(v) {
        this.allVertices.add(v);
        this.allEdges.set(v, []);
    }
    addEdge(v1, v2, weight) {
        if (!this.allVertices.has(v1))
            this.addVertex(v1);
        if (!this.allVertices.has(v2))
            this.addVertex(v2);
        const currentArr = this.allEdges.get(v1) || [];
        currentArr.push(new Edge(v2, weight));
    }
    removeVertex(v) {
        this.allEdges.delete(v);
        this.allVertices.delete(v);
        this.allEdges.forEach((val, key) => this.allEdges.set(key, val.filter(x => x.end !== v)));
    }
    removeEdge(v1, v2) {
        this.allEdges.set(v1, this.allEdges.get(v1)?.filter(e => e.end !== v2) || []);
    }
    getEdgesFrom(v) {
        return this.allEdges.get(v) || [];
    }
    getAllVertices() {
        return this.allVertices;
    }
    getAllEdges() {
        return this.allEdges;
    }
    compareEdges(e1, e2) {
        return this._comparator(e1, e2);
    }
}
exports.Graph = Graph;
/**
 * Find the shortest path from the source to dest and returns an object where the dist property
 * is the length of the path and the path property is the array of vertices to visit. There
 * must not be any negative weighted edges since this function uses the Dijkstra's Algorithm.
 * @param graph The graph to be searched on
 * @param source The starting vertex
 * @param dest The ending vertex
 */
const shortestPath = (graph, source, dest) => {
    const visited = new Set();
    const allVertices = new Map();
    const pq = new fastpriorityqueue_1.default((a, b) => a.d < b.d);
    const numberOfVertices = graph.getAllVertices().size;
    graph.getAllVertices().forEach(v => {
        pq.add({ v: v, d: Infinity, p: [] });
        allVertices.set(v, { d: Infinity, p: [] });
    });
    pq.add({ v: source, d: 0, p: [] });
    while (visited.size !== numberOfVertices && !visited.has(dest)) {
        const visitedVertex = pq.poll();
        if (visited.has(visitedVertex.v))
            continue;
        visited.add(visitedVertex.v);
        allVertices.set(visitedVertex.v, visitedVertex);
        graph.getEdgesFrom(visitedVertex.v).forEach(x => {
            if (visited.has(x.end))
                return;
            const weightOfX = x.weight === undefined ? 1 : x.weight;
            const detailsOfXEnd = allVertices.get(x.end) || { d: Infinity, p: [] };
            if (visitedVertex.d + weightOfX < detailsOfXEnd.d) {
                detailsOfXEnd.d = visitedVertex.d + weightOfX;
                detailsOfXEnd.p = [...visitedVertex.p];
                detailsOfXEnd.p.push(visitedVertex.v);
                pq.add({ ...detailsOfXEnd, v: x.end });
                allVertices.set(x.end, { ...detailsOfXEnd });
            }
        });
    }
    const result = allVertices.get(dest) || { d: 1, p: [] };
    result.p.push(dest);
    return { dist: result.d, path: result.p };
};
exports.shortestPath = shortestPath;
