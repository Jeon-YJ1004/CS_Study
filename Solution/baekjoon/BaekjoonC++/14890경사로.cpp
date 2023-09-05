/*
2��,512MB
n*n, n<=100,L<=n
L���� ���ڰ� �ݺ��Ǿ� ���� ����
�ٸ� ��.�ೢ���� ���� ���� �� ��/���� ������ �� �ִ����� �Ǻ�
�׷� L���� �ִ���, ���̰� 1������ ���� �Ǵ°� �ƴѰ�.
�ܿ� 100*100�ε�,, �ܼ� ���������ε�
1. �� ���� ���̰� ���ٸ�
2. �������� 1 �������ٸ�
���� L��ŭ �ִ��� Ȯ��
3. �������� 1 �������ٸ�
����  L-1��ŭ ���Ҵ��� bool �÷��� ���� 
4. �������� �Ұ�
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
	//Ⱦ��
	int answer = 0;
	for (int i = 0; i < N; i++)
	{
		int sameHeight = 1;
		bool isOk = true;
		for (int j = 0; j < N-1; j++)
		{
			if (map[i][j+1] == map[i][j]) {
				sameHeight++;	
			}else if (map[i][j + 1] ==map[i][j]+1) {//�������� ������ L���� Ȯ��
				if (sameHeight >= L) {
					sameHeight = 1;
				}
				else {
					isOk = false;
					break;
				}
			}
			else if (map[i][j + 1] == map[i][j]-1) {//�������� ���Ŀ� L���� Ȯ��
				if (sameHeight<0) { //�������� ���� �� �� ����.��ġ�� ���
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
	//����
	for (int i = 0; i < N; i++)
	{
		int sameHeight = 1;
		bool isOk = true;

		for (int j = 0; j < N-1; j++)
		{
			if (map[j + 1][i] == map[j][i]) {
				sameHeight++;
			}
			else if (map[j + 1][i] == map[j][i] + 1) {//�������� ������ L���� Ȯ��
				if (sameHeight >= L) {
					sameHeight = 1;
				}
				else {
					isOk = false;
					break;
				}
			}
			else if (map[j + 1][i] == map[j][i] -1) {//�������� ���Ŀ� L���� Ȯ��
				if (sameHeight < 0) { //�������� ���� �� �� ����
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