#include <string>
#include <vector>
#include <algorithm>
#include <cmath>
typedef long long ll;
using namespace std;

bool isPrime(ll num) {
    if (num < 2) return false;

    for (int i = 2; i <= sqrt(num); ++i) {
        if (num % i == 0) return false;
    }
    return true;

}
int solution(int n, int k) {
    int answer = 0;
    vector<pair<string, int>> v;

    //���� ���ϱ�
    string s = "";
    while (n > 0) {
        s += to_string(n % k);
        n /= k;
    }
    reverse(s.begin(), s.end());
    string tmp = "";
    for (char c : s) {
        if (c == '0') {
            if (!tmp.empty() && isPrime(stoll(tmp))) {
                answer++;
            }
            tmp = "";
        }
        else tmp += c;
    }
    //������ 0P�ΰ��
    if (!tmp.empty() && isPrime(stoll(tmp))) {
        answer++;
    }
    return answer;
}
/*
n->k���� �鸸�ڸ� ��, 3~10 -> k������ int �Ѿ ���� ����. -> longlong
�Ҽ��� dp�� ���� �� �ִ��� Ȯ��?
p�� ������ �����ϴ��� Ȯ��.. 
���� ��� 0�� �������� �Ǿ�����.
0�� �������� ���ڸ� ���� �� �� ���� ���� ���� ��. 0�� �ƴ� �� ���̿� ���� �� ����.

O(k������ ��ȯ �� �ڸ���*dp �ݺ�)

*/