#include<iostream>
#include<algorithm>
using namespace std;

pair<int, int> dp[3][3];
int n;
void getValue(int []);
int main() {
	cin >> n;
	int arr[3];
	for (int i = 0; i < n; i++)
	{
		for (int j = 0; j < 3; j++)
		{
			int temp;
			cin >> temp;
			arr[j] = temp;
		}
		if (i == 0) {
			dp[0][0]=make_pair(arr[0], arr[0]);
			dp[0][1]=make_pair(arr[1], arr[1]);
			dp[0][2]=make_pair(arr[2], arr[2]);
		}else getValue(arr);
	}
	cout << max({ dp[0][0].second, dp[0][1].second, dp[0][2].second }) << " " << min({ dp[0][0].first, dp[0][1].first, dp[0][2].first });
	return 0;
}
void getValue(int a[]) {
	//order��° �ε��� üũ��
	int minV;
	int maxV;

	//case 0: //0 or 1�� �� �ִ�.
	minV= min(dp[0][0].first, dp[0][1].first)+a[0];
	maxV= max(dp[0][0].second, dp[0][1].second)+a[0];
	dp[1][0]=make_pair(minV, maxV);
	//case 1: //0 or 1 or 2�� �� �ִ�.
	minV = min({ dp[0][0].first, dp[0][1].first ,dp[0][2].first})+a[1];
	maxV= max({ dp[0][0].second, dp[0][1].second ,dp[0][2].second })+a[1];
	dp[1][1]=make_pair(minV, maxV);
	//case 2: //1 or 2�� �� �ִ�.
	minV= min(dp[0][1].first, dp[0][2].first)+a[2];
	maxV= max(dp[0][1].second, dp[0][2].second)+a[2];
	dp[1][2]=make_pair(minV, maxV);
	swap(dp[0], dp[1]);
}
/*
n= �ʸ�
dp[n��° ��][i��° ĭ]=[�ּ�,�ִ�]=dp[n-1][������ i��] <min,max>
�޸� ������ 4MB�� �׳� n���� ���� �����ϸ� �ʰ��� ����.

*/
