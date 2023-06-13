// 1. 3으로 나누기 2. 2로 나누기 3. 1 빼기
//dp배열의 index는 숫자, 배열 값은 그 숫자의 최솟값
//배열의 초기값은 -1만 했을때 counts.

const fs = require("fs");
let n= fs.readFileSync("/dev/stdin")
  .toString()
  .trim()
n=Number(n);
let countDp=Array(n+1).fill(0);
for(let i=2;i<=n;i++){
    countDp[i]=countDp[i-1]+1;
    if(i%2===0){
        countDp[i]=Math.min(countDp[i],countDp[i/2]+1);
    }
    if(i%3===0){
        countDp[i]=Math.min(countDp[i],countDp[i/3]+1);
    }
}
console.log(countDp[n]);