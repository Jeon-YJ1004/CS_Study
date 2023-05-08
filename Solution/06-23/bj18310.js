// 틀린코드.. 왜?
// 아래는 백준에 제출한 파이썬 코드. 알고리즘은 같음.. ㅜ
// n = int(input())
// house_li = []
// house_li = list(map(int, input().rstrip().split()))
// house_li.sort()
// print(house_li[(n-1)//2])

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [n, ...arr] = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split(/\s+/)
  .map(Number);
arr.sort(function (a, b) {
  return a - b;
});
const index = parseInt((n - 1) / 2);

console.log(arr[index]);
