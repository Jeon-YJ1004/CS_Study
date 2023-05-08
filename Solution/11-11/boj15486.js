// 15486 퇴사2
const fs = require("fs");
let [N, ...arr] = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin")
    : `10
1 1
1 2
1 3
1 4
1 5
1 6
1 7
1 8
1 9
1 10`
)
  .toString()
  .trim()
  .split("\n");

for (let i = 0; i < arr.length; i++) {
  arr[i] = arr[i].split(" ").map(Number);
}
N = Number(N);
let max = 0;
let dp = Array(N + 1).fill(0);
// dp라면 부분 문제를 생각해보기
// dp[i]는 i일동안 누적한 최대 이익
//dp[i+j]=max(dp[i+j],dp[i]+j일만큼 일해서 얻는 pay)
for (let i = 0; i < N; i++) {
  const [time, pay] = arr[i];
  max = Math.max(max, dp[i]);

  if (i + time <= N) dp[i + time] = Math.max(dp[i + time], max + pay);
}
console.log(Math.max(...dp));
