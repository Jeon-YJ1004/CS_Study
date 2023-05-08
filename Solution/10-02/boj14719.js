//14719 빗물
// 왼쪽과 오른쪽 블록들 max중 가장 낮은 높이가 현재 블록에 채워질 높이
const fs = require("fs");
let [HW, arr] = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin")
    : `100 18
28 100 43 33 37 100 87 15 52 35 54 86 60 24 99 56 4 40`
)
  .toString()
  .trim()
  .split("\n");

let [height, width] = HW.split(" ").map(Number);
arr = arr.split(" ").map(Number);
let water = 0;
for (let i = 0; i < arr.length; i++) {
  let maxL = Math.max(...arr.slice(0, i + 1));
  let maxR = Math.max(...arr.slice(i));
  let minB = Math.min(maxL, maxR);
  water += minB - arr[i];
}
console.log(water);
