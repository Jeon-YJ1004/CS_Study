const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [n, ...arr] = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map(Number);

let answer = 0;
arr.sort(function (a, b) {
  return a - b;
});
for (let i = 0; i < n; i++) {
  answer += Math.abs(i + 1 - arr[i]);
}

console.log(answer);
