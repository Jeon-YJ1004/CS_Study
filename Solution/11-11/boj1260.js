// 1260 dfs와 bfs
const fs = require("fs");
let [NMV, ...arr] = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin")
    : `5 5 3
5 4
5 2
1 2
3 4
3 1`
)
  .toString()
  .trim()
  .split("\n");
let [N, M, V] = NMV.split(" ").map(Number);
let road = Array.from({ length: N + 1 }, (e, index) =>
  Array.from({ length: N + 1 }, (el, i) => (index === i ? true : false))
);
for (let i = 0; i < arr.length; i++) {
  let [a, b] = arr[i].split(" ").map(Number);
  road[a][b] = true;
  road[b][a] = true;
}

let count = 0;
let visit = Array(N + 1).fill(false);
let dfs_arr = [];
let bfs_arr = [];
const dfs = (start) => {
  visit[start] = true;
  dfs_arr.push(start);
  if (count === M) return;
  for (let i = 1; i <= N; i++) {
    if (!visit[i] && road[start][i]) {
      count++;
      dfs(i);
    }
  }
};

let queue = [V];
const bfs = (node) => {
  let visited = Array(N + 1).fill(false);
  queue.push(node);
  visited[node] = true;
  bfs_arr.push(node);
  while (queue.length !== 0) {
    let start = queue.shift();
    for (let i = 1; i <= N; i++) {
      if (!visited[i] && road[start][i]) {
        queue.push(i);
        visited[i] = true;
        bfs_arr.push(i);
      }
    }
  }
};
dfs(V);
bfs(V);
console.log(dfs_arr.join(" "));
console.log(bfs_arr.join(" "));
