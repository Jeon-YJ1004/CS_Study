//2309 일곱 난쟁이
//9C7하여 조합. 키의 합이 100인 경우만 고려
const fs = require("fs");
const [...arr] = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin")
    : `20
7
23
19
10
15
25
8
13`
)
  .toString()
  .trim()
  .split("\n")
  .map(Number);

let sum = arr.reduce((a, c) => a + c);
let flag = 0;
for (let i = 0; i < 9; i++) {
  for (let j = 1; j < 9; j++) {
    if (sum - arr[i] - arr[j] == 100) {
      arr.splice(j, 1);
      arr.splice(i, 1);
      flag = 1;
      break;
    }
  }
  if (flag == 1) break;
}
arr.sort((a, b) => a - b).forEach((e) => console.log(e));
