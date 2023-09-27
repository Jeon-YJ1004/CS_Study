//16234 인구이동
/*
2초 1 ≤ N ≤ 50, 1 ≤ L ≤ R ≤ 100
몇번 일어날지 모르지만
1번에 배열 다 돌고 연합 구성하고 그냥 인구값 넣어주면 끝.. 단순 구현?
더이상 이동이 없을 때까지 bfs
*/
const fs = require("fs");
let [nlr, ..._arr] = fs.readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")

let [n, l, r] = nlr.split(" ").map(Number)
let arr = Array.from({ length: n }, (e, i) => _arr[i].split(" ").map(Number))
let dx = [1, 0, -1, 0]
let dy = [0, 1, 0, -1]
let day = 0

const checkEnd = (x, y) => {
  if (x < 0 || x >= n || y < 0 || y >= n) return false
  return true
}
const bfs = (x, y, visited) => {
  let connected = [[x, y]]
  visited[x][y] = true
  let sum = 0 + arr[x][y]
  let q = []
  q.push([x, y])
  while (q.length) {
    const [currX, currY] = q.shift()
    for (let k = 0; k < 4; k++) {
      const [nextX, nextY] = [currX + dx[k], currY + dy[k]]
      if (checkEnd(nextX, nextY) && !visited[nextX][nextY]) {
        const diff = Math.abs(arr[currX][currY] - arr[nextX][nextY])
        if (diff >= l && diff <= r) {// 인구 차가 조건에 해당되면 큐에 넣고 방문 처리. 
          visited[nextX][nextY] = true
          q.push([nextX, nextY])
          sum += arr[nextX][nextY]
          connected.push([nextX, nextY])
        }
      }
    }
  }
  //연결된 연합들에 변경된 값 넣주기
  const avg = Math.floor(sum / connected.length)
  for (const unit of connected) {
    const [i, j] = unit
    arr[i][j] = avg
  }
}

while (1) {
  let count = 0;
  let visited = Array.from({ length: n }, e => Array.from({ length: n }, e => false))
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (!visited[i][j]) {// js에서는 얉은 참조이기 때문에 
        bfs(i, j, visited);
        count++;
      }
    }
  }
  //bfs에 들어가지 않아 모든 정점을 방문함
  if (count === n * n) break;
  //그게 아니면 하루동안 인구이동이 일어났음
  day++
}
console.log(day)