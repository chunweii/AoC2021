#include <iostream>
#define SIZE 1000

using namespace std;

int main() {
    int grid[SIZE][SIZE] = {{0}};
    int result = 0;
    string temp;
    while (!cin.eof()) {
        int x1, y1, x2, y2, commaIndex;
        cin >> temp;
        x1 = stoi(temp.substr(0, (commaIndex = temp.find(',', 0))));
        y1 = stoi(temp.substr(commaIndex + 1));
        cin >> temp >> temp;
        x2 = stoi(temp.substr(0, (commaIndex = temp.find(',', 0))));
        y2 = stoi(temp.substr(commaIndex + 1));
        if (x1 == x2) {
            if (y1 < y2) {
                for (int i = y1; i <= y2; ++i) {
                    grid[x1][i]++;
                    if (grid[x1][i] == 2) result++;
                }
            } else {
                for (int i = y2; i <= y1; ++i) {
                    grid[x1][i]++;
                    if (grid[x1][i] == 2) result++;
                }
            }
        } 
        else if (y1 == y2) {
            if (x1 < x2) {
                for (int i = x1; i <= x2; ++i) {
                    grid[i][y1]++;
                    if (grid[i][y1] == 2) result++;
                }
            } else {
                for (int i = x2; i <= x1; ++i) {
                    grid[i][y1]++;
                    if (grid[i][y1] == 2) result++;
                }
            }
        }
        else if (x1 < x2) {
            int incrementer = y1 < y2 ? 1 : -1;
            for (int i = x1, j = y1; i <= x2; ++i, j += incrementer) {
                grid[i][j]++;
                if (grid[i][j] == 2) result++;
            }
        } else if (x1 > x2) { // x1 > x2
            int incrementer = y1 < y2 ? -1 : 1;
            for (int i = x2, j = y2; i <= x1; ++i, j += incrementer) {
                grid[i][j]++;
                if (grid[i][j] == 2) result++;
            }
        } else {
            cout << "Hello" << endl;
        }
    }
    cout << result << endl;
    return 0;
}