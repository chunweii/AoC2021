#include "bingo.h"

Bingo::Bingo(vector<vector<int>> board) 
: dimension_(board.size()),
 rowCounters_(dimension_, 0),
 columnCounters_(dimension_, 0) {
     for (int i = 0; i < dimension_; i++) {
         for (int j = 0; j < dimension_; j++) {
             int number = board[i][j];
             pair<int, int> p = {i, j};
             mapOfValues_[number] = p;
             unusedNumbers_.insert(number);
         }
     }
}

bool Bingo::markNumber(int x) {
    unordered_map<int, pair<int, int>>::const_iterator itr = mapOfValues_.find(x);
    if (itr == mapOfValues_.end()) {
        return false;
    }
    pair<int, int> p = itr->second;\
    rowCounters_[p.first]++;
    columnCounters_[p.second]++;
    unusedNumbers_.erase(x);
    return (alreadyWon_ = rowCounters_[p.first] == dimension_ || columnCounters_[p.second] == dimension_);
}

int Bingo::sumOfUnused() const {
    int result = 0;
    for (int i : unusedNumbers_) {
        result += i;
    }
    return result;
}

bool Bingo::alreadyWon() const {
    return alreadyWon_;
}