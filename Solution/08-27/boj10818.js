//10818 최소, 최대
// 문제 잘 읽기! 수가 하나 일 경우 주의
const fs = require("fs");
const [N, _arr] = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin")
    : `1
-1`
)
  .toString()
  .trim()
  .split("\n");

let arr = _arr.split(" ");
let min = Number(arr[0]);
let max = Number(arr[0]);

arr.forEach((e) => {
  if (Number(e) > max) max = Number(e);
  if (Number(e) < min) min = Number(e);
});
console.log(min + " " + max);
