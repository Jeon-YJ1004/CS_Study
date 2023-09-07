// 10844 쉬운 계단 수 
/*
dp
0과 9로 끝나는 수가 몇개인지 확인하면서 
dp[x][y]=x자리 수 중 y로 끝나는 수의 개수
dp[x][0]=dp[x-1][1]
dp[x][9]=dp[x-1][8]
dp[x][y]=dp[x-1][y-1]+dp[x-1][y+1], y는 1~8
***헤멘 이유: 마지막에도 100000을 나눠줘야한다!
*/
const fs = require("fs");
let n = fs.readFileSync("/dev/stdin")
  .toString()
  .trim()
n = Number(n)
let dp = Array.from({ length: n + 1 }, e => Array.from({ length: 10 }, e => 0))
for (let i = 1; i <= 9; i++) {
  dp[1][i] = 1
}
for (let i = 2; i <= n; i++) {
  dp[i][0] = dp[i - 1][1] % 1000000000
  dp[i][9] = dp[i - 1][8] % 1000000000
  for (let j = 1; j <= 8; j++)
    dp[i][j] = (dp[i - 1][j - 1] + dp[i - 1][j + 1]) % 1000000000
}
let sum = dp[n].reduce((acc, curr) => acc + curr, 0)

console.log(sum % 1000000000);