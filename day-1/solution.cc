#include <iostream>
#include <algorithm>

using namespace std;

int main(int argc, char const *argv[])
{
    int count = 0;
    int sum = INT32_MAX;
    int prev1;
    int prev2;
    int curr;

    cin >> prev1 >> prev2;
    
    while (cin >> curr) {
        int temp = curr + prev2 + prev1;
        if (temp > sum) ++count;
        prev1 = prev2;
        prev2 = curr;
        sum = temp;
    }

    cout << count << endl;
    return 0;
}
