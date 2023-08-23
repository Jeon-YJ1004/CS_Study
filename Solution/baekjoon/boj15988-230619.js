//9095 문제에 dp+메모제이션
const fs = require("fs");
let [t,...arr]= fs.readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(/\s/)
  .map(Number)
let count=0
let maxNum=Math.max(...arr)
let dp=Array(maxNum+2).fill(0);
dp[1]=1
dp[2]=2
dp[3]=4
for (let i = 4; i <= maxNum; i++) {
  dp[i]= (dp[i-1]+dp[i-2]+dp[i-3])%1000000009
}
for (let e of arr){
  console.log(dp[e])
} 

