#include <iostream>
using namespace std;

int gcd(int, int);

int main() {
    int x, y;
    cout << "Enter 2 numbers:" << endl;
    cin >> x >> y;
    cout << "The gcd of " << x << " and " << y << " is " << gcd(x, y) << endl;
    return 0;
}

int gcd(int x, int y) {
    if (x == 1 || y == 1) {
        return 1;
    }
    if (x == 0) return y;
    if (y == 0) return x;
    while (y != 0) {
        int temp = y;
        y = x % y;
        x = temp;
    }
    return x;
}