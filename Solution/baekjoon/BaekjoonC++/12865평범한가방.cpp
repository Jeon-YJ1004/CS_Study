#include<iostream>
#include<vector>
# include<algorithm>
using namespace std;
struct Tool {
	int weight;
	int value;
	void initTool(int w, int v) {
		weight = w;
		value = v;
	}
};
vector <vector<int>> bag;
int main() {
	int n, k;
	cin >> n >> k;
	Tool tools[101];
	for (int i = 1; i <= n; i++)
	{
		int w, v;
		cin >> w >> v;
		Tool t;
		t.initTool(w, v);
		tools[i] = t;
	}
	//dp[물건][무게]=max(B[k-1][W], B[k][W-wk] + val(wk))
	bag.assign(n + 1, vector <int>(k + 1, 0));
	for (int i = 1; i <= n; i++)
	{
		for (int j = 1; j <= k; j++)
		{
			if (tools[i].weight <= j)
				bag[i][j] = max(bag[i - 1][j - tools[i].weight] + tools[i].value, bag[i - 1][j]);
			else bag[i][j] = bag[i - 1][j];
		}

	}
	cout << bag[n][k];
	return 0;
}
/*
1. 부루트포스
2. dp
넣거나 안넣거나로 두 값을 따지기 때문에 2^n. 순회 순서는 상관 없음

3. backtracking
무게당 가중치가 큰 순으로 정렬하고 계산해야한다.
트리의 노드로 각 물건을 갖거나 안갖거나로 자식을 만들어가며 노드 검사
입력이 클땐 비효율적
DFS 이용

4. branch n bound
분기한정 알고리즘은 어떤 마디에서 확장 여부를 결정할 때 
지금까지 구한 답 중에서 가장 좋은 값보다 한계값이 더 좋은 지 검사한다.
BFS 이용-> 더 많은 경우 탐색. 비효율
*/