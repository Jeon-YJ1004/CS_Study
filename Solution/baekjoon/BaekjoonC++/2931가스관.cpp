#include <iostream>
#include <vector>
#include <queue>

using namespace std;

int r, c;
int wholeY, wholeX;

vector<pair<int, int> > mz(2);
char block[30][30];
int dx[4][2] = { {1,0}, {0,1}, {-1,0}, {0,-1} };


bool isValid(int y, int x) {
    return (y >= 1 && y <= r) && (x >= 1 && x <= c);
}


void findPipe() {
    // .인 곳의 4방향을 탐색한다. 
    int arr[4] = { 0 };

    for (int d = 0; d < 4; d++) {
        int ny = wholeY + dx[d][0];
        int nx = wholeX + dx[d][1];

        if (d == 0) {
            if (block[ny][nx] == '|' || block[ny][nx] == '+' || block[ny][nx] == '2' || block[ny][nx] == '3') arr[d] = 1;
        }
        else if (d == 1) {
            if (block[ny][nx] == '-' || block[ny][nx] == '+' || block[ny][nx] == '3' || block[ny][nx] == '4') arr[d] = 1;
        }
        else if (d == 2) {
            if (block[ny][nx] == '|' || block[ny][nx] == '+' || block[ny][nx] == '1' || block[ny][nx] == '4') arr[d] = 1;
        }
        else if (d == 3) {
            if (block[ny][nx] == '-' || block[ny][nx] == '+' || block[ny][nx] == '1' || block[ny][nx] == '2') arr[d] = 1;
        }
    }

    // 아래 경우에 따라 답을 출력한다. 
    if (arr[0] && arr[1] && arr[2] && arr[3]) {
        cout << wholeY << " " << wholeX << " " << "+";
    }
    else if (arr[0] && !arr[1] && arr[2] && !arr[3]) {
        cout << wholeY << " " << wholeX << " " << "|";
    }
    else if (!arr[0] && arr[1] && !arr[2] && arr[3]) {
        cout << wholeY << " " << wholeX << " " << "-";
    }
    else if (arr[0] && arr[1] && !arr[2] && !arr[3]) {
        cout << wholeY << " " << wholeX << " " << "1";
    }
    else if (!arr[0] && arr[1] && arr[2] && !arr[3]) {
        cout << wholeY << " " << wholeX << " " << "2";
    }
    else if (!arr[0] && !arr[1] && arr[2] && arr[3]) {
        cout << wholeY << " " << wholeX << " " << "3";
    }
    else if (arr[0] && !arr[1] && !arr[2] && arr[3]) {
        cout << wholeY << " " << wholeX << " " << "4";
    }
}


int canGo(int y, int x) {

    int d = -1;
    for (int i = 0; i < 4; i++) {
        int ny = y + dx[i][0];
        int nx = x + dx[i][1];

        if (!isValid(ny, nx)) continue;
        if (block[ny][nx] == '.') continue;

        if (i == 0) {
            if (block[ny][nx] == '|' || block[ny][nx] == '+' || block[ny][nx] == '2' || block[ny][nx] == '3') d = 0;
        }
        else if (i == 1) {
            if (block[ny][nx] == '-' || block[ny][nx] == '+' || block[ny][nx] == '3' || block[ny][nx] == '4') d = 1;
        }
        else if (i == 2) {
            if (block[ny][nx] == '|' || block[ny][nx] == '+' || block[ny][nx] == '1' || block[ny][nx] == '4') d = 2;
        }
        else if (i == 3) {
            if (block[ny][nx] == '-' || block[ny][nx] == '+' || block[ny][nx] == '1' || block[ny][nx] == '2') d = 3;
        }
    }
    return d;
}


void searchWhole() { 
    int y = mz[0].first;
    int x = mz[0].second;
    int d = canGo(y, x);

    // 시작 방향이 -1이라는 뜻은 M 주변에 파이프가 없다, Z부터 시작
    if (d == -1) {
        y = mz[1].first;
        x = mz[1].second;
        d = canGo(y, x);
    }

    // bfs piar<위치>,파이프종류>
    queue<pair<pair<int, int>, int> > q;
    q.push({ {y, x}, d });

    while (!q.empty()) {

        y = q.front().first.first;
        x = q.front().first.second;
        d = q.front().second;
        q.pop();

        int ny = y + dx[d][0];
        int nx = x + dx[d][1];
        int nd;
        //없어진 파이프 만났을 때
        if (block[ny][nx] == '.') {
            wholeY = ny;
            wholeX = nx;
            return;
        }

        // 다음 지점의 파이프 모양에 따라 다음 방향을 결정
        if (d == 0) {
            if (block[ny][nx] == '|' || block[ny][nx] == '+') nd = 0;
            else if (block[ny][nx] == '2') nd = 1;
            else if (block[ny][nx] == '3') nd = 3;
        }
        else if (d == 1) {
            if (block[ny][nx] == '-' || block[ny][nx] == '+') nd = 1;
            else if (block[ny][nx] == '3') nd = 2;
            else if (block[ny][nx] == '4') nd = 0;
        }
        else if (d == 2) {
            if (block[ny][nx] == '|' || block[ny][nx] == '+') nd = 2;
            else if (block[ny][nx] == '1') nd = 1;
            else if (block[ny][nx] == '4') nd = 3;
        }
        else if (d == 3) {
            if (block[ny][nx] == '-' || block[ny][nx] == '+') nd = 3;
            else if (block[ny][nx] == '1') nd = 0;
            else if (block[ny][nx] == '2') nd = 2;
        }
        // 다음 지점과 방향을 저장한다.  
        q.push({ {ny, nx}, nd });
    }
}


int main(void) {
    ios_base::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);

    cin >> r >> c;  
    
    for (int i = 1; i <= r; i++) {
        for (int j = 1; j <= c; j++) {
            char s;
            cin >> s;
            block[i][j] = s;
            if (s == 'M') {
                mz[0] = { i, j };
            }
            else if (s == 'Z') {
                mz[1] = { i, j };
            }
        }
    }
    searchWhole();
    findPipe();
}
/*
6 4 7
3 w 1
8 2 5
M 주위에 바로 없을 수도 잇다.
bfs에서 굳이 4방향을 확인하지 않아도 된다. 가스는 한방향으로 흐르기 때문에.
현재 파이프에 따라 확인해야하는 방향이 정해져있다.
가스가 흐르는지 확인해야함. if문으로

*/