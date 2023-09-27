//14502 연구소
/*
n,m<=8 완탐 가능할듯 어디에 벽을 세울지 64^3이하
bfs+dfs?재귀.
안전 영역 크기의 최댓값
무조건 벽을 세워야함=> 재귀하다가 
남은 빈칸의 수가 남은 벽 수 보다 같으면 무조건 세우기
벽을 세우는 연구소 경우의 수를 다 구하고(dfs) 그 배열들을 bfs하기
*/
const fs = require("fs");
const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin")
    : `4 6
0 0 0 0 0 0
1 0 0 0 0 2
1 1 1 0 0 2
0 0 0 0 0 2`
      .toString()
      .trim()
      .split("\n");
const [n, m] = input.shift().split(" ").map(Number);
let ans = 0;
let dx = [1, 0, -1, 0];
let dy = [0, 1, 0, -1];
const arr = input.map((i) => i.split(" ").map(Number));
let virusA = [];
arr.forEach((row, x) => {
  row.forEach((c, y) => {
    if (c === 2) virusA.push([x, y]);
  });
});
const checkXY = (x, y) => {
  if (x < n && x >= 0 && y < m && y >= 0) return true;
  return false;
};
const countingSafe = (board) => {
  let virus = virusA.map(e => e.slice())
  while (virus.length !== 0) {
    let [curX, curY] = virus.shift();
    for (let i = 0; i < 4; i++) {
      let [nextX, nextY] = [curX + dx[i], curY + dy[i]];
      if (checkXY(nextX, nextY) && board[nextX][nextY] === 0) {
        board[nextX][nextY] = 2;
        virus.push([nextX, nextY]);
      }
    }
  }
  let count = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (board[i][j] === 0) {
        count += 1;
      }
    }
  }
  return count;
};
const dfs = (count) => {
  if (count === 3) {
    let board = arr.map((e) => [...e]);
    ans = Math.max(ans, countingSafe(board));
    return;
  }
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (arr[i][j] === 0) {
        arr[i][j] = 1;
        dfs(count + 1);
        arr[i][j] = 0;
      }
    }
  }
};
dfs(0);
console.log(ans);