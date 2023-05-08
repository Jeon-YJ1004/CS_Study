//2252 줄 세우기
//미해결
//M이 100000개=> 인접리스트 사용. 시간복잡도를 고려하여.. 위상정렬
const fs = require("fs");
const [NM, ..._arr] = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin")
    : fs.readFileSync("input.txt")
)
  .toString()
  .trim()
  .split("\n");
let [N, M] = NM.split(" ").map(Number);
let arr = Array(N).fill(0);
let parent = Array.from({ length: N + 1 }, (v, i) => i);
for (let i = 0; i < M; i++) {}
