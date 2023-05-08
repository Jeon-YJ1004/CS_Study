#include<iostream>
#include<vector>
using namespace std;

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(0);
	int n, m;
	cin >> n >> m;
	vector <vector<int>> v;
	while (n > 0) {
		vector <int> temp;
		while (m>0)
		{
			int a;
			cin >> a;
			temp.push_back(a);
		}
		v.push_back(temp);
	}

}