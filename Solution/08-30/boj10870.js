//10870 피보나치 수 5
const fs = require("fs");
const [n] = (
  process.platform === "linux" ? fs.readFileSync("/dev/stdin") : `18`
)
  .toString()
  .trim()
  .split("\n");

let pibo = [
  0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597,
];
let count = 17;
if (n <= 17) console.log(pibo[n]);
else {
  for (let i = n - 17; i > 0; i--) {
    let next = pibo[count] + pibo[count - 1]; // 첫 for문은 18번째 수
    pibo.push(next);
    count++;
  }
  console.log(pibo[n]);
}
