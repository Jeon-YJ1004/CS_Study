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

    //진수 구하기
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
    //마지막 0P인경우
    if (!tmp.empty() && isPrime(stoll(tmp))) {
        answer++;
    }
    return answer;
}
/*
n->k진수 백만자리 수, 3~10 -> k진수는 int 넘어갈 수도 있음. -> longlong
소수를 dp로 저장 후 있는지 확인?
p의 조건을 만족하는지 확인.. 
조건 모두 0을 기준으로 되어있음.
0을 기준으로 숫자를 나눈 뒤 그 사이 값을 보면 됨. 0이 아닌 수 사이에 있을 수 없음.

O(k진수로 변환 후 자리수*dp 반복)

*/