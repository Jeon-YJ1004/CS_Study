// 1806 부분합
const fs = require("fs");
let [N, K, ...arr] = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin")
    : `10 15
5 1 3 5 10 7 4 9 2 8`
)
  .toString()
  .trim()
  .split(/\s/)
  .map(Number);

// 투 포인터
let [left, right] = [0, 0];
let sum = arr[0];
let section = N + 1;
while (left < N) {
  if (sum >= K) {
    ///
    let temp = right - left + 1;
    if (section > temp) section = temp;
    sum -= arr[left];
    left++;
  } else {
    //합이 작다면
    right++;
    if (right === N) break;
    sum += arr[right];
  }
}
section === N + 1 ? console.log(0) : console.log(section);
