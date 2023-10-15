#include<iostream>
#include<vector>
#include<queue>
#include<string>;
using namespace std;


int main() {
	int n, m;
	string answer;
	priority_queue <int,vector<int>,greater<int>> pq;
	cin >> n >> m;
	vector <vector<int>> preProb(n+1);//i번째 인덱스의 자식
	vector <int> entry(n + 1,0);//i번째 문제의 선행 문제 수(부모 개수)
	for (int i = 0; i <= n; i++) {
		preProb[i] = {};
	}
	for (int i = 0; i < m; i++) {
		int c, p;
		cin >> p >> c;
		preProb[p].push_back(c);
		entry[c]++;
	}
	//차수가 없는 애들 우선순위 큐에 넣기
	for (int i = 1; i <=n; i++) {
		if (entry[i]==0) {
			pq.push(i);
		}
	}
	while (!pq.empty()) {
		int curr = pq.top();
		pq.pop();
		answer += to_string(curr)+" ";
		for (auto c : preProb[curr]) {
			entry[c]--;
			if (entry[c] == 0)pq.push(c);
		}
	}
	cout << answer;
}

/*
유니온 파인드? 위상정렬?
입력을 받으면서 adj 갱신
선행 문제가 없는애들은 그냥 넣다가
선행되야하는애를 만나면 parent가 선행되야하는 애가 없을 때까지 갔다가 ...
그럼 선행되지 않아도 되는 애들을 따로 배열로 만들고 
유니온 파인드를 진행한다음에 돌자.
//잘 안됌
위상정렬에서 큐를 우선순위큐로 구현해보자
*/