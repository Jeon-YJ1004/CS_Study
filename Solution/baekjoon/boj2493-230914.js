//2493 탑
/*
n<=5십만 높이<=일억
n으로 해결해야함=> 스택 단순 구현
스택의 탑보다 현재 값이 크면 수신 불가. while문으로 스택의 탑보다 작거나 같을때까지 팝스택, 현재값 스택에 넣기
작다면 스택에 넣기.
*/
const fs = require("fs");
let [n, ...arr] = fs.readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(/\s/)
  .map(Number)

let answer = [0]
let stack = [[0, arr[0]]]
for (let i = 1; i < arr.length; i++) {
  let curr = arr[i];
  if (curr > stack[stack.length - 1][1]) {//수신 가능
    while (stack.length && stack[stack.length - 1][1] < curr) {
      stack.pop()
    }
  }
  answer.push(!stack.length ? 0 : stack[stack.length - 1][0] + 1)
  stack.push([i, curr])
}
console.log(answer.join(" "))