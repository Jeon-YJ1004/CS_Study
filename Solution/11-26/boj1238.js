// 1238 파티
let fs = require("fs");
let [NMX, ...arr] = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin")
    : `4 8 2
1 2 4
1 3 2
1 4 7
2 1 1
2 3 5
3 1 2
3 4 4
4 2 3`
)
  .toString()
  .trim()
  .split("\n");
let [N, M, X] = NMX.split(" ").map(Number);
let matrix = Array.from({ length: N + 1 }, (element, index) =>
  Array.from({ length: N + 1 }, (e, i) => (index === i ? 0 : Infinity))
);
for (let i = 0; i < arr.length; i++) {
  const [a, b, t] = arr[i].split(" ").map(Number);
  matrix[a][b] = t;
}
// 각 노드에서 x로 오고 가는데 최소 시간
// 플로이드

for (let i = 1; i < N + 1; i++) {
  for (let j = 1; j < N + 1; j++) {
    for (let k = 1; k < N + 1; k++) {
      if (matrix[j][i] + matrix[i][k] < matrix[j][k])
        matrix[j][k] = matrix[j][i] + matrix[i][k];
    }
  }
}
let result = 0;
for (let i = 1; i < N + 1; i++) {
  if (i === X) continue;
  result = Math.max(result, matrix[i][X] + matrix[X][i]);
}
console.log(result);
