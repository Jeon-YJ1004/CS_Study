#include <bits/stdc++.h>
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

int dx[4] = { 0,0,-1,1 };
int dy[4] = { -1,1,0,0 };

int n, m;

bool OOB(int x, int y) {
    return x < 0 || x >= n || y < 0 || y >= m;
}

bool vis[5][5]; // �湮 ����(0�� ��� �ش� ĭ�� ���� ���������� �ǹ�)
vector<vector<int>> block;

// ���� ���¿��� �� �� ������ �÷��̸� �� �� ���� �̵� Ƚ��
// ��ȯ ���� ¦�� : �÷��̾ �й����� �ǹ�, Ȧ�� : �÷��̾ �¸����� �ǹ�
// curx, cury : ���� �÷��̾��� ��ǥ, opx, opy : ��� �÷��̾��� ��ǥ
int solve(int curx, int cury, int opx, int opy) {
    // �÷��̾ ��� �ִ� ������ ������ٸ�
    if (vis[curx][cury]) return 0;
    int ret = 0;
    // �÷��̾ �� �������� �̵����� ���� �ܰ�� ������ ����
    for (int dir = 0; dir < 4; dir++) {
        int nx = curx + dx[dir];
        int ny = cury + dy[dir];
        if (OOB(nx, ny) || vis[nx][ny] || !block[nx][ny]) continue;
        vis[curx][cury] = 1; // �÷��̾ ������ �ִ� ���� �湮 ǥ�ø� ����

        // �÷��̾ dir �������� �̵������� �� ���� ��
        // ���� �Լ��� ȣ���� �� opx, opy, nx, ny ������ ȣ���ؾ� �Կ� ����
        int val = solve(opx, opy, nx, ny) + 1;

        // �湮 ǥ�� ����
        vis[curx][cury] = 0;

        // 1. ���� ����� ���� �й��ε� ���� ���� ���� �¸��� ���
        if (ret % 2 == 0 && val % 2 == 1) ret = val; // �ٷ� ����
        // 2. ���� ����� �ϰ� ���� ���� ���� ��� �й��� ���
        else if (ret % 2 == 0 && val % 2 == 0) ret = max(ret, val); // �ִ��� �ʰ� ���°� ����
        // 3. ���� ����� �ϰ� ���� ���� ���� ��� �¸��� ���
        else if (ret % 2 == 1 && val % 2 == 1) ret = min(ret, val); // �ִ��� ���� �̱�°� ����

    }
    return ret;
}

int solution(vector<vector<int>> board, vector<int> aloc, vector<int> bloc) {
    n = board.size();
    m = board[0].size();
    block = board;
    return solve(aloc[0], aloc[1], bloc[0], bloc[1]);
}
/*
��Ždfs. board 5*5
?�ּ��� �÷��̰� �ƴ� ������ �÷���
�����̶� ������ �ּ��� �÷��̸� ���� �� 
�̱�� ���� ���� �� ���� �ּ�ȭ��Ű�� �ϰ�,
���� ���� �ִ�ȭ


���� ���(dfs�� �����ϴ� ���)
- ���ʿ� �������� ���� ���
- ������ �ִ� ���忡 ���� ���� 
*/
