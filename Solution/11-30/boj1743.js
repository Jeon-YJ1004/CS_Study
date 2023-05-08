// 1743 음식물 피하기
let fs = require("fs");
let [NMK, ...arr] = (
  process.platform === "linux"
    ? fs.readFileSync("dev/stdin")
    : `3 4 5
3 2
2 2
3 1
2 3
1 1`
)
  .toString()
  .trim()
  .split("\n");

let [N, M, K] = NMK.split(" ").map(Number);

let graph = Array.from({ length: N }, (element) =>
  Array.from({ length: M }, (e) => "F")
);
for (let i = 0; i < K; i++) {
  let [a, b] = arr[i].split(" ").map(Number);
  graph[a - 1][b - 1] = "T";
}

let dx = [1, 0, -1, 0];
let dy = [0, 1, 0, -1];
let count = [];
const bfs = (a, b) => {
  let queue = [];
  let sum = 1;
  queue.push([a, b]);
  graph[a][b] = "visited";
  while (queue.length) {
    [a, b] = queue.shift();
    for (let i = 0; i < 4; i++) {
      let x = a + dx[i];
      let y = b + dy[i];
      if (x >= 0 && x < N && y >= 0 && y < M && graph[x][y] === "T") {
        queue.push([x, y]);
        graph[x][y] = "visited";
        sum++;
      }
    }
  }
  return sum;
};

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (graph[i][j] === "T") count.push(bfs(i, j));
  }
}
console.log(Math.max(...count));
