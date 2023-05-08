// 시간초과 뜸. 우선순위큐로 풀어야 해결가능

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const n = +input[0];
let arr = [];
for (let i = 1; i < input.length; i++) {
  const arr_ = input[i].split(" ").map(Number);
  arr.push(arr_);
}
// 데드라인,컵라면수
// 컵라면 수로 정렬.
let answer = 0;
let max_day = Math.max.apply(
  null,
  arr.map((el) => el[0])
);
let day = Array.from({ length: max_day + 1 }, () => 0);
arr.sort(function (a, b) {
  return b[1] - a[1];
});
for (let i = 0; i < n; i++) {
  if (day[arr[i][0]] === 0) {
    day[arr[i][0]] = 1;
    answer += arr[i][1];
  } else {
    for (let j = arr[i][0] - 1; j > 0; j--) {
      if (day[j] === 0) {
        day[j] = 1;
        answer += arr[i][1];
        break;
      }
    }
  }
}
console.log(answer);
