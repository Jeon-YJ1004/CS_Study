//3460 이진수
const fs = require("fs");
const [T, ..._lst] = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin")
    : `2
13
22`
)
  .toString()
  .trim()
  .split("\n");

const binary = (n) => {
  let bi = n.toString(2);
  let lst = bi.split("").reverse();
  console.log(lst);
  let answer = [];
  for (let i = 0; i < lst.length; i++) {
    if (Number(lst[i])) answer.push(i);
  }
  console.log(...answer);
};

for (let i = 0; i < T; i++) {
  let N = Number(_lst.shift());
  binary(N);
}
