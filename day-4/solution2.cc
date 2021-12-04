#include <iostream>
#include <fstream>
#include <string>
#include <sstream>
#include <list>
#include "bingo.h"

using std::ifstream;
using std::string;
using std::stringstream;
using std::cout;
using std::list;
using std::endl;
using std::stoi;

vector<int> splitStringWithComma(const string &input) {
    string item;
    stringstream s (input);
    vector<int> result;
    while(getline(s, item, ',')) {
        result.push_back(stoi(item));
    }
    return result;
}

vector<int> splitStringWithSpaces(const string &input) {
    string item;
    stringstream s (input);
    vector<int> result;
    while(getline(s, item, ' ')) {
        if (item.empty()) continue;
        result.push_back(stoi(item));
    }
    return result;
}

int main() {
    ifstream inputFile ("input.txt");
    vector<int> allInput;
    list<Bingo> allBoards;
    string item;
    getline(inputFile, item);
    allInput = splitStringWithComma(item);
    getline(inputFile, item);
    vector<vector<int>> board;
    while (!inputFile.eof()) {
        getline(inputFile, item);
        if (item.empty()) {
            // Store new board
            allBoards.push_back(Bingo(board));
            board.clear();
            continue;
        }
        board.push_back(splitStringWithSpaces(item));
    }
    int numberOfBoards = allBoards.size();
    int wonBoards = 0;
    Bingo* lastWonBoard = NULL;
    int winningNumber;
    int itr = 0;
    while (wonBoards != numberOfBoards) {
        for (Bingo &board : allBoards) {
            if (board.alreadyWon()) continue;
            int number = allInput[itr];
            if (board.markNumber(number)) {
                lastWonBoard = &board;
                winningNumber = number;
                wonBoards++;
            }
        }
        itr++;
    }

    cout << lastWonBoard->sumOfUnused() * winningNumber << endl;
}