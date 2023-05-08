// 22866 탑보기
// 미완료.

const fs = require("fs");
let [N, buildings] = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin")
    : `8
3 7 1 6 3 5 1 7`
)
  .toString()
  .trim()
  .split("\n");

buildings = buildings.map(Number);

const countArr = new Array(N).fill(0);
const closestArr = {};
const frontStack = [];
const backStack = [];
for (let i = 0; i < buildings.length; i++) {
  const height = buildings[i];
  while (frontStack.length && frontStack[frontStack.length - 1][1] <= height)
    frontStack.pop();
  if (frontStack.length) {
    countArr[i] += frontStack.length;
    closestArr[i] = {
      no: frontStack[frontStack.length - 1][0],
      dist: i - frontStack[frontStack.length - 1][0],
    };
  }
  frontStack.push([i, height]);
}
buildings.reverse();
for (let i = 0; i < buildings.length; i++) {
  const height = buildings[i];
  while (backStack.length && backStack[backStack.length - 1][1] <= height)
    backStack.pop();
  if (backStack.length) {
    countArr[N - i - 1] += backStack.length;
    if (
      !closestArr[N - i - 1] ||
      backStack[backStack.length - 1][0] - N + i + 1 <
        closestArr[N - i - 1].dist
    ) {
      closestArr[N - i - 1] = {
        no: backStack[backStack.length - 1][0],
        dist: backStack[backStack.length - 1][0] - N + i + 1,
      };
    }
  }
  backStack.push([N - i - 1, height]);
}
return countArr
  .map((v, idx) => (v === 0 ? v : `${v} ${closestArr[idx].no + 1}`))
  .join("\n");

console.log(solution(N, buildings));
