//14888 연산자 끼워넣기
//dfs
const fs = require("fs");
let [N, An, On] = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin")
    : `6
1 2 3 4 5 6
2 1 1 1`
)
  .toString()
  .trim()
  .split("\n");

An = An.split(" ").map(Number);
On = On.split(" ").map(Number);

const operators = { 0: "+", 1: "-", 2: "*", 3: "/" }; // + - * /
let results = [];
const culculate = (n, result) => {
  if (n == N) results.push(result);

  for (let i = 0; i < 4; i++) {
    if (On[i] > 0) {
      On[i]--;
      switch (i) {
        case 0:
          culculate(n + 1, result + An[n]);
          break;
        case 1:
          culculate(n + 1, result - An[n]);
          break;
        case 2:
          culculate(n + 1, result * An[n]);
          break;
        case 3:
          culculate(n + 1, parseInt(result / An[n]));
          break;
      }
      On[i]++;
    }
  }
};
culculate(1, An[0]);
console.log(Math.max(...results) + "\n" + Math.min(...results));

// eval 함수는 시간과 메모리를 더 잡아 먹는다.
// const culculate = (n, result) => {
//   if (n == N) results.push(result);
//   for (let i = 0; i < 4; i++) {
//     if (On[i] > 0) {
//       On[i]--;
//       culculate(n + 1, parseInt(eval(`${result} ${operators[i]} ${An[n]}`)));
//       On[i]++;
//     }
//   }
// };
