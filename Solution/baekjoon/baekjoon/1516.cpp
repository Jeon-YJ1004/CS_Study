#include<iostream>
#include<vector>
#include<algorithm>
#include<queue>
using namespace std;



int main() {
	int n;
	cin >> n;
	vector <vector<int>> preBuilding(n+1 ); //�� �ǹ��� ���� �� ������ ���๰ 
	vector <int> degree(n +1, 0);
	vector <int> time(n+1,0);
	vector <int> dp(n + 1, 0);
	queue <int> q;// ���� ������ 0�� ���� �ε���
	for (int i = 1; i <= n; i++)
	{	
		int t,num;
		int count = 0;
		cin >> t>> num;
		while (num != -1) {
			preBuilding[num].push_back(i);
			cin >> num;
			count++;
		}
		degree[i] = count;
		time[i] = t;
		dp[i] = t;
		if (count == 0) q.push(i);
	}

	//������ �ִ� ����=> ��������
	

	while (!q.empty()) {
		int curr = q.front();
		q.pop();
		for (int i = 0; i < preBuilding[curr].size(); i++)
		{
			//preBuilding[curr][i] ���� --
			int next = preBuilding[curr][i];
			degree[next]--;
			
			if (degree[next] == 0) {
				q.push(next);
			}
			//���� �� ������ ���ݱ��� �ɸ� �ð�+ �� �ð� �� �ɸ� �ð�
			dp[next] = max(dp[next], time[next] + dp[curr]);
		}
	}
	for (int i = 1; i <= n; i++)
	{
		cout << dp[i] << "\n";
	}
	return 0;
}