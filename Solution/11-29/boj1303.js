// 1303 전투
// dfs 스택 오버 , bfs 시간초과
let fs = require("fs");
let [NM, ...arr] = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin")
    : `5 5
WBWWW
WWWWW
BBBBB
BBBWW
WWWWW`
)
  .toString()
  .trim()
  .split("\n");

let [N, M] = NM.split(" ").map(Number);
for (let i = 0; i < N; i++) {
  arr[i] = arr[i].split("");
}

const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];
let white_sum = 0;
let blue_sum = 0;

const dfs = (a, b, team, count) => {
  arr[a][b] = "visited";
  for (let i = 0; i < 4; i++) {
    let x = a + dx[i];
    let y = b + dy[i];
    if (0 <= x && x < M && 0 <= y && y < N) {
      if (arr[x][y] == team) count = dfs(x, y, team, count + 1);
    }
  }

  return count;
};

for (let i = 0; i < M; i++) {
  for (let j = 0; j < N; j++) {
    if (arr[i][j] === "W") {
      result = dfs(i, j, "W", 1);
      white_sum += result * result;
    } else if (arr[i][j] === "B") {
      result = dfs(i, j, "B", 1);
      blue_sum += result * result;
    }
  }
}
console.log(white_sum, blue_sum);

// const bfs = (a, b, team) => {
//   let count = 0;
//   let queue = [];
//   queue.push([a, b]);
//   arr[a][b] = "visited";
//   while (queue.length) {
//     [a, b] = queue.shift();
//     count++;
//     for (let i = 0; i < 4; i++) {
//       let x = a + dx[i];
//       let y = b + dy[i];
//       if (0 <= x && x < M && 0 <= y && y < N) {
//         if (arr[x][y] == team) {
//           queue.push([x, y]);
//           arr[x][y] = "visited";
//         }
//       }
//     }
//   }
//   return count;
// };
// for (let i = 0; i < M; i++) {
//   for (let j = 0; j < N; j++) {
//     if (arr[i][j] === "W") {
//       result = bfs(i, j, "W");
//       white_sum += result * result;
//     } else if (arr[i][j] === "B") {
//       result = bfs(i, j, "B");
//       blue_sum += result * result;
//     }
//   }
// }

// console.log(white_sum, blue_sum);
