#include <iostream>
#include <fstream>
#include <vector>
#include <list>
#include <cmath>
#include <string>

using namespace std;

int main()
{
    ifstream inputFile ("input.txt");
    int numberOfBits = 0;
    int inputIndex = 0;
    int inputSize;
    vector<string> input;
    string s;
    getline(inputFile, s);
    input.push_back(s);
    numberOfBits = input[0].length();

    while (getline(inputFile, s)) {
        input.push_back(s);
    }

    inputFile.close();

    inputSize = input.size();

    list<int> listToFocus;
    for (int i = 0; i < inputSize; i++) {
        listToFocus.insert(listToFocus.end(), i);
    }

    while (listToFocus.size() != 1) {
        int numberOfOnes = 0;
        list<int> newOnes;
        list<int> newZeros;
        for (const int ind : listToFocus) {
            string str = input[ind];
            if (str[inputIndex] & 1) {
                numberOfOnes ++;
                newOnes.push_back(ind);
            } else {
                newZeros.push_back(ind);
            }
        }
        if ((numberOfOnes << 1) >= listToFocus.size()) {
            listToFocus = newOnes;
        } else {
            listToFocus = newZeros;
        }
        inputIndex++;
    }

    int oxy = stoi(input[listToFocus.front()], nullptr, 2);

    listToFocus = list<int>();
    inputIndex = 0;
    for (int i = 0; i < inputSize; i++) {
        listToFocus.insert(listToFocus.end(), i);
    }

    while (listToFocus.size() != 1) {
        int numberOfOnes = 0;
        list<int> newOnes;
        list<int> newZeros;
        for (const int ind : listToFocus) {
            string str = input[ind];
            if (str[inputIndex] & 1) {
                numberOfOnes ++;
                newOnes.push_back(ind);
            } else {
                newZeros.push_back(ind);
            }
        }
        if ((numberOfOnes << 1) >= listToFocus.size()) {
            listToFocus = newZeros;
        } else {
            listToFocus = newOnes;
        }
        inputIndex++;
    }

    int co2 = stoi(input[listToFocus.front()], nullptr, 2);

    cout << oxy * co2 << endl;

    return 0;
}
