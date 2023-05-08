//2667 단지번호 붙이기
let fs = require("fs");
let [n, ...arr] = (
  process.platform === "linux"
    ? fs.readFileSync("dev/stdin")
    : `7
0110100
0110101
1110101
0000111
0100000
0111110
0111000`
)
  .toString()
  .trim()
  .split("\n");

for (let i = 0; i < arr.length; i++) {
  arr[i] = arr[i].split("").map(Number);
}
n = Number(n);
class Info {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
const bfs = (y, x) => {
  const dy = [1, -1, 0, 0];
  const dx = [0, 0, -1, 1];
  const queue = [];
  let cnt = 1;
  queue.push([y, x]);
  arr[y][x] = 0;

  while (queue.length) {
    let point = queue.shift();
    let [pointY, pointX] = point;

    for (let i = 0; i < 4; i++) {
      let nY = pointY + dy[i];
      let nX = pointX + dx[i];
      if (nX < 0 || nY < 0 || nX >= n || nY >= n) {
        continue;
      }

      if (arr[nY][nX] === 1) {
        queue.push([nY, nX]);
        arr[nY][nX] = 0;
        cnt++;
      }
    }
  }
  return cnt;
};
let count = [];
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (arr[i][j] === 1) {
      count.push(bfs(i, j));
    }
  }
}

count.sort((a, b) => a - b); //오름차순 정렬
console.log(count.length);
count.map((el) => console.log(el)); //map함수로 순회

//bfs 틀린코드.. 왜?
// const bfs = (startX, startY) => {
//   let dx = [0, 1, 0, -1];
//   let dy = [1, 0, -1, 0];
//   let queue = [];
//   queue.push(new Info(startX, startY));
//   let cnt = 1;
//   while (queue.length) {
//     let node = queue.shift();
//     for (let i = 0; i < 4; i++) {
//       let nextX = node.x + dx[i];
//       let nextY = node.y + dy[i];
//       if (
//         nextX >= 0 &&
//         nextX < n &&
//         nextY >= 0 &&
//         nextY < n &&
//         arr[nextX][nextY] === 1
//       ) {
//         // 방문
//         arr[nextX][nextY] = 0;
//         queue.push(new Info(nextX, nextY));
//         cnt++;
//       }
//     }
//   }
//   return cnt;
// };
