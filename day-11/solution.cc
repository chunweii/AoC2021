#include <iostream>
#define SIZE 10
#define ITERATIONS 100

using namespace std;

void incrementAdjacent(int[SIZE][SIZE], int, int);

void addOneSpecial(int&);

int main() {
    int numberOfFlashes = 0;
    int matrix[SIZE][SIZE];
    string line;
    for (int i = 0; i < SIZE; ++i) {
        cin >> line;
        for (int j = 0; j < SIZE; ++j) {
            matrix[i][j] = line[j] - '0';
        }
    }
    for (int i = 0; i < ITERATIONS; ++i) {
        for (int j = 0; j < SIZE; ++j) {
            for (int k = 0; k < SIZE; ++k) {
                matrix[j][k] = matrix[j][k] + 1;
            }
        }
        int tempFlashes = 0;
        while (true) {
            for (int i = 0; i < SIZE; ++i) {
                for (int j = 0; j < SIZE; ++j) {
                    if (matrix[i][j] > 9) {
                        ++tempFlashes;
                        matrix[i][j] = -1; // Just flashed
                        incrementAdjacent(matrix, i, j);
                    }
                }
            }
            numberOfFlashes += tempFlashes;
            if (tempFlashes == 0) break;
            tempFlashes = 0;
        }
        for (int j = 0; j < SIZE; ++j) {
            for (int k = 0; k < SIZE; ++k) {
                matrix[j][k] = max(0, matrix[j][k]);
            }
        }
    }
    cout << numberOfFlashes << endl;
}

void addOneSpecial(int& x) {
    if (x < 0) return;
    x++;
}

void incrementAdjacent(int matrix[SIZE][SIZE], int r, int c) {
    int lowestR = max(r - 1, 0);
    int highestR = min(r + 1, SIZE - 1);
    int lowestC = max(c - 1, 0);
    int highestC = min(c + 1, SIZE - 1);
    for (int i = lowestR; i <= highestR; ++i) {
        for (int j = lowestC; j <= highestC; ++j) {
            addOneSpecial(matrix[i][j]);
        }
    }
}