#include <iostream>
#include <vector>
#include <sstream>

using namespace std;

int main() {

    vector<vector<bool>> matrix (1500, vector<bool>(1000, false));
    int maxX = 0;
    int maxY = 0;
    string line;

    while (getline(cin, line)) {
        if (line.empty()) break;
        stringstream ss (line);
        int x, y;
        string temp;
        getline(ss, temp, ',');
        x = stoi(temp);
        ss >> y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
        matrix[x][y] = true;
    }

    while (getline(cin, line)) {
        stringstream ss (line);
        int rValue;
        string lValue;
        ss >> lValue >> lValue;
        getline(ss, lValue, '=');
        ss >> rValue;
        if (lValue.find('x', 0) != string::npos) {
            maxX = rValue;
            int j = rValue + 1;
            for (int i = rValue - 1; i >= 0; --i, ++j) {
                for (int k = 0; k <= maxY; ++k) {
                    matrix[i][k] = matrix[i][k] || matrix[j][k];
                }
            }
        } else {
            maxY = rValue;
            int j = rValue + 1;
            for (int i = rValue - 1; i >= 0; --i, ++j) {
                for (int k = 0; k <= maxX; ++k) {
                    matrix[k][i] = matrix[k][i] || matrix[k][j];
                }
            }
        }
        int numberOfVisibleDots = 0;
        for (int i = 0; i <= maxX; i++) {
            for (int j = 0; j <= maxY; ++j) {
                numberOfVisibleDots += matrix[i][j];
            }
        }
        cout << maxX << ',' << maxY << ' ' << numberOfVisibleDots << endl;
        
    }

    for (int j = 0; j <= maxY; ++j) {
        for (int i = 0; i <= maxX; i++) {
            cout << (matrix[i][j] ? '#' : ' ') << " ";
        }
        cout << endl;
    }

    return 0;
}