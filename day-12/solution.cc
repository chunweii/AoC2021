#include <iostream>
#include <sstream>
#include <vector>
#include <unordered_map>
#include <unordered_set>
#include <stack>

using namespace std;

vector<int> currentPath;
vector<vector<int>> paths;

long solver1(const vector<vector<int>>&, vector<bool>, int, int, int, unordered_set<int>);

long solver2(const vector<vector<int>>&, vector<bool>, int, int, int, unordered_set<int>);

int main() {
    int currentVertexId = 0;
    int startId, endId;
    unordered_map<string, int> mapVerticesToId;
    vector<vector<int>> adjacencyList;
    vector<bool> arrOfBig;
    string line;
    while (cin >> line) {
        stringstream ss (line);
        string u, v;
        getline(ss, u, '-');
        getline(ss, v, '-');
        if (mapVerticesToId.find(u) == mapVerticesToId.end()) {
            if (u == "start") startId = currentVertexId;
            if (u == "end") endId = currentVertexId;
            mapVerticesToId.insert({u, currentVertexId++});
            adjacencyList.push_back(vector<int>());
            arrOfBig.push_back(u[0] < 91);
        }
        if (mapVerticesToId.find(v) == mapVerticesToId.end()) {
            if (v == "start") startId = currentVertexId;
            if (v == "end") endId = currentVertexId;
            mapVerticesToId.insert({v, currentVertexId++});
            adjacencyList.push_back(vector<int>());
            arrOfBig.push_back(v[0] < 91);
        }
        adjacencyList[mapVerticesToId[u]].push_back(mapVerticesToId[v]);
        adjacencyList[mapVerticesToId[v]].push_back(mapVerticesToId[u]);
    }

    cout << solver1(adjacencyList, arrOfBig, startId, endId, startId, unordered_set<int>()) << endl;

    cout << solver2(adjacencyList, arrOfBig, startId, endId, startId, unordered_set<int>()) << endl;
    
    return 0;
}

long solver1(const vector<vector<int>>& adjList, vector<bool> arrOfBig, int startId, int endId,
        int startingNode, unordered_set<int> visitedSmall) {

    currentPath.push_back(startingNode);

    long count = 0;
    for (int node : adjList[startingNode]) {
        if (node == startId) continue;
        if (node == endId) {
            ++count;
            currentPath.push_back(node);
            paths.push_back(currentPath);
            currentPath.pop_back();
            continue;
        }
        if (!arrOfBig[node] && visitedSmall.find(node) == visitedSmall.end()) { // if small and not visited
            visitedSmall.insert(node);
            count += solver1(adjList, arrOfBig, startId, endId, node, visitedSmall);
            visitedSmall.erase(node) != 1;
        }
        if (arrOfBig[node]) {
            count += solver1(adjList, arrOfBig, startId, endId, node, visitedSmall);
        }
    }
    currentPath.pop_back();
    return count;
}

bool visitedTwice = false;

long solver2(const vector<vector<int>>& adjList, vector<bool> arrOfBig, int startId, int endId,
        int startingNode, unordered_set<int> visitedSmall) {
    
    currentPath.push_back(startingNode);

    long count = 0;
    for (int node : adjList[startingNode]) {
        if (node == startId) continue;
        if (node == endId) {
            ++count;
            currentPath.push_back(node);
            paths.push_back(currentPath);
            currentPath.pop_back();
            continue;
        }
        if (!arrOfBig[node] && visitedSmall.find(node) == visitedSmall.end()) { // if small and not visited
            visitedSmall.insert(node);
            count += solver2(adjList, arrOfBig, startId, endId, node, visitedSmall);
            visitedSmall.erase(node) != 1;
        } else if (!arrOfBig[node] && !visitedTwice) {
            visitedTwice = true;
            count += solver2(adjList, arrOfBig, startId, endId, node, visitedSmall);
            visitedTwice = false;
        }
        if (arrOfBig[node]) {
            count += solver2(adjList, arrOfBig, startId, endId, node, visitedSmall);
        }
    }
    currentPath.pop_back();
    return count;
}