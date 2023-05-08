//5719 거의 최단거리
//미해결
// v최대 500,e최대 10^4 ,dfs까지 => 다익스트라 알고리즘 사용 시간복잡도는 O(elogv *케이스 수 )
const fs = require("fs");
let [NM, SD, ..._arr] = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin")
    : `7 9
0 6
0 1 1
0 2 1
0 3 2
0 4 3
1 5 2
2 6 4
3 6 2
4 6 4
5 6 1
4 6
0 2
0 1 1
1 2 1
1 3 1
3 2 1
2 0 3
3 0 2
6 8
0 1
0 1 1
0 2 2
0 3 3
2 5 3
3 4 2
4 1 1
5 1 1
3 0 1
0 0`
)
  .toString()
  .trim()
  .split("\n");

let [N, M] = NM.split(" ").map(Number);
let [S, D] = SD.split(" ").map(Number);
let road = Array.from({ length: N + 1 }, (e) => 0);
for (let i = 0; i < _arr.length; i++) {
  _arr[i] = _arr[i].split(" ").map(Number);
}
const init_tree = () => {};
