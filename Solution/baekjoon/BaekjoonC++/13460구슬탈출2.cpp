//#include<iostream>
//#include<queue>
//#define MAX 10
//
//using namespace std;
//
//struct Pos {
//	int rx;
//	int ry;
//	int bx;
//	int by;
//	int count;
//};
//void canGo(Pos&, int);
//char board[MAX][MAX];
//int n, m;
//int dx[] = { 1, 0, -1, 0 };
//int dy[] = { 0,1,0,-1 };
//queue<Pos> q;// rb위치, 움직인 횟수
//bool visit[11][11][11][11];
//int main() {
//	ios::sync_with_stdio(false);
//	cin.tie(NULL);
//	cout.tie(NULL);
//	cin >> n >> m;
//	Pos start;
//	start.count = 0;
//	for (int i = 0; i < n; i++)
//	{
//		vector <char> temp;
//		for (int j = 0; j < m; j++)
//		{
//			char a;
//			cin >> a;
//			if (a == 'R') {
//				start.rx = i;
//				start.ry = j;
//				board[i][j] = '.';
//			}else if (a == 'B') {
//				start.bx = i;
//				start.by = j;
//				board[i][j] = '.';
//			}
//			else board[i][j] = a;
//		}
//		
//	}
//	//bfs 시작
//	int ans = 0;
//	q.push(start);
//	while (!q.empty()) {
//		if (ans > 10)break;
//		
//		Pos curr = q.front();
//		if (board[curr.rx][curr.ry] == 'O')break;
//		q.pop();
//		if (curr.count >= 10) break;
//		//위 아래 왼 오 
//		for (int i = 0; i < 4; i++)
//		{
//			Pos temp = curr;
//			canGo(temp, i);
//			if (!(visit[temp.rx][temp.ry] [temp.bx][temp.by])) {
//				visit[temp.rx][temp.ry][temp.bx][temp.by] = true;
//				q.push(temp);
//			}
//		}
//	}
//	return 0;
//}
//void canGo(Pos& curr,int i) {
//	//빨간공을 굴리면서 확인해야 할 것
//	//1. 구멍일때
//	//2. 벽에 닿을 때 까지,
//	//3. 파란 공이 서있는 앞까지
//	while (true) {
//		if (board[curr.rx][curr.ry] == 'O') {
//			//파란공의 경우  벽이거나 구멍이거나 빨간공에 닿거나
//			while (true) {
//				if (board[curr.bx + dx[i]][curr.by + dy[i]] == '#')break;
//				else if (board[curr.bx][curr.by] == 'O')break;
//				else{
//					curr.bx += dx[i];
//					curr.by += dy[i];
//				}
//			}
//			return;
//		}
//		else if (board[curr.rx + dx[i]][curr.ry + dy[i]] == '#') {
//			while (true) {
//				if (board[curr.bx + dx[i]][curr.by + dy[i]] == '#')break;
//				else if (board[curr.bx ][curr.by] == 'O')break;
//				else {
//					curr.bx += dx[i];
//					curr.by += dy[i];
//					//빨간공과 1칸 띄어주기
//					if (curr.rx == curr.bx && curr.ry == curr.by) {
//						curr.bx -= dx[i];
//						curr.by -= dy[i];
//						break;
//					}
//				}
//			}
//			return;
//		}
//		else if (curr.rx + dx[i] == curr.bx && curr.ry + dy[i]== curr.by) {
//			while (true) {
//				if (board[curr.bx + dx[i]][curr.by + dy[i]] == '#')break;
//				else if (board[curr.bx][curr.by] == 'O') {
//					break;
//				}
//				else {
//					curr.bx += dx[i];
//					curr.by += dy[i];
//				}
//			}
//			return;
//		}else {
//			curr.rx += dx[i];
//			curr.ry += dy[i];
//		}
//	}
//	//if (board[curr.x + dx * (count + 1)][curr.y + dy * (count + 1)] == 'O') return 0;	
//}
/*
시간제한 2초, 메모리 제한 512MB
어떤 행동을 최소 몇번 만에 
보드 크기:세로 n*가로 M 3~10-> 굳이 벡터 안쓰고 배열로 만들기
bfs,dfs? 
bfs가 최소를 찾기엔 좋을듯
while bfs if 벽에 닿으면 그만 이동. 파랑구슬이 구멍에 가면 큐에서 빼기
bfs하면서 저장할 변수: R,B의 위치
->queue <pair<nodeR,nodeB> q;

근데 만약 두 구슬이 같은 열에 있으면 어캄? 한 자리에 못 있으니 
가려는 방향에 더 가까운 애가 먼저 가고 그 다음에가 그 옆에 위치 하게.
-> 그냥 같은 자리에 있게 하고 마지막에 한자리 옮기기

오른쪽 이동 후 왼쪽은 필요 없음. 마찬가지로 위 이동후 다시 위나 아래는 불필요

1. 빨간 공이 0을 만나면 파란공
*/
#include<iostream>
#include<queue>
#define endl "\n"
using namespace std;

struct step
{
	int Rx, Ry;
	int Bx, By;
	int Count;
};

char map[11][11];
bool visit[11][11][11][11];
int N, M;
int dx[] = { 1,-1,0,0 };
int dy[] = { 0,0,1,-1 };

void move(int& rx, int& ry, int& distance, int& i)
{
	while (map[rx + dx[i]][ry + dy[i]] != '#' && map[rx][ry] != 'O')
	{
		rx += dx[i];
		ry += dy[i];
		distance += 1;
	}
}

void BFS(int Rx, int Ry, int Bx, int By)
{
	queue<step> q;
	q.push({ Rx,Ry,Bx,By,0 });
	visit[Rx][Ry][Rx][Ry] = true;
	while (!q.empty())
	{
		int rx = q.front().Rx;
		int ry = q.front().Ry;
		int bx = q.front().Bx;
		int by = q.front().By;
		int count = q.front().Count;
		q.pop();

		if (count >= 10) break;

		for (int i = 0; i < 4; i++)
		{
			int nrx = rx, nry = ry, nbx = bx, nby = by;
			int rc = 0, bc = 0, ncount = count + 1;

			move(nrx, nry, rc, i);
			move(nbx, nby, bc, i);

			if (map[nbx][nby] == 'O') continue;
			if (map[nrx][nry] == 'O')
			{
				cout << ncount;
				return;
			}

			if (nrx == nbx && nry == nby)
			{
				if (rc > bc) nrx -= dx[i], nry -= dy[i];
				else nbx -= dx[i], nby -= dy[i];
			}

			if (visit[nrx][nry][nbx][nby]) continue;
			visit[nrx][nry][nbx][nby] = true;
			q.push({ nrx,nry,nbx,nby,ncount });
		}
	}
	cout << -1;
}

void Answer()
{
	cin >> N >> M;
	int Rx = 0, Ry = 0, Bx = 0, By = 0;
	for (int i = 0; i < N; i++)
	{
		for (int j = 0; j < M; j++)
		{
			cin >> map[i][j];
			if (map[i][j] == 'R')
			{
				Rx = i; Ry = j;
			}
			else if (map[i][j] == 'B')
			{
				Bx = i; By = j;
			}
		}
	}
	BFS(Rx, Ry, Bx, By);
}

int main()
{
	ios_base::sync_with_stdio(false);
	cin.tie(NULL); cout.tie(NULL);
	Answer();
	return 0;
}