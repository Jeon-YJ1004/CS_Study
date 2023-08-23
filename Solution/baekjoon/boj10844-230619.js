//dp
const fs = require("fs");
let [n]= fs.readFileSync("/dev/stdin")
  .toString()
  .trim()
n=Number(n)

/*
dp[1]=9               9 1개
dp[2]=dp[1]*2-1 =17   0 1개 9 1개  
dp[3]= (dp[2]-1)*2+1  0 1개 9 2개 
do[4]=(dp[3]-2)*2+2   0 
1->0->1, 8->9->8 한가지.. 빼고 다 *2
*/