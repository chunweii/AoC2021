#pragma once
#include <vector>
#include <unordered_map>
#include <unordered_set>
using std::vector;
using std::unordered_map;
using std::pair;
using std::unordered_set;

class Bingo {
private:
    const unsigned int dimension_;
    vector<int> rowCounters_;
    vector<int> columnCounters_;
    unordered_set<int> unusedNumbers_;
    unordered_map<int, pair<int, int>> mapOfValues_;
    bool alreadyWon_ = false;
public:
    Bingo(vector<vector<int>> board);
    bool markNumber(int x); // Returns true if winning
    int sumOfUnused() const;
    bool alreadyWon() const;
};
