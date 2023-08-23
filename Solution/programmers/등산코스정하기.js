function solution(n, paths, gates, summits) {
    let answer = [];
    let node = new Array.from({ length: n + 1 }, e => [])
    path.forEach((e) => {
        const [i, j, w] = e
        node[i].push([j, w])
        node[j].push([i, w])
    })
    //산봉우리랑 게이트는 간선 제거
    gates.forEach(e => node[e] = [])
    summits.forEach(e => node[e] = [])

    for (let i in gates) {
        //bfs 시작
        let q = []
        q.push(i)
        while (q.length !== 0) {
            let curr = q.pop()
            let value = node[curr][intensity]
            //curr의 인접한 노드 intensity
            for (let j = 0; j < node[curr][adj].length; j++) {
                let next = node[curr][adj][j]
                if (node[next][canGo] && node[curr][intensity] > node[next][intensity]) { //쉼터이다
                    q.push(next)
                    node[next][intensity] = Math.max(node[curr][intensity], node[next][intensity])
                }
            }
        }
    }
    return answer;
}

/*
그래프. 정점 <=5만 ,간선 <=2십만

휴식 없이 이동->경로에 쉼터/산봉우리가 없다
휴식이 없는 가장 긴 시간 경로=> intensity 시간

등산코스에서 출입구는 처음과 끝에 한 번씩, 산봉우리는 한 번만 포함
intensity 최소가 되는 경로는? =/= 총 가중치가 적은 경로랑 다른 말임

gates와 summits에 등장하지 않은 지점은 모두 쉼터
=>그냥 경로상의 간선중 최대 가중치가 제일 작은 경로를 구하면 됌 

1. 모든 출입구에서 모든 봉우리를 가는 각각의 경로 구하기 0(n*m)출입구수*봉우리수
2. 구하면서 intensity 배열 갱신하기.
-> O(n^2)시간복잡도 최대 6억2500,,,25억,,, 불가능

1. 가중치가 가장 작은 간선을 찾는다
2. 이 간선으로 갈 수 있는 봉우리를 찾는다 bfs
3. 코스의 규칙을 따르는지 확인한다.
  -출입구에서 시작해서 그 출입구를 마지막으로 한다
  -봉우리는 하나만 지난다.
  
n = 50000
문제 단순화
출발점에서 도착점까지 가는 경로들 중, 경로 가중치의 최댓값이 가장 작은 것.
출발점과 도착점이 같으므로, 돌아오는 길은 생각하지 않아도 됨.

완전 탐색.
현재 지점에서 연결된 정점들을 모두 탐색한다.
각 정점으로 가는데 필요한 가중치를 저장한다.

다익스트라

*/