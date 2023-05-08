// 2110 공유기 설치
const fs = require("fs");
let [N, C, ...home] = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin")
    : `5 3
1
2
8
4
9`
)
  .toString()
  .trim()
  .split(/\s/)
  .map(Number);

home.sort((a, b) => a - b);
const tempstart = home[0];
home = home.map((v) => v - tempstart + 1);
let start = home[0];
let mid = 0;
let end = home[home.length - 1];
let count = 0;
let prev = home[0];
while (start <= end) {
  mid = Math.floor((start + end) / 2);
  let cnt = 1;
  prev = home[0];
  for (let i = 1; i < home.length; i++) {
    if (home[i] >= prev + mid) {
      cnt++;
      prev = home[i];
    }
  }
  if (cnt < C) {
    end = mid - 1;
  } else {
    start = mid + 1;
    if (mid > count) count = mid;
  }
}
console.log(count);
