//dp
const fs = require("fs");
let n= fs.readFileSync("/dev/stdin")
  .toString()
  .trim()
n=Number(n);
if(n===1)console.log(1)
else{
  let dp=Array(n+1).fill(0);
  dp[1]=1;
  dp[2]=3;

  for (let i = 3; i <= n; i++) {
    dp[i]=(dp[i-2]*2+dp[i-1])%10007 
  }
  console.log(dp[n]);
  }