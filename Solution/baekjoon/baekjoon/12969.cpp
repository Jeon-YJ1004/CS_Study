#include<iostream>
#include<vector>
#include<string>

using namespace std;
int N,K;
bool cache[31][31][31][450];
char ans[32];
bool getAnswer(int n, int a, int b, int k) {
	if (n == N) {
		if (k == K)return true;
		else return false;
	}
	if (cache[n][a][b][k])return false;
	cache[n][a][b][k] = true;
	ans[n] = 'A';
	if (getAnswer(n + 1, a + 1, b, k))return true;
	ans[n] = 'B';
	// b���� �߰� �Ǹ� ������ �ִ� a���� ��ŭ k�� ++ �ɰ�. a < b < c
	if (getAnswer(n + 1, a, b + 1, k + a)) return true;

	ans[n] = 'C';
	// C�� �߰� �Ǹ� a, b���� ��ŭ k�� ++ �ɰ�. a < b < c
	if (getAnswer(n + 1, a, b, k + a + b)) return true;

	return false;
}
int main() {
	
	cin >> N>>K;
	if (getAnswer(0, 0, 0, 0))cout << ans << "\n";
	else cout << -1 << "\n";

	return 0;
}