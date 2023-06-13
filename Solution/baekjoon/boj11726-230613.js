//dp
//dp[i]=dp[i-2]+dp[i-1]
// n 값은 1000 이하. dp 배열 값에서 오버플로우 발생 가능 => 나머지 값을 dp 배열 값으로 저장하기.

const fs = require("fs");
let n= fs.readFileSync("/dev/stdin")
  .toString()
  .trim()
n=Number(n);
if(n===1)console.log(1)
else{
  let dp=Array(n+1).fill(0);
  dp[1]=1;
  dp[2]=2;
  for (let i = 3; i <= n; i++) {
    dp[i]=(dp[i-2]+dp[i-1])%10007 
  }
  console.log(dp[n]);
  }