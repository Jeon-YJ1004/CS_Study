#include<iostream>
#include<vector>
#include<queue>
using namespace std;
#define ll long long 

int v, e;
ll Answer;

vector <bool> visited;
vector <vector<pair<int,int>>> adj; // <접점, 가중치>


void primMST() {
	priority_queue <pair<int, int>> pq; // <가중치, 접점>
	Answer = 0;
	//1번부터 시작
	for (int i = 0; i < adj[1].size(); i++)
	{
		int next = adj[1][i].first;
		int dis = adj[1][i].second;
		pq.push(make_pair(-dis, next));
	}
	visited[1] = true;
	while (!pq.empty()) {
		int dis = pq.top().first;
		int current = pq.top().second;
		pq.pop();
		if (visited[current] == false) {
			visited[current] = true;
			Answer = Answer + dis;
			for (int i = 0; i < adj[current].size(); i++)
			{
				int nextDistance = adj[current][i].second;
				int Next = adj[current][i].first;
				if (visited[Next] == false) pq.push(make_pair(-nextDistance, Next));
			}
		}
	}
}

int main() {
	cin >> v >> e;
	adj.resize(v + 1);
	visited.resize(v + 1,false);
	for (int i = 0; i < e; i++)
	{
		int a, b, c;
		cin >> a >> b >> c;
		adj[a].push_back( make_pair(b,c));
		adj[b].push_back(make_pair(a, c));
	}
	primMST();
	cout << 0-Answer;
	return 0;
}