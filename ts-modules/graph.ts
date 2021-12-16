import FastPriorityQueue from 'fastpriorityqueue';

export class Edge<VType = any, EType = number> {
    readonly end : VType;
    readonly weight? : EType;
    constructor(end: VType, weight?: EType) {
        this.end = end;
        this.weight = weight;
    } 
};

export class Graph<VType = any, EType = number> {
    private allVertices : Set<VType>;
    private allEdges : Map<VType, Array<Edge<VType, EType>>>;
    private _comparator : (a: EType, b: EType) => boolean;
    constructor(comparator : (a: EType, b: EType) => boolean = (a, b) => a < b ) {
        this.allVertices = new Set();
        this.allEdges = new Map();
        this._comparator = comparator;
    }
    copyFrom(graph : Graph<VType, EType>) {
        graph.allVertices.forEach(v => this.allVertices.add(v));
        graph.allEdges.forEach((v, k) => this.allEdges.set(k, v));
    }
    addVertex(v : VType) {
        this.allVertices.add(v);
        this.allEdges.set(v, []);
    }
    addEdge(v1: VType, v2 : VType, weight? : EType) {
        if (!this.allVertices.has(v1)) this.addVertex(v1);
        if (!this.allVertices.has(v2)) this.addVertex(v2);
        const currentArr : Array<Edge<VType, EType>> = this.allEdges.get(v1) || [];
        currentArr.push(new Edge(v2, weight));
    }
    removeVertex(v : VType) {
        this.allEdges.delete(v);
        this.allVertices.delete(v);
        this.allEdges.forEach((val, key) => this.allEdges.set(key, val.filter(x => x.end !== v)));
    }
    removeEdge(v1: VType, v2 : VType) {
        this.allEdges.set(v1, this.allEdges.get(v1)?.filter(e => e.end !== v2) || []);
    }
    getEdgesFrom(v : VType) : readonly Edge<VType, EType>[] {
        return this.allEdges.get(v) || [];
    }
    getAllVertices() : Set<VType> {
        return this.allVertices;
    }
    getAllEdges() : Map<VType, Array<Edge<VType, EType>>> {
        return this.allEdges;
    }
    compareEdges(e1: EType, e2: EType) {
        return this._comparator(e1, e2);
    }
}

/**
 * Find the shortest path from the source to dest and returns an object where the dist property
 * is the length of the path and the path property is the array of vertices to visit. There
 * must not be any negative weighted edges since this function uses the Dijkstra's Algorithm.
 * @param graph The graph to be searched on
 * @param source The starting vertex
 * @param dest The ending vertex
 */
export const shortestPath = <VType>(graph:Graph<VType>,
        source:VType, dest:VType) : {dist:number, path:VType[]} => {
    
    const visited : Set<VType> = new Set();
    const allVertices:Map<VType, {d:number, p:VType[]}> = new Map();
    const pq : FastPriorityQueue<{v:VType, d:number, p:VType[]}> = new FastPriorityQueue((a, b) => a.d < b.d);
    const numberOfVertices = graph.getAllVertices().size;
    
    graph.getAllVertices().forEach(v => {
        pq.add({v: v, d: Infinity, p: []});
        allVertices.set(v, {d: Infinity, p: []});
    });

    pq.add({v: source, d: 0, p: []});

    while (visited.size !== numberOfVertices && !visited.has(dest)) {
        const visitedVertex = pq.poll()!;
        if (visited.has(visitedVertex.v)) continue;
        visited.add(visitedVertex.v);
        allVertices.set(visitedVertex.v, visitedVertex);
        graph.getEdgesFrom(visitedVertex.v).forEach(x => {
            if (visited.has(x.end)) return;
            const weightOfX = x.weight === undefined ? 1 : x.weight;
            const detailsOfXEnd = allVertices.get(x.end) || {d: Infinity, p: []};
            if (visitedVertex.d + weightOfX < detailsOfXEnd.d) {
                detailsOfXEnd.d = visitedVertex.d + weightOfX;
                detailsOfXEnd.p = [...visitedVertex.p]; 
                detailsOfXEnd.p.push(visitedVertex.v);
                pq.add({...detailsOfXEnd, v: x.end});
                allVertices.set(x.end, {...detailsOfXEnd});
            }
        });
    }

    const result = allVertices.get(dest) || {d: 1, p: []};
    result.p.push(dest);
    return { dist:result.d, path: result.p };
};
