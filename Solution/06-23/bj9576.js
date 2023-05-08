const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const n = +input[0];
const [book, m] = input[1].split(" ").map(Number);

let arr = [];
let answer = 0;
for (let k = 0; k < n; k++) {
  for (let i = 2; i < input.length; i++) {
    const arr_ = input[i].split(" ").map(Number);
    arr.push(arr_);
  }
  // a,b 중 b 기준으로 오름차순 정렬 후 a 기준 d오름차순.
  arr.sort(function (a, b) {
    if (a[1] === b[1]) {
      return a[0] - b[0];
    } else {
      return a[1] - b[1];
    }
  });
  let give = Array.from({ length: book + 1 }, () => 0);
  for (let i = 0; i < m; i++) {
    if (give[arr[i][1]] === 0) {
      give[arr[i][1]] = 1;
      answer += 1;
    } else {
      for (let j = arr[i][1] - 1; j >= arr[i][0]; j--) {
        if (give[j] === 0) {
          give[j] = 1;
          answer += 1;
          break;
        }
      }
    }
  }
  console.log(answer);
}
