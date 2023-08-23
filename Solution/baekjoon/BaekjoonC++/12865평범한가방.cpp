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
	//dp[����][����]=max(B[k-1][W], B[k][W-wk] + val(wk))
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
1. �η�Ʈ����
2. dp
�ְų� �ȳְų��� �� ���� ������ ������ 2^n. ��ȸ ������ ��� ����

3. backtracking
���Դ� ����ġ�� ū ������ �����ϰ� ����ؾ��Ѵ�.
Ʈ���� ���� �� ������ ���ų� �Ȱ��ų��� �ڽ��� ������ ��� �˻�
�Է��� Ŭ�� ��ȿ����
DFS �̿�

4. branch n bound
�б����� �˰����� � ���𿡼� Ȯ�� ���θ� ������ �� 
���ݱ��� ���� �� �߿��� ���� ���� ������ �Ѱ谪�� �� ���� �� �˻��Ѵ�.
BFS �̿�-> �� ���� ��� Ž��. ��ȿ��
*/