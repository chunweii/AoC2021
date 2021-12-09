#include <iostream>
#include <vector>
#define SIZE 100

using namespace std;

int dfs(pair<int, int>, int[SIZE][SIZE], bool[SIZE][SIZE]);
pair<int, int> getMin(const int[3]);

int main() {
    vector<pair<int, int>> lowPoints;
    int sizesOfBasins[3] = {0};
    unsigned long result = 0;
    int matrix[SIZE][SIZE] = {{0}};
    bool visitedMatrix[SIZE][SIZE] = {{false}};
    for (int i = 0; i < SIZE; ++i) {
        for (int j = 0; j < SIZE; ++j) {
            matrix[i][j] = cin.get() - 48;
        }
        cin.get();
    }
    // 4 corners
    if (matrix[0][0] < matrix[0][1] && matrix[0][0] < matrix[1][0]) {
        result += matrix[0][0] + 1;
        lowPoints.push_back({0, 0});
    }
    if (matrix[0][SIZE - 1] < matrix[0][SIZE - 2] && matrix[0][SIZE - 1] < matrix[1][SIZE - 1]) {
        result += matrix[0][SIZE - 1] + 1;
        lowPoints.push_back({0, SIZE - 1});
    }
    if (matrix[SIZE - 1][0] < matrix[SIZE - 1][1] && matrix[SIZE - 1][0] < matrix[SIZE - 2][0]) {
        result += matrix[SIZE - 1][0] + 1;
        lowPoints.push_back({SIZE - 1, 0});
    }
    if (matrix[SIZE - 1][SIZE - 1] < matrix[SIZE - 1][SIZE - 2] && matrix[SIZE - 1][SIZE - 1] < matrix[SIZE - 2][SIZE - 1]) {
        result += matrix[SIZE - 1][SIZE - 1] + 1;
        lowPoints.push_back({SIZE - 1, SIZE - 1});
    }
    // top and bottom rows
    for (int j = 1; j < SIZE - 1; ++j) {
        if (matrix[0][j] < matrix[0][j + 1] && matrix[0][j] < matrix[0][j - 1] &&
            matrix[0][j] < matrix[1][j]) {
            result += matrix[0][j] + 1;
            lowPoints.push_back({0, j});
        }
        if (matrix[SIZE - 1][j] < matrix[SIZE - 1][j - 1] && matrix[SIZE - 1][j] < matrix[SIZE - 1][j + 1] &&
            matrix[SIZE - 1][j] < matrix[SIZE - 2][j]) {
            result += matrix[SIZE - 1][j] + 1;
            lowPoints.push_back({SIZE - 1, j});
        }
    }
    // left and right columns
    for (int i = 1; i < SIZE - 1; ++i) {
        if (matrix[i][0] < matrix[i + 1][0] && matrix[i][0] < matrix[i - 1][0] &&
            matrix[i][0] < matrix[i][1]) {
            result += matrix[i][0] + 1;
            lowPoints.push_back({i, 0});
        }
        if (matrix[i][SIZE - 1] < matrix[i + 1][SIZE - 1] && matrix[i][SIZE - 1] < matrix[i - 1][SIZE - 1] &&
            matrix[i][SIZE - 1] < matrix[i][SIZE - 2]) {
            result += matrix[i][SIZE - 1] + 1;
            lowPoints.push_back({i, SIZE - 1});
        }
    }
    for (int i = 1; i < SIZE - 1; ++i) {
        for (int j = 1; j < SIZE - 1; ++j) {
            if (matrix[i][j] < matrix[i + 1][j] && matrix[i][j] < matrix[i - 1][j] &&
                matrix[i][j] < matrix[i][j + 1] && matrix[i][j] < matrix[i][j - 1]) {
                result += matrix[i][j] + 1;
                lowPoints.push_back({i, j});
            }
        }
    }

    for (auto &&p : lowPoints) {
        cout << p.first << "," << p.second << endl;
        int size = dfs(p, matrix, visitedMatrix);
        pair<int, int> q = getMin(sizesOfBasins);
        if (size > q.second) {
            sizesOfBasins[q.first] = size;
        }
    }

    cout << sizesOfBasins[0] << " " << sizesOfBasins[1] << " " << sizesOfBasins[2] << endl;
    

    // cout << result << endl;
    
    return 0;
}

pair<int, int> getMin(const int arr[3]) {
    int index = 0;
    int number = INT32_MAX;
    for (size_t i = 0; i < 3; i++)
    {
        if (arr[i] < number) {
            index = i;
            number = arr[i];
        }
    }
    return {index, number};
}

vector<pair<int, int>> getNeighbours(pair<int, int> p, int matrix[SIZE][SIZE], bool visited[SIZE][SIZE]) {
    vector<pair<int, int>> ans;
    vector<pair<int, int>> temp (
        {{p.first + 1, p.second}, {p.first - 1, p.second}, {p.first, p.second + 1}, {p.first, p.second - 1}}
    );
    for (auto &&i : temp) {
        if (!(i.first < 0 || i.first >= SIZE || i.second < 0 || i.second >= SIZE ||
            matrix[i.first][i.second] == 9 || visited[i.first][i.second])) ans.push_back(i);
    }
    return ans;
}

int dfs(pair<int, int> point, int matrix[SIZE][SIZE], bool visited[SIZE][SIZE]) {
    vector<pair<int, int>> stack;
    stack.push_back(point);
    int ans = 1;
    visited[point.first][point.second] = true;
    while (!stack.empty()) {
        pair<int, int> p = stack.at(stack.size() - 1);
        stack.pop_back();
        for (pair<int, int> q : getNeighbours(p, matrix, visited)) {
            visited[q.first][q.second] = true;
            stack.push_back(q);
            ++ans;
        }
    }
    return ans;
}

