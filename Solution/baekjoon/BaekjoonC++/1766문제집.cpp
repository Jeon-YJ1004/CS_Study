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
	vector <vector<int>> preProb(n+1);//i��° �ε����� �ڽ�
	vector <int> entry(n + 1,0);//i��° ������ ���� ���� ��(�θ� ����)
	for (int i = 0; i <= n; i++) {
		preProb[i] = {};
	}
	for (int i = 0; i < m; i++) {
		int c, p;
		cin >> p >> c;
		preProb[p].push_back(c);
		entry[c]++;
	}
	//������ ���� �ֵ� �켱���� ť�� �ֱ�
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
���Ͽ� ���ε�? ��������?
�Է��� �����鼭 adj ����
���� ������ ���¾ֵ��� �׳� �ִٰ�
����Ǿ��ϴ¾ָ� ������ parent�� ����Ǿ��ϴ� �ְ� ���� ������ ���ٰ� ...
�׷� ������� �ʾƵ� �Ǵ� �ֵ��� ���� �迭�� ����� 
���Ͽ� ���ε带 �����Ѵ����� ����.
//�� �ȉ�
�������Ŀ��� ť�� �켱����ť�� �����غ���
*/