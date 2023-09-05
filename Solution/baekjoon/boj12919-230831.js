//12919 A와 B 2
/*
s를 변현해서 t로. 
-조건 1: s+A
-조건 2: B+리버스 s

s->t는 두 조건을 모두 저장하며 나아가야함
하지만 반대로 t->s는 맨 뒤의 문자만 변형하며 s가 가능한지 확인하면 됨
*/

const fs = require("fs");
let [S, T] = fs.readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
let answer = 0;
const dfs = (t) => {
  if (S === t) {
    answer = 1;
    return;
  }
  if (t.length < S.length) return;
  if (t[t.length - 1] === "A") dfs(t.slice(0, t.length - 1));
  if (t[0] === "B") dfs([...t.slice(1)].reverse().join(""));
}
dfs(T);
answer === 1 ? console.log(1) : console.log(0);
