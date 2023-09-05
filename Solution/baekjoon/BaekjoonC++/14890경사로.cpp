/*
2초,512MB
n*n, n<=100,L<=n
L개의 숫자가 반복되야 경사로 가능
다른 열.행끼리는 영향 ㄴㄴ 그 행/열을 지나갈 수 있는지만 판별
그럼 L개가 있는지, 차이가 1인지만 보면 되는거 아닌가.
겨우 100*100인데,, 단순 구현문제인듯
1. 그 전과 높이가 같다면
2. 그전보다 1 높아진다면
그전 L만큼 있는지 확인
3. 그전보다 1 낮아진다면
이후  L-1만큼 같았는지 bool 플래그 만들어서 
4. 나머지는 불가
*/

#include<iostream>
#include<vector>
using namespace std;

int main() {
	int N, L;
	cin >> N >> L;
	vector <vector<int>> map(N, vector<int>(N));
	for (int i = 0; i < N; i++)
	{
		for (int j = 0; j < N; j++)
		{
			cin >> map[i][j];
		}
	}
	//횡단
	int answer = 0;
	for (int i = 0; i < N; i++)
	{
		int sameHeight = 1;
		bool isOk = true;
		for (int j = 0; j < N-1; j++)
		{
			if (map[i][j+1] == map[i][j]) {
				sameHeight++;	
			}else if (map[i][j + 1] ==map[i][j]+1) {//높아질때 이전에 L개수 확인
				if (sameHeight >= L) {
					sameHeight = 1;
				}
				else {
					isOk = false;
					break;
				}
			}
			else if (map[i][j + 1] == map[i][j]-1) {//낮아질때 이후에 L개수 확인
				if (sameHeight<0) { //내려가는 경사로 둘 수 없음.겹치는 경우
					isOk = false;
					break;
				}
				else sameHeight = -(L - 1);
			}
			else {
				isOk = false;
				break;
			}
		}
		if (isOk&&sameHeight>=0)answer++;
	}
	//종단
	for (int i = 0; i < N; i++)
	{
		int sameHeight = 1;
		bool isOk = true;

		for (int j = 0; j < N-1; j++)
		{
			if (map[j + 1][i] == map[j][i]) {
				sameHeight++;
			}
			else if (map[j + 1][i] == map[j][i] + 1) {//높아질때 이전에 L개수 확인
				if (sameHeight >= L) {
					sameHeight = 1;
				}
				else {
					isOk = false;
					break;
				}
			}
			else if (map[j + 1][i] == map[j][i] -1) {//낮아질때 이후에 L개수 확인
				if (sameHeight < 0) { //내려가는 경사로 둘 수 없음
					isOk = false;
					break;
				}
				else sameHeight = -(L - 1);
			}
			else {
				isOk = false;
				break;
			}

		}
		if (isOk && sameHeight >= 0)answer++;
	}
	cout << answer;
	return 0;
}