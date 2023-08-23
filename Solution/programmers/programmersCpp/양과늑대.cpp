#include <string>
#include <vector>
#include<algorithm>
#include<list>
using namespace std;

vector <vector<int>> adj;
vector <int> infos;
int maxSheep=0;
//visit�� �ʿ����. ������ �ڽĳ�常 ���ǰ� cango�� �߰��ϱ� ������
// ���� ���, ���� �� , ������ ��,�����ִ� �� ��,���� ���� ������ ��� ����Ʈ
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
����Ʈ��.
��<=���� ��� �� ����, ������ �����鼭 �ִ�� ���� �� �ִ� ���� ��
��� ����<=17, ���ѽð� 10��. ��Ž->��� �湮 ��� . �����Ѱ�? 
bfs,dfs �� �ϳ� ����
bfs: ť�� ���� ��, ������ �� ����
dfs: �湮�� �迭�� ���� ��, ������ �� ����
Ʈ���� �Ž��� �ö� ���� ����. ������ ��湮 �� ��/���� ������ ��ȭ�� ����
�Ž��� �ö󰡾��ϴ� ����-> �� ���� ��� �湮�Ϸ���. �׷� �湮 ������ ��带 ���� ��Ƶдٸ�?
�湮 ������ ���� �ִ� ���� �޶�����. 

�ڷᱸ��:
- struct : node< index,sheep, wolf>
- array[bool] : visited[info.len]
- vector[int][int] : adj
- int : sheepnum ���� ���� , dfs ���鼭 ���� ���� �ִ� ���� �� ȹ���ߴٸ� ����
- vector[int] : canGo

�ذ� ���:
1. ����� �׷��� -> ���ʿ��� ���� ���ȣ��
2. visited �迭 ����ȭ. ���Ǽ�, ������ �� ,�湮����
3. �� �� �ִ� ������ ���� ��Ƽ� ���ȣ��
-�湮 �� ����� üũ
4. dp�� n���� ���� ��θ� �������� n+1 ������ ���� �� �ִ� ��� ���ϱ� �ݺ�,

*** Ʋ�� ����:
* List�� BidirectionalIterator�̹Ƿ� ���������� �����Ѵ�.
erase()�� �ش� ���Ұ� �����Ǹ� ���� ��ġ�� �Ҿ������. 
���� Iterator=List.erase(Iterator)�� ���ϰ��� ����ؾ��Ѵ�.
*/