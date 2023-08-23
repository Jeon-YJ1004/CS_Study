#include <string>
#include <vector>
#include<algorithm>
#include<list>
using namespace std;

vector <vector<int>> adj;
vector <int> infos;
int maxSheep=0;
//visit은 필요없다. 어차피 자식노드만 살피고 cango에 추가하기 때문에
// 현재 노드, 양의 수 , 늑대의 수,남아있는 양 수,현재 접근 가능한 노드 리스트
void dfs(int curr,int s,int w,int remainSheep, list <int> canGo) {
    if (infos[curr] == 1) {
        ++w;
        if (s <= w)return;
    }
    else {
        ++s;
        remainSheep--;
        maxSheep = max(s, maxSheep);
    }
    list <int> newCanGo(canGo);

    for (auto i : adj[curr]) 
        newCanGo.emplace_back(i);
     newCanGo.remove(curr);
     for (auto next : newCanGo)
         dfs(next, s, w, remainSheep, newCanGo);
    return;
}
int solution(vector<int> info, vector<vector<int>> edges) {
    int answer = 0;
    int sheeps = 0;
    adj.resize(info.size());
    list <int> cango;

    infos = info;
    for (auto i:info)
    {
        if (i == 0)sheeps++;
    }
    for (auto i : edges) {
        adj[i[0]].push_back(i[1]);
    }
    dfs(0,0,0,sheeps-1,cango);
    return maxSheep;
}

/*
이진트리.
양<=늑대 모든 양 먹음, 먹히지 않으면서 최대로 모을 수 있는 양의 수
노드 개수<=17, 제한시간 10초. 완탐->모든 방문 경로 . 가능한가? 
bfs,dfs 중 하나 선택
bfs: 큐에 양의 수, 늑대의 수 저장
dfs: 방문할 배열에 양의 수, 늑대의 수 저장
트리를 거슬러 올라갈 수도 있음. 하지만 재방문 시 양/늑대 수에는 변화가 없음
거슬러 올라가야하는 이유-> 그 다음 노드 방문하려고. 그럼 방문 가능한 노드를 따로 모아둔다면?
방문 순서에 따라 최대 값이 달라진다. 

자료구조:
- struct : node< index,sheep, wolf>
- array[bool] : visited[info.len]
- vector[int][int] : adj
- int : sheepnum 양의 개수 , dfs 돌면서 만약 갖고 있는 양을 다 획득했다면 종료
- vector[int] : canGo

해결 방법:
1. 양방향 그래프 -> 불필요한 무한 재귀호출
2. visited 배열 삼중화. 양의수, 늑대의 수 ,방문여부
3. 갈 수 있는 정점을 따로 담아서 재귀호출
-방문 후 늑대수 체크
4. dp로 n마리 모은 경로를 바탕으로 n+1 마리를 모을 수 있는 경우 구하기 반복,

*** 틀린 이유:
* List는 BidirectionalIterator이므로 순차적으로 접근한다.
erase()로 해당 원소가 삭제되면 다음 위치를 잃어버린다. 
따라서 Iterator=List.erase(Iterator)로 리턴값을 사용해야한다.
*/