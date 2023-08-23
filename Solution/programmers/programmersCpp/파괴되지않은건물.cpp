#include <string>
#include <vector>

using namespace std;

int solution(vector<vector<int>> board, vector<vector<int>> skill) {
    int answer = 0;
    int n = board.size();
    int m = board[0].size();
    vector <vector<int>> sum(n + 1, vector<int>(m + 1, 0));
    //��ȭ�� ����
    for (auto s : skill) {
        int type = s[0], x1 = s[1], y1 = s[2], x2 = s[3], y2 = s[4], value = s[5];
        if (type == 1)//����
            value = -value;
        sum[x1][y1] += value;
        sum[x1][y2 + 1] -= value;
        sum[x2 + 1][y1] -= value;
        sum[x2 + 1][y2 + 1] += value;
    }
    for (int i = 1; i < n; i++)
    {
        for (int j = 0; j < m; j++)
        {
            //���������� �б�
            sum[i][j] += sum[i - 1][j];
        }
    }
    for (int i = 0; i < n; i++)
    {
        for (int j = 1; j < m; j++)
        {
            //������ �б�
            sum[i][j] += sum[i][j - 1];
        }
    }
    for (int i = 0; i < n; i++)
    {
        for (int j = 0; j < m; j++)
        {
            if (sum[i][j] + board[i][j] > 0) answer++;
        }
    }
    return answer;
}

/*
n*m 1000*1000, skill <=25��
... ��Ž ���� ����� �ֳ�?
�迭 ��ȸ�� ������ ���� �ٲ��ֱ� 1000000*25�� ���� �ȉ� NlogN���� �����ؾ���
���� �� �ִ� ���
�и� �˰��ִ� �˰������� Ǯ �� �ִ� ���� �ϰ�
bfs/dfs, �ּҰ���ġ �� �׷��� Ž�� �˰���,  dp, Ʈ�� ������,LCA, ������, ��������, ��Ʈ ����ŷ, �̺�Ž��..
������? ��Ʈ ����ŷ?  dp 

���� ��ȸ�� ���� �ʰ� �� ĭ�� ������ ������ ������ �� �ִ� �����.

�������̶��,.. 
� ���� ���� �ʿ�? ��ų�� ���� �����Ǵ� ���� ����. �ٵ� ��� ĭ���� �ٸ��� ����.
Ʈ��ȭ�� ���� ���ȭ�� ���� ���⵵ ������

��Ʈ ����ŷ���Ӷ��,,,.
 ���� ���� ��

dp���...
��ȭ�� ����. ū ���� �ȿ� ���� ����. �޸����¡. ū����:0,0~n,n ���� ����:  x,y~x,y?
**�߸� �����Ѱ�
* �������� Ʈ���θ� �����Ų��.
* 
=> ����(����)�� ����Ǵ� ��ȭ���� ��ȸ���� �ʰ� �����ð� �ȿ� Ǯ��
������ �������� +��ȭ��, ������ �� ������ - ��ȭ��
�̴� ��,�� �Ѵ� �����ؾ���.
*/