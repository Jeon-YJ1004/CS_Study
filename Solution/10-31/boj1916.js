// 1916 최소비용 구하기
// 미해결
const fs = require("fs");
let [N, M, ...arr] = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin")
    : `5
8
1 2 2
1 3 3
1 4 1
1 5 10
2 4 2
3 4 1
3 5 1
4 5 3
1 5`
)
  .toString()
  .trim()
  .split("\n");
