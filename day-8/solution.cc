#include <iostream>
#include <sstream>
#include <unordered_map>
#include <vector>

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
    {7, vector<int>({0, 3, 5})},
    {8, vector<int>({0, 1, 2, 3, 4, 5, 6})},
    {9, vector<int>({0, 1, 2, 3, 5, 6})}
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
        string temp2;
        stringstream ss (temp);
        getline(ss, temp2, '|');
        while (ss >> temp2) {
            count += contains(uniquePattern, temp2.length(), 4);
        }
    }
    cout << count << endl;
}