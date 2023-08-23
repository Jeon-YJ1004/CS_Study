#include<iostream>
#include<vector>
#include<algorithm>
#include<queue>
#define MAX 1001
using namespace std;

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(0), cout.tie(0);
	int n, m;
	cin >> n >> m;// ���� ���� 
	int tommato[MAX][MAX];
	//bfs�� �� ���� �ʱ�ȭ, �湮 üũ���� �湮 ��¥
	int visited[MAX][MAX];
	queue <pair<int, int>> q;//x,y��ǥ��
	bool allTommatoFlag = true;

	for (int i = 0; i < m; i++)
	{
		for (int j = 0; j < n; j++)
		{
			int temp;
			cin >> temp;
			tommato[i][j] = temp;
			if (temp == 1)q.push(make_pair(i, j));
			//�丶�䰡 ���ų� �̹� �;����� �湮 ó��
			if (temp == -1||temp==1)visited[i][j] = 0;
			else visited[i][j] = -1;
			if (temp == 0) allTommatoFlag = false;
		}
	}
	if (allTommatoFlag) { 
		cout << 0;
		exit(0);
	}
	//bfs ����
	int dx[] = { 1,0,-1,0 };
	int dy[] = { 0,1,0,-1 };
	while(!q.empty()) {
		int currX = q.front().first;
		int currY = q.front().second;
		q.pop();
		for (int i = 0; i < 4; i++)
		{
			int nextX = currX + dx[i];
			int nextY = currY + dy[i];
			if (nextX >= 0 && nextX <= m - 1 && nextY >= 0 && nextY <= n - 1) {
				if (visited[nextX][nextY]==-1) { 
					q.push(make_pair(nextX, nextY)); 
					visited[nextX][nextY] = visited[currX][currY] + 1;
				}
			}
		}
		
	}
	allTommatoFlag = true;
	int day=-1;
	for (int i = 0; i < m; i++)
	{
		for (int j = 0; j < n; j++)
		{
			if (day <= visited[i][j])day = visited[i][j];
			if (visited[i][j] == -1) {
				allTommatoFlag = false;
				break;
			}
		}
	}
	if (!allTommatoFlag)cout << -1;
	else cout << day;
	return 0;
}
/*
�ּ� �� ��
n,m<=1000 n*m =�ʸ�
������ ��ȸ�� �ð� �ʰ�

 dfs�� ���� �丶�� ���� ��� �丶����� �ɸ��� �ּ� �ð�?
 -> ���� �丶��� �������̴�..
 ��� ���� �丶�信�� dfs�� �ϰ� �ּҰ��� ���ϱ⿣ ���ܰ� ����.

 bfs?
 ť�� ���� �丶�� �ֱ�.
 ť ���鼭 �ֺ��� ���� �丶�� üũ�ϱ�
 visit��üũ �ϸ鼭 �ٽ� �ֺ��� ���� �丶�� �ֱ�
 ������ �丶��� ���̶� �����ϱ�.
 **�޸� �ʰ�=> �湮üũ�� for�� �ȿ� ������Ѵ�.
 * �׷� ��÷�� ���� �丶�䵵 �湮 üũ������Ѵ�.
 * 
 * **day ���ʹ� �ʿ���� visit�� int������ �湮�� ��¥�� �����ϸ� �ȴ�. 
*/