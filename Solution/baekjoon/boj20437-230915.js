// 20437 문자열 게임 2
/* 아직 못품
w, k,
k개를 포함하는 가장 짧은 연속 문자열의 길이.=>결국 시작과 끝에 포함됨
시작과 끝조건 가장 긴 문자열 길이
t<=100, w<=만10000
순회하면서 각 나온 알파벳 인덱스 넣기.
배열 길이가 k 이하면 만족하는 문자열 개수 이하 
*/
const fs = require("fs");
let [t, ..._arr] = process.platform === "linux"
  ? fs.readFileSync("/dev/stdin")
  : `2
superaquatornado
2
abcdefghijklmnopqrstuvwxyz
5`
    .toString()
    .trim()
    .split("\n")
t = Number(t)
while (t--) {
  let w = _arr.shift()
  let k = _arr.shift()
  let alpabet = Array.from({ length: 26 }, e => [])
  let ansmin = []
  let ansmax = []
  for (let i = 0; i < w.length; i++) {
    const changeNum = w.charCodeAt(i) - 97
    alpabet[changeNum].push(i)
  }
  for (let i = 0; i < 26; i++) {
    if (alpabet[i].length < k) continue
    for (let j = 0; j < alpabet[i].length - 2; j++) {
      let temp = alpabet[i][j + 1] - alpabet[i][j]
      ansmin.push(temp)
    }
    ansmax.push(alpabet[i][alpabet[i].length - 1] - alpabet[i][0])
  }
  if (ansmax.length || ansmin.length) console.log(-1)
  else console.log(Math.min(...ansmin), Math.max(...ansmax))
}
