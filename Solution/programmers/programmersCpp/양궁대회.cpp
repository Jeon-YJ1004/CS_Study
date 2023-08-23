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
        if (ryan[i] > 0) { //���̾��� ������ ����ġ���� ���� ��. ���ٴ°��� ������ ����ٴ°�
            ryanScore += 10 - i;
        }
        else if (havetoShot[i] - 1) apeachScore += 10 - i;
    }
    int diff = ryanScore - apeachScore;
    //���� ������ diff�� �� ũ�� ���� ������ ȭ�� ���� ������
//���� ��츦 �����ؼ� diff>0�϶� ������ �켱������ �Ǻ��ؾ��Ѵ�.
    if ((diff > 0) && ((maxDiff < diff) || (maxDiff == diff && compSmallScore(ryan)))) {
        maxDiff = diff;
        answer = ryan;
    }
}
//���° ��������(10-index)�� ,����� ȭ�� ����, ���̾� �� ȭ�� �迭
void dfs(int index, int arrow, vector<int> ryan) {
    //������ �� ����,������ ���� ȭ���� 0���� ���.
    if (index == 10 || arrow == 0) {
        ryan[10] += arrow;
        getScore(ryan);
        ryan[10] -= arrow;
        return;
    }
    // ���� ���� ȭ���� ���� >= ����ġ�� K�� ���ῡ �� ȭ���� ���� + 1
    if (havetoShot[index] <= arrow) {
        ryan[index] += havetoShot[index];
        dfs(index + 1, arrow - ryan[index], ryan);
        ryan[index] -= havetoShot[index];
    }
    //���� ���ϴ� ���
    ryan[index] = 0;
    dfs(index + 1, arrow, ryan);
}

vector<int> solution(int n, vector<int> info) {
    
    N = n;
    vector<int> ryan(11, 0);// ���̾��� �ش� �ε����� ������ ��� ������
    for (int i = 0; i < 11; i++)
    {
        havetoShot[i] = info[i] + 1;
    }
    dfs(0, n, ryan);
    if (answer.empty())answer.push_back(-1);
    return answer;
}
/*
1. x���� �� ���� ���� ����� ������. ������ ����ġ, x�� ��ŭ�� 
2. ���� ������ ���� ��� ����ġ�� ���
3. ���� ū ���� ���� �̱�� ���� n���� ���?
4.���̾��� ���� ū ���� ���̷� ����� �� �ִ� ����� ���� ���� �� ���,
 ���� ���� ������ �� ���� ���� ��츦 return

 n<=10 -> ��Ž 10! �ð��ʰ� ���� ����
but x ���� ��� ���� �����ϴ� �ּ� Ƚ���� ������ ����. ����ġ 1�� ���� ��� ��.
�׷� �� ����ġ +1 �� �迭�� ���ҵ��� �����ؼ� ���� ū ���� ���� ��� ��� ã��.
=> 2^11�� ���� dfs ����

���� ����==> ������ �����ֺ��� ��鼭 ���ɿ��θ� Ȯ��-> dfs ��ͷ� ���ϱ�
��� Ÿ�鼭 ���� ȭ�� ������ ������ ���� ������ ���� �������� ������.

������ ���� �� ���� ���.

���� ��� ����:
***dfs�� ���� �������� ������ ���, dfs�� �ϰ� �ٽ� ���ڸ��� ������ ��������Ѵ�.
***���� ��츦 �����ؼ� diff��  0�϶� ������ �־�����Ѵ�.


*/
