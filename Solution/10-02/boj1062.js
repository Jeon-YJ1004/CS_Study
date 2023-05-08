//1062 가르침
//미해결
//anta tica -> a,n,t,i,c 5개는 무조건
const fs = require("fs");
let [NK, ...arr] = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin")
    : `3 6
antarctica
antahellotica
antacartica`
)
  .toString()
  .trim()
  .split("\n");
let [N, K] = NK.split(" ").map(Number);
let answer = 0;
let str = [];
if (K < 5) console.log(0);
else if (K == 26) console.log(N);
else {
  arr.forEach((e) => {
    e = e.slice(4, e.length - 4);
    e = e.replace(/a/g, "");
    e = e.replace(/n/g, "");
    e = e.replace(/t/g, "");
    e = e.replace(/i/g, "");
    e = e.replace(/c/g, "");
    if (e.length == 0) answer++;
    str.push(e);
  });
  for (let i = 0; i < 26; i++) {
    if (visited[i] == false) dfs(i);
  }
}
let visited = [];
let count = 0;
const dfs = (index) => {
  //1. 체크인
  count++;
  visited.push();
  //2. 목적지인가?
  if (K - 5 < count) return;
  //3. 연결된 곳 순회

  //4. 갈 수 있는가? 이전에 선택한 알파벳보다 큼
  // 5. 간다 순회
  //6. 체크아웃 선택했던 알파벳 취소. 고른 개수와 선택값 수정
};
