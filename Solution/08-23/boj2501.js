//2501  약수구하기
const fs = require("fs");
const [N, K] = (
  process.platform === "linux" ? fs.readFileSync("/dev/stdin") : "3 2"
)
  .toString()
  .trim()
  .split(" ")
  .map(Number);

let divisor = [0, 1, N];
let root = Math.sqrt(N);
for (let i = 2; i <= root; i++) {
  if (N % i == 0) {
    divisor.push(i);
    if (N / i != i) divisor.push(N / i);
  }
}
divisor.sort(function (a, b) {
  return a - b;
});
console.log(divisor);
if (K < divisor.length) console.log(divisor[K]);
else console.log(0);
