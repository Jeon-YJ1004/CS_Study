//15486 퇴사 2
/*
n일 동안, 하루에 하나씩 서로 다른 사람의 상담 n<=백오십만
구현. 완전탐색. 시간초과 2^백오십만 의 경우의 수
그리디. 최적 보장 못함
dp. dp[n]=n일차 최대 금액.
dp[1],dp[2],dp[3]=0
dp[4]=1일 선택 or 3일 선택. 10
dp[5]=1일+4일 or 3일.30
dp[6]=1+4 or 3. 30 10 or 30 
dp[7]=1+4 or 3+5 or 2 . 
dp[n]=max(,dp[n-2]+n-2일차 t가 2.dp[n-1], dp[n-1]+n일짜 일이 1)

*/

const fs = require("fs");
let [n, ...arr] = fs.readFileSync("dev/stdin")
  .toString()
  .trim()
  .split("\n")

n = Number(n)
let dp = Array(n + 1).fill(0)

arr.forEach((e, i) => {
  let [t, p] = e.split(" ").map(Number)
  if (i + 1 <= n && t !== 1)
    dp[i + 1] = Math.max(dp[i], dp[i + 1])
  if (i + t <= n)
    dp[i + t] = Math.max(dp[i + t], dp[i] + p)
})
console.log(dp[n])