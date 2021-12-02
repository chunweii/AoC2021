// file.cpp, Maggie Johnson
// Description: An illustration of file processing
#include <fstream>
#include <iostream>
using namespace std;

int main() {
  string first_name, last_name; int age;
//   // Collect the data.
//   cout << "Enter First Name: "; getline(cin, first_name);
//   cout << "Enter Last Name: "; getline(cin, last_name);
//   cout << "Enter Age: "; cin >> age;
//   cout << endl << "Enter the name of the file: "; cin >> file_name;

//   // Create an ofstream called People, open the stream for output.
//   ofstream People(file_name, ios::out);
//   // Write the output to the stream.
//   People << first_name << endl << last_name << endl << age << endl; 
  
  ifstream People("chunwei.txt", ios::in);

  getline(People, first_name);
  getline(People, last_name);
  People >> age;

  cout << "Your first name is: " << first_name << endl;
  cout << "Your last name is: " << last_name << endl;
  cout << "Your age is: " << age << endl;
  
  
  return 0;
}
