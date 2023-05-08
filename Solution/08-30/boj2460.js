//2460 지능형 기차2
const fs = require("fs");
const [...arr] = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin")
    : `0 32
3 13
28 25
17 5
21 20
11 0
12 12
4 2
0 8
21 0`
)
  .toString()
  .trim()
  .split("\n");
let num = 0;
let max = 0;
for (let i = 0; i < arr.length; i++) {
  let [getOut, getIn] = arr[i].split(" ").map(Number);
  if (i == 0) {
    max = getIn;
  }
  num = num - getOut + getIn;
  max = num > max ? num : max;
}
console.log(max);
