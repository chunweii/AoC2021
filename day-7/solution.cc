#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int getMedian(vector<int>);
int quickfind(vector<int>, size_t);

int main() {
    vector<int> arrOfCrabs;
    int temp = 0;
    while (cin >> temp) {
        arrOfCrabs.push_back(temp);
        if (cin.peek() == ',') cin.ignore();
    }
    int median = getMedian(arrOfCrabs);
    int ans = 0;
    int max = -1;
    for (const int &i : arrOfCrabs) {
        ans += abs(i - median);
        if (i > max) max = i;
    }
    cout << ans << endl;
}

int getMedian(vector<int> arr) {
    int middleElement = arr.size() / 2;
    // sort(arr.begin(), arr.end());
    return quickfind(arr, middleElement);
}

int quickfind(vector<int> arr, size_t index) {
    int start = 0, end = arr.size() - 1;
    while (start != end) {
        int pivot = arr[(start + end) / 2];
        int i = start, j = end + 1;
        // cout << start << " " << end << " " << pivot << endl;
        while (true) {
            do {i++;} while (arr[i] < pivot);
            do {j--;} while (arr[j] > pivot);
            if (i >= j) {
                if (j == index) return pivot;
                if (j < index) start = j + 1;
                else end = j - 1;
                break;
            }
            swap(arr[i], arr[j]);
        }
    }
    return arr[start];
}