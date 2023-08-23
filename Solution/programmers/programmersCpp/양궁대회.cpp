#include <string>
#include <vector>

using namespace std;

int N;
int havetoShot[11];
vector<int> answer;
int maxDiff = 0;

bool compSmallScore(vector<int> ryan) {
    if (answer.empty()) return true;
    for (int i = 10; i >= 0; i--) {
        if (ryan[i] > answer[i]) return true;
        else if (ryan[i] < answer[i]) return false;
    }
    return true;
}
void getScore(vector<int> ryan) {
    int ryanScore = 0, apeachScore = 0;
    for (int i = 0; i < 11; i++) {
        if (ryan[i] > 0) { //라이언은 무조건 어피치보다 많이 쏨. 쐈다는것은 점수를 얻었다는것
            ryanScore += 10 - i;
        }
        else if (havetoShot[i] - 1) apeachScore += 10 - i;
    }
    int diff = ryanScore - apeachScore;
    //현재 조합의 diff가 더 크고 작은 점수의 화살 수도 많을때
//비기는 경우를 생각해서 diff>0일때 조건을 우선적으로 판별해야한다.
    if ((diff > 0) && ((maxDiff < diff) || (maxDiff == diff && compSmallScore(ryan)))) {
        maxDiff = diff;
        answer = ryan;
    }
}
//몇번째 점수인지(10-index)점 ,사용한 화살 개수, 라이언 쏜 화살 배열
void dfs(int index, int arrow, vector<int> ryan) {
    //선택할 수 없음,마지막 남은 화살은 0점에 쏘기.
    if (index == 10 || arrow == 0) {
        ryan[10] += arrow;
        getScore(ryan);
        ryan[10] -= arrow;
        return;
    }
    // 현재 남은 화살의 갯수 >= 어피치가 K점 과녁에 쏜 화살의 갯수 + 1
    if (havetoShot[index] <= arrow) {
        ryan[index] += havetoShot[index];
        dfs(index + 1, arrow - ryan[index], ryan);
        ryan[index] -= havetoShot[index];
    }
    //선택 안하는 경우
    ryan[index] = 0;
    dfs(index + 1, arrow, ryan);
}

vector<int> solution(int n, vector<int> info) {
    
    N = n;
    vector<int> ryan(11, 0);// 라이언이 해당 인덱스의 점수에 몇번 쐈는지
    for (int i = 0; i < 11; i++)
    {
        havetoShot[i] = info[i] + 1;
    }
    dfs(0, n, ryan);
    if (answer.empty())answer.push_back(-1);
    return answer;
}
/*
1. x점에 더 많이 맞힌 사람이 가져감. 같으면 어피치, x점 만큼만 
2. 최종 점수가 같을 경우 어피치가 우승
3. 가장 큰 점수 차로 이기기 위해 n발을 어디에?
4.라이언이 가장 큰 점수 차이로 우승할 수 있는 방법이 여러 가지 일 경우,
 가장 낮은 점수를 더 많이 맞힌 경우를 return

 n<=10 -> 완탐 10! 시간초가 날것 같음
but x 점을 얻기 위해 쏴야하는 최소 횟수는 정해져 있음. 어피치 1발 많이 쏘면 됨.
그럼 그 어피치 +1 값 배열의 원소들을 조합해서 가장 큰 점수 차를 얻는 경우 찾기.
=> 2^11로 가능 dfs 가능

조합 문제==> 점수가 작은애부터 쏘면서 가능여부를 확인-> dfs 재귀로 구하기
재귀 타면서 남은 화살 갯수를 변수로 다음 점수를 선택 가능한지 따지기.

조합을 구한 후 점수 계산.

답을 헤멘 이유:
***dfs를 여러 조건으로 돌리는 경우, dfs를 하고 다시 제자리로 조건을 돌려줘야한다.
***비기는 경우를 생각해서 diff가  0일때 조건을 넣어줘야한다.


*/
