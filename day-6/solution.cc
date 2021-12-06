#include <iostream>

using namespace std;

void moveOneDay(long[], size_t);

int main() {
    long arrOfFishes[9] = {0};
    long temp = 0;
    while (cin >> temp) {
        arrOfFishes[temp] += 1;
        if (cin.peek() == ',') cin.ignore();
    }
    for (int i = 0; i < 80; i++) {
        moveOneDay(arrOfFishes, 9);
    }
    temp = 0;
    for (int i = 0; i < 9; i++) {
        temp += arrOfFishes[i];
    }
    cout << "First answer is " << temp << endl;
    for (int i = 80; i < 256; i++) {
        moveOneDay(arrOfFishes, 9);
    }
    temp = 0;
    for (int i = 0; i < 9; i++) {
        temp += arrOfFishes[i];
    }
    cout << "Second answer is " << temp << endl;
}

void moveOneDay(long arr[], size_t size) {
    long reproducers = arr[0];
    for (size_t i = 0; i < size - 1; i++) {
        arr[i] = arr[i + 1];
    }
    arr[8] = 0;
    arr[6] += reproducers;
    arr[8] += reproducers;
}
