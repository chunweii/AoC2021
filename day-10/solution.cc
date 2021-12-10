#include <iostream>
#include <vector>
#include <algorithm>
#include <stack>

using namespace std;

int indexOf(vector<char>, char);

int main() {
    long result = 0;

    stack<char> stackOfChars;
    vector<char> openingChars ({'(', '[', '{', '<'});
    vector<char> closingChars ({')', ']', '}', '>'});
    vector<int> penalties ({3, 57, 1197, 25137});
    string line;
    vector<unsigned long> incompleteScores;

    while (cin >> line) {
        unsigned long score = 0;
        int i = 0;
        for (; i < line.size(); ++i) {
            int x;
            if (indexOf(openingChars, line[i]) != -1) {
                stackOfChars.push(line[i]);
            } else if ((x = indexOf(closingChars, line[i])) != -1) {
                char correctChar = stackOfChars.top();
                if (correctChar == openingChars[x]) {
                    stackOfChars.pop();
                } else {
                    result += penalties[x];
                    break;
                }
            }
        }
        if (i == line.size()) {
            while (!stackOfChars.empty()) {
                score *= 5;
                score += indexOf(openingChars, stackOfChars.top()) + 1;
                stackOfChars.pop();
            }
            incompleteScores.push_back(score);
        }
        stackOfChars = stack<char>();
    }

    cout << result << endl;

    sort(incompleteScores.begin(), incompleteScores.end());

    cout << incompleteScores[incompleteScores.size() / 2] << endl;
    // for (unsigned long i : incompleteScores) cout << i << endl;

    return 0;
}

int indexOf(vector<char> ls, char c) {
    int x = 0;
    for (char d : ls) {
        if (d == c) return x;
        ++x;
    }
    return -1;
}
