#include<iostream>
#include<vector>
#include<algorithm>
#include<queue>
using namespace std;



int main() {
	int n;
	cin >> n;
	vector <vector<int>> preBuilding(n+1 ); //각 건물을 건축 후 가능한 건축물 
	vector <int> degree(n +1, 0);
	vector <int> time(n+1,0);
	vector <int> dp(n + 1, 0);
	queue <int> q;// 진입 차수가 0인 빌딩 인덱스
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

	//순서가 있는 정렬=> 위상정렬
	

	while (!q.empty()) {
		int curr = q.front();
		q.pop();
		for (int i = 0; i < preBuilding[curr].size(); i++)
		{
			//preBuilding[curr][i] 차수 --
			int next = preBuilding[curr][i];
			degree[next]--;
			
			if (degree[next] == 0) {
				q.push(next);
			}
			//만들 수 있으니 지금까지 걸린 시간+ 내 시간 이 걸린 시간
			dp[next] = max(dp[next], time[next] + dp[curr]);
		}
	}
	for (int i = 1; i <= n; i++)
	{
		cout << dp[i] << "\n";
	}
	return 0;
}