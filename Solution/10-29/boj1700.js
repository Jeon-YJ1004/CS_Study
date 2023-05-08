// 1700 멀티탭 스케줄링
let fs = require("fs");
let [NK, order] = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin")
    : `3 14
1 4 3 2 5 4 3 2 5 3 4 2 3 4`
)
  .toString()
  .trim()
  .split("\n");

let [N, K] = NK.split(" ").map(Number);
order = order.split(" ").map(Number);

let plugBool = Array(K + 1).fill(false);
let concent = 0;
let count = 0;
let min = 0;
//제일 마지막& 사용이 끝난 기기
const chooseWhichPop = (index) => {
  let max = 0; //
  plugBool.some((e, i) => {
    if (e) {
      let last = order.indexOf(i, index);
      max = last === -1 ? order.indexOf(i) : Math.max(max, last);
      return last === -1;
    }
  });

  return order[max];
};
for (let i = 0; i < K; i++) {
  const e = order[i];
  if (!plugBool[e]) {
    //꽂혀있지 않으면
    if (concent < N) {
      plugBool[e] = true;
      concent++;
    } else {
      //무엇을 뺄지 정하기
      if (i === K - 2) count++;
      else {
        plugBool[chooseWhichPop(i)] = false;
        plugBool[e] = true;
        count++;
      }
    }
  }
}
console.log(count);
