#include <iostream>
#include <sstream>
#include <unordered_map>
#include <unordered_set>
#include <vector>
#include <algorithm>

using namespace std;

const int uniquePattern[] = {2, 3, 4, 7};
const unordered_map<int, vector<int>> mapOfPatterns ({
    {0, vector<int>({0, 1, 2, 4, 5, 6})},
    {1, vector<int>({2, 5})},
    {2, vector<int>({0, 2, 3, 4, 6})},
    {3, vector<int>({0, 2, 3, 5, 6})},
    {4, vector<int>({1, 2, 3, 5})},
    {5, vector<int>({0, 1, 3, 5, 6})},
    {6, vector<int>({0, 1, 3, 4, 5, 6})},
    {7, vector<int>({0, 2, 5})},
    {8, vector<int>({0, 1, 2, 3, 4, 5, 6})},
    {9, vector<int>({0, 1, 2, 3, 5, 6})}
});
const unordered_map<string, int> specialMap ({
{"467889", 0},
{"89", 1},
{"47788", 2},
{"77889", 3},
{"6789", 4},
{"67789", 5},
{"467789", 6},
{"889", 7},
{"4677889", 8},
{"677889", 9}
});
const unordered_map<int, vector<int>> mapOfPatternLengths ({
    {2, vector<int>({1})},
    {3, vector<int>({7})},
    {4, vector<int>({4})},
    {5, vector<int>({2, 3, 5})},
    {6, vector<int>({0, 6, 9})},
    {7, vector<int>({8})}
});

bool contains(const int arr[], int x, size_t size) {
    for (size_t i = 0; i < size; i++) {
        if (arr[i] == x) return 1;
    }
    return 0;
}

int main() {
    string temp;
    int count = 0;
    while (getline(cin, temp)) {
        int countArr[7] = {0};
        // int assigner[7] = {0};
        string temp2;
        stringstream ss (temp);
        while ((ss >> temp2) && temp2 != "|") {
            for (char c : temp2) {
                countArr[c - 'a']++;
            }
        }
        int result[4] = {0};
        int itr = 0;
        while (ss >> temp2) {
            int arrOfCounts[temp2.length()];
            int i = 0;
            for (char c : temp2) {
                arrOfCounts[i++] = countArr[c - 'a'];
            }
            sort(arrOfCounts, arrOfCounts + temp2.length());
            string s;
            for (int i = 0; i < temp2.length(); i++) {
                s += to_string(arrOfCounts[i]);
            }
            result[itr++] = specialMap.at(s);
        }
        count += result[0] * 1000 + result[1] * 100 + result[2] * 10 + result[3];

    }
    cout << count << endl;
}