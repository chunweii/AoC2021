#include <iostream>
#include <algorithm>

#define FWD "forward"
#define UP "up"
#define DOWN "down"

using namespace std;

int main(int argc, char const *argv[])
{
    unsigned int horizontal = 0;
    unsigned int depth = 0;
    int aim = 0;
    string currentString;
    int val;

    while (cin >> currentString >> val) {
        if (currentString == FWD) {
            horizontal += val;
            depth += aim * val;
        }
        if (currentString == UP) {
            aim -= val;
        }
        if (currentString == DOWN) {
            aim += val;
        }
    }
    cout << horizontal * depth << endl;
    return 0;
}
