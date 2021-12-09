#include <iostream>
#define SIZE 100

using namespace std;

int main() {
    unsigned long result = 0;
    int matrix[SIZE][SIZE] = {{0}};
    for (int i = 0; i < SIZE; ++i) {
        for (int j = 0; j < SIZE; ++j) {
            matrix[i][j] = cin.get() - 48;
        }
        cin.get();
    }
    // 4 corners
    if (matrix[0][0] < matrix[0][1] && matrix[0][0] < matrix[1][0])
        result += matrix[0][0] + 1;
    if (matrix[0][SIZE - 1] < matrix[0][SIZE - 2] && matrix[0][SIZE - 1] < matrix[1][SIZE - 1])
        result += matrix[0][SIZE - 1] + 1;
    if (matrix[SIZE - 1][0] < matrix[SIZE - 1][1] && matrix[SIZE - 1][0] < matrix[SIZE - 2][0])
        result += matrix[SIZE - 1][0] + 1;
    if (matrix[SIZE - 1][SIZE - 1] < matrix[SIZE - 1][SIZE - 2] && matrix[SIZE - 1][SIZE - 1] < matrix[SIZE - 2][SIZE - 1])
        result += matrix[SIZE - 1][SIZE - 1] + 1;
    // top and bottom rows
    for (int j = 1; j < SIZE - 1; ++j) {
        if (matrix[0][j] < matrix[0][j + 1] && matrix[0][j] < matrix[0][j - 1] &&
            matrix[0][j] < matrix[1][j])
            result += matrix[0][j] + 1;
        if (matrix[SIZE - 1][j] < matrix[SIZE - 1][j - 1] && matrix[SIZE - 1][j] < matrix[SIZE - 1][j + 1] &&
            matrix[SIZE - 1][j] < matrix[SIZE - 2][j])
            result += matrix[SIZE - 1][j] + 1;
    }
    // left and right columns
    for (int i = 1; i < SIZE - 1; ++i) {
        if (matrix[i][0] < matrix[i + 1][0] && matrix[i][0] < matrix[i - 1][0] &&
            matrix[i][0] < matrix[i][1])
            result += matrix[i][0] + 1;
        if (matrix[i][SIZE - 1] < matrix[i + 1][SIZE - 1] && matrix[i][SIZE - 1] < matrix[i - 1][SIZE - 1] &&
            matrix[i][SIZE - 1] < matrix[i][SIZE - 2])
            result += matrix[i][SIZE - 1] + 1;
    }
    for (int i = 1; i < SIZE - 1; ++i) {
        for (int j = 1; j < SIZE - 1; ++j) {
            if (matrix[i][j] < matrix[i + 1][j] && matrix[i][j] < matrix[i - 1][j] &&
                matrix[i][j] < matrix[i][j + 1] && matrix[i][j] < matrix[i][j - 1])
                result += matrix[i][j] + 1;
        }
    }

    cout << result << endl;
    
    return 0;
}