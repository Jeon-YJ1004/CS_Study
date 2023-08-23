#include <string>
#include <vector>

using namespace std;

int solution(vector<vector<int>> board, vector<vector<int>> skill) {
    int answer = 0;
    int n = board.size();
    int m = board[0].size();
    vector <vector<int>> sum(n + 1, vector<int>(m + 1, 0));
    //변화량 누적
    for (auto s : skill) {
        int type = s[0], x1 = s[1], y1 = s[2], x2 = s[3], y2 = s[4], value = s[5];
        if (type == 1)//공격
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
            //오른쪽으로 밀기
            sum[i][j] += sum[i - 1][j];
        }
    }
    for (int i = 0; i < n; i++)
    {
        for (int j = 1; j < m; j++)
        {
            //밑으로 밀기
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
n*m 1000*1000, skill <=25만
... 완탐 말고 방법이 있나?
배열 순회로 일일히 값을 바꿔주기 1000000*25만 절대 안됌 NlogN으로 가능해야함
줄일 수 있는 방법
분명 알고있는 알고리즘으로 풀 수 있는 문제 일것
bfs/dfs, 최소가중치 등 그래프 탐색 알고리즘,  dp, 트리 구간합,LCA, 정수론, 위상정렬, 비트 마스킹, 이분탐색..
누적합? 비트 마스킹?  dp 

뭘까 순회를 하지 않고 각 칸의 내구도 증감을 누적할 수 있는 방법이.

누적합이라면,.. 
어떤 누적 합이 필요? 스킬을 통해 증감되는 값의 누적. 근데 얘는 칸마다 다르게 누적.
트리화로 범위 노드화는 공간 복잡도 터질듯

비트 마스킹ㅇㅣ라면,,,.
 몰라 어케 해

dp라면...
점화식 세워. 큰 문제 안에 작은 문제. 메모라이징. 큰문제:0,0~n,n 작은 문제:  x,y~x,y?
**잘못 생각한것
* 누적합을 트리로만 연결시킨것.
* 
=> 구간(범위)에 적용되는 변화량을 순회하지 않고 선형시간 안에 풀때
범위의 시작점에 +변화량, 범위의 끝 다음에 - 변화량
이는 행,열 둘다 수행해야함.
*/