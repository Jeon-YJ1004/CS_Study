//20055 컨베이어 벨트 위의 로봇
/*
n. 로봇은 -> 이 방향으로 한칸 이동할 수 있음 함
단순 구현?
원형 리스트 필요? 그냥 각 단계마다 시작과 끝의 인덱스를 ++해주자
*** 헤멘 이유: n에 있는 내릴 박스는 언제든지 즉 컨테이너가 이동해서 도달하든 박스가 움직여서 도달하든 도착하면 내려진다
  if (ans > 43 && ans < 50)
    console.log(ans, arr, "\n", box)
*/
const fs = require("fs");
let [n, k, ...arr] = fs.readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(/\s/)
  .map(Number)

let start = 0;
let mid = n - 1;
let count = 0;
// 각 단계 실행하기
let ans = 0
let box = Array.from({ length: 2 * n - 1 }, e => false)
while (count < k) {

  if (start == 0) start = 2 * n - 1
  else start--
  if (mid == 0) mid = 2 * n - 1
  else mid--
  //내리기
  box[mid] = false
  //  로봇 이동하기. curr에 갈 수 있는지 확인
  let curr = mid
  for (let i = 0; i < n; i++) {
    let before = curr === 0 ? 2 * n - 1 : curr - 1
    if (arr[curr] > 0 && !box[curr] && box[before]) {
      box[curr] = true
      arr[curr]--
      box[before] = false
      if (curr === mid) box[curr] = false
    }
    curr = before
  }
  //로봇 올리기
  if (!box[start] && arr[start] > 0) {
    box[start] = true
    arr[start]--
  }
  count = 0
  for (let i = 0; i < 2 * n; i++) {
    if (arr[i] === 0) count++
  }
  ans++
}
console.log(ans)