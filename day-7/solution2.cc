#include <iostream>
#include <vector>
#include <algorithm>
#include <chrono>
#include <thread>
// #define MAX 1967

using namespace std;

int main() {
    
    vector<int> arrOfCrabs;
    int temp = 0;
    int max = 0;
    while (cin >> temp) {
        arrOfCrabs.push_back(temp);
        if (max < temp) max = temp;
        if (cin.peek() == ',') cin.ignore();
    }
    const int MAX = max;
    int mem[MAX + 1] = {0};
    for (int i = 0; i <= MAX; i++) {
        mem[i] = (i * (i + 1)) >> 1;
    }
    int low = 0;
    int high = MAX;
    int ans = INT32_MAX;
    while (low < high) {
        int med = 0.5 * (low + high + 1);
        int oneBelowMed = med - 1;
        int ansMed = 0;
        int ansMedMinusOne = 0;
        for (const int &i : arrOfCrabs) {
            ansMed += mem[abs(i - med)];
            ansMedMinusOne += mem[abs(i - oneBelowMed)];
        }
        if (ansMed > ansMedMinusOne) {
            if (ansMedMinusOne < ans) ans = ansMedMinusOne;
            high = oneBelowMed;
        } else if (ansMed < ansMedMinusOne) {
            if (ansMed < ans) ans = ansMed;
            low = med;
        } else {
            return ansMed;
        }
        cout << "low " << low << " high " << high << " ans " << ans << " ansMed " << ansMed << " ansMedMinusOne " << ansMedMinusOne <<  endl;
        this_thread::sleep_for(chrono::seconds(1));
    }
    
    cout << ans << endl;
}
