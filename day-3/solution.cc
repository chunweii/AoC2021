#include <iostream>
#include <vector>
#include <cmath>

using namespace std;

int main(int argc, char const *argv[])
{
    int n = 1;
    int inputLength = 0;
    string input;
    cin >> input;
    inputLength = input.length();
    vector<int> countArr (inputLength, 0);
    for (int i = 0; i < inputLength; i++) {
        countArr[i] += input[i] & 1;
    }

    while (cin >> input) {
        for (int i = 0; i < inputLength; i++) {
            countArr[i] += input[i] & 1;
        }
        ++n;
    }

    int gamma = 0;
    int halfway = n / 2;

    for (int i = 0; i < inputLength; i++) {
        gamma <<= 1;
        cout << countArr[i] << endl;
        if (countArr[i] > halfway) gamma += 1;
    }

    int epsilon = pow(2, inputLength) - gamma - 1;

    cout << gamma * epsilon << endl;

    return 0;
}
