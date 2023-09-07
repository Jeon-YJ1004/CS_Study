//숨바꼭질3
/*
시간 2초, n<=십만
x일때 걷는다면, 1초 후 x-1 or x+1 순간이동하면 0초후 2*x
dp문제, bfs문제,탑 다운 문제
dp[i]=i번째에 도착하는 가장 빠른 시간
dp[i]=min(dp[i-1]+1,dp[i+1]+1,dp[i/2])
2차원 맵이 아닌 1차원 직선에서 이동
*/
const MAXNUM = 100000
const MAXTIME = 987654321
const fs = require("fs");
let [n, k] = fs.readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map(Number)

let count = 0
let dp = Array(MAXNUM + 1).fill(MAXTIME)
dp[n] = 0
let q = [n];
while (q.length !== 0) {
  let curr = q.shift()
  let time = dp[curr]
  if (curr + 1 <= k && dp[curr + 1] > time + 1) {
    dp[curr + 1] = time + 1
    q.push(curr + 1)
  }
  if (curr - 1 >= 0 && dp[curr - 1] > time + 1) {
    dp[curr - 1] = time + 1
    q.push(curr - 1)
  }
  if (curr < k && dp[curr * 2] > time) {
    dp[curr * 2] = time
    q.push(2 * curr)
  }

}
console.log(dp[k])