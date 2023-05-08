#include<iostream>
#include<vector>
#include<algorithm>
using namespace std;
#define ll long long 

int v, e;
struct Edge {
	int a;
	int b;
	int cost;
	
};
bool compare(const Edge& a,const Edge& b) {

	return a.cost > b.cost;
}
vector <Edge> adj;
vector <int> visited; 
vector <int> parent;



//union find
int findParent(int a) {
	if (a == parent[a])return a;
	return findParent(parent[a]);
}

void unionParent(int a, int b) {
	int aP = findParent(a);
	int bP = findParent(b);
	if (aP == bP) return;
	if (aP > bP)parent[aP] = bP;
	else parent[bP] = aP;
	
}


ll Kruskal() {
	ll answer=0;
	sort(adj.begin(), adj.end(), compare);

	while (!adj.empty()) {
		int currA = adj.back().a;
		int currB = adj.back().b;
		int currCost = adj.back().cost;
		adj.pop_back();
		//싸이클이 없으면 간선 선택 
		if (findParent(currA) != findParent(currB)) {
			visited[currA] = true;
			visited[currB] = true;
			unionParent(currA, currB);
			answer += currCost;
		}
	}
	return answer;
}

int main() {
	ios_base::sync_with_stdio(0);
	cin.tie(0);
	cout.tie(0);
	cin >> v >> e;
	adj.resize(e + 1);
	visited.resize(v + 1,false);
	parent.resize(v + 1);
	for (int i = 1; i <= v; i++)
	{
		parent[i] = i;
	}

	for (int i = 0; i < e; i++)
	{
		int a,b,c;
		cin >> a >> b >> c;
		adj.push_back(Edge{ a, b, c });
	}
	
	cout << Kruskal();
	return 0;
}