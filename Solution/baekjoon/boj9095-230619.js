//dp
//n은 양수이며 11보다 작다. why?
//dp[4]= dp[3]+dp[2]+dp[1]
//dp[n]= dp[n-1]+dp[n-2]+dp[n-3](n-1에서 +1,n-2에서 +2,n-3에서 +3)
const fs = require("fs");
let [t,...arr]= fs.readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(/\s/)
  .map(Number)
let count=0
while(t>count){
  let n=arr[count]
  if(n===1)console.log(1)
  else if(n===2)console.log(2)
  else{
  let dp=Array(n+1).fill(0);
  dp[1]=1
  dp[2]=2
  dp[3]=4
  for (let i = 4; i <= n; i++) {
    dp[i]= dp[i-1]+dp[i-2]+dp[i-3]
  }
  console.log(dp[n]);
  }
  count++
}