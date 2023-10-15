#include<iostream>
#include<vector>
using namespace std;

int n;
vector <int> An;
int Tn[4];
vector <int> result;
int mymin = 1000000001;
int mymax = -1000000001;

void dfs(int result,int i) {
	if (i== n) {
		if (result > mymax)
			mymax = result;
		if (result < mymin)
			mymin = result;
		return;
	}
	for (int j = 0; j < 4; j++)
	{
		if (Tn[j] > 0) {
			Tn[j]--;
			if (j == 0) {		
				dfs(result+ An[i], i + 1);
			}
			else if (j == 1) {
				dfs(result- An[i], i + 1);
			}
			else if (j == 2) {
				dfs(result* An[i], i + 1);
			}
			else if (j == 3) {
				dfs(result/ An[i], i + 1);
			}
			Tn[j]++;
		}

	}
}

int main() {

	cin >> n;
	An.resize(n);
	for (int i = 0; i < n; i++)
	{
		cin >> An[i];
	}
	for (int i = 0; i < 4; i++)
	{
		cin >> Tn[i];
	}
	dfs(An[0],1);
	cout << mymax << '\n';
	cout << mymin;
}

/*
n<=11,연산자<=10 최대 경우의 수: 10C2*4
+ - * /
모든 경우의 값을 저장 후 최대 최소
*/