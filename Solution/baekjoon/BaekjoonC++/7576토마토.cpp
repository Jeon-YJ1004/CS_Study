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
	cin >> n >> m;// 가로 세로 
	int tommato[MAX][MAX];
	//bfs에 쓸 벡터 초기화, 방문 체크이자 방문 날짜
	int visited[MAX][MAX];
	queue <pair<int, int>> q;//x,y좌표값
	bool allTommatoFlag = true;

	for (int i = 0; i < m; i++)
	{
		for (int j = 0; j < n; j++)
		{
			int temp;
			cin >> temp;
			tommato[i][j] = temp;
			if (temp == 1)q.push(make_pair(i, j));
			//토마토가 없거나 이미 익었으면 방문 처리
			if (temp == -1||temp==1)visited[i][j] = 0;
			else visited[i][j] = -1;
			if (temp == 0) allTommatoFlag = false;
		}
	}
	if (allTommatoFlag) { 
		cout << 0;
		exit(0);
	}
	//bfs 시작
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
최소 일 수
n,m<=1000 n*m =십만
일일히 순회는 시간 초과

 dfs로 익은 토마토 부터 모든 토마토까지 걸리는 최소 시간?
 -> 익은 토마토는 여러개이다..
 모든 익은 토마토에서 dfs로 하고 최소값을 구하기엔 예외가 많다.

 bfs?
 큐에 익은 토마토 넣기.
 큐 빼면서 주변에 익은 토마토 체크하기
 visit도체크 하면서 다시 주변에 익은 토마토 넣기
 안익은 토마토는 벽이라 생각하기.
 **메모리 초과=> 방문체크를 for문 안에 해줘야한다.
 * 그럼 맨첨에 넣은 토마토도 방문 체크해줘야한다.
 * 
 * **day 벡터는 필요없다 visit를 int형으로 방문한 날짜를 저장하면 된다. 
*/