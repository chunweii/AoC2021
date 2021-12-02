#include <iostream>
#include <random>
using namespace std;

int main()
{
    int toBeGuessed;
    std::random_device dev;
    std::mt19937 rng (dev());
    std::uniform_int_distribution<std::mt19937::result_type> dist100 (1, 100); // distribution in range [0, 100]

    toBeGuessed = dist100(rng);
    int guess;
    while (true) {
        cout << "Enter a number: " << flush;
        if (!(cin >> guess)) {
            cout << "Error in input." << endl;
            cin.clear();
            cin.ignore(numeric_limits<streamsize>::max(), '\n');
            continue;
        }
        if (guess == toBeGuessed) {
            cout << "You are right!" << endl;
            return 0;
        }
        if (guess < toBeGuessed) {
            cout << "Too Small!" << endl;
        }
        if (guess > toBeGuessed) {
            cout << "Too Big!" << endl;
        }
        cin.clear();
        cin.ignore(numeric_limits<streamsize>::max(), '\n');
    }
    return 0;
}