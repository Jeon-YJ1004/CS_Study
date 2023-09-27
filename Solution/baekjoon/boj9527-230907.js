//1446 지름길
/*
하나의 고속도로를 지름길을 써서 지나갈때 거리 최솟값, 가중치는 음이 아닌 정수
n<=12, d<만 시간ㅊ제한 2초 넉넉
dp[n]=n까지 거리 최솟값
지름길 배열을 돌면서 거리 갱신, 역주행이 안되기 때문에 원하는 거리보다 더 가는 지름길이면 못 탐
*/

const fs = require("fs");
let [nd, ...arr] = (
  process.platform === "linux"
    ? fs.readFileSync("dev/stdin")
    : `8 900
0 10 9
20 60 45
80 190 100
50 70 15
160 180 14
140 160 14
420 901 5
450 900 0`)
  .toString()
  .trim()
  .split("\n")


let [n, d] = nd.split(" ").map(Number)
let dp = Array.from({ length: d + 1 }, (e, i) => i)
// 지름길 배열 정렬
for (let i = 0; i < n; i++) {
  let [start, end, len] = arr[i].split(" ").map(Number)
  arr[i] = [start, end, len]
}
arr.sort((a, b) => { return a[1] - b[1] })
arr.forEach((e, i) => {
  let temp = dp[e[0]] + e[2]
  if (e[1] > d) return
  if (e[2] > e[1] - e[0]) return
  if (dp[e[1]] > temp) {
    dp[e[1]] = temp
    for (let j = 1; j <= d; j++) {
      dp[e[1] + j] = dp[e[1]] + j
    }
  }
})
console.log(dp[d])