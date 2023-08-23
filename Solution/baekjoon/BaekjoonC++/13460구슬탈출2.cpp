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
//queue<Pos> q;// rb��ġ, ������ Ƚ��
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
//	//bfs ����
//	int ans = 0;
//	q.push(start);
//	while (!q.empty()) {
//		if (ans > 10)break;
//		
//		Pos curr = q.front();
//		if (board[curr.rx][curr.ry] == 'O')break;
//		q.pop();
//		if (curr.count >= 10) break;
//		//�� �Ʒ� �� �� 
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
//	//�������� �����鼭 Ȯ���ؾ� �� ��
//	//1. �����϶�
//	//2. ���� ���� �� ����,
//	//3. �Ķ� ���� ���ִ� �ձ���
//	while (true) {
//		if (board[curr.rx][curr.ry] == 'O') {
//			//�Ķ����� ���  ���̰ų� �����̰ų� �������� ��ų�
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
//					//�������� 1ĭ ����ֱ�
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
�ð����� 2��, �޸� ���� 512MB
� �ൿ�� �ּ� ��� ���� 
���� ũ��:���� n*���� M 3~10-> ���� ���� �Ⱦ��� �迭�� �����
bfs,dfs? 
bfs�� �ּҸ� ã�⿣ ������
while bfs if ���� ������ �׸� �̵�. �Ķ������� ���ۿ� ���� ť���� ����
bfs�ϸ鼭 ������ ����: R,B�� ��ġ
->queue <pair<nodeR,nodeB> q;

�ٵ� ���� �� ������ ���� ���� ������ ��į? �� �ڸ��� �� ������ 
������ ���⿡ �� ����� �ְ� ���� ���� �� �������� �� ���� ��ġ �ϰ�.
-> �׳� ���� �ڸ��� �ְ� �ϰ� �������� ���ڸ� �ű��

������ �̵� �� ������ �ʿ� ����. ���������� �� �̵��� �ٽ� ���� �Ʒ��� ���ʿ�

1. ���� ���� 0�� ������ �Ķ���
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