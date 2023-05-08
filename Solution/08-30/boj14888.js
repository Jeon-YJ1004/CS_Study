//14888 연산자 끼워넣기
//미해결
//O는 덧셈 뺄셈 곱셈 나누기
const fs = require("fs");
const [N, A, O] = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin")
    : `2
5 6
0 0 1 0`
)
  .toString()
  .trim()
  .split("\n");

A = A.split(" ").map(Number);
O = O.split(" ").map(Number);
let result = [];

const culculate = (a, b, o) => {
  if (o == 1) {
    //+
    return a + b;
  } else if (o == 2) {
    //-
    return a - b;
  } else if (o == 3) {
    //X
    return a * b;
  } else if (o == 4) {
    //divide
    return a / b;
  }
};

for (let i = 0; i < A.length - 1; i++) {}
