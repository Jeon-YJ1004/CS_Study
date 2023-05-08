//11266 단절점
//미해결
const fs = require("fs");
let [NM, ..._arr] = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin")
    : `7 7
1 4
4 5
5 1
1 6
6 7
2 7
7 3`
)
  .toString()
  .trim()
  .split("\n");
let [N, M] = NM.split(" ").map(Number);
let adj = Array.from({ length: N + 1 }, (v) => []);
let answer = [];
//루트 노드부터의 해당 정점까지 찾은 순서
let order = Array(N + 1).fill(0);

// 연결된 근접 정점 배열
for (let i = 0; i < M; i++) {
  let [a, b] = _arr[i].split(" ").map(Number);
  adj[a].push(b);
  adj[b].push(a);
}
/*
단절점인경우:
정점 v의 방문 순서 <= 정점 v의 low(v이후에 방문하는 정점들 중 우회 하고 방문 가능한 점중 최소값)
시작 정점이면 2<= 정점 v의 자식 트리수 이면 a는 단절점
 */
//모든 정점에 대하여 dfs

const dfs = (v, isRoot) => {
  //현재 노드의 low 리턴
};
for (let i = 0; i < N; i++) {
  if (order[i] === 0) dfs(i, true);
}
console.log(answer.length);
console.log(
  answer.sort(function (a, b) {
    return a - b;
  })
);
