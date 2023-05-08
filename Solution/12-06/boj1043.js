// 1043 거짓말
// 아직 못품
const fs = require("fs");
let [nm, t_arr, ...p_arr] = (
  process.platform === "linux"
    ? fs.readFileSync("dev/stdin")
    : `8 5
3 1 2 7
2 3 4
1 5
2 5 6
2 6 8
1 8`
)
  .toString()
  .trim()
  .split("\n");
let [n, m] = nm.split(" ").map(Number);
let [tNum, ...truth] = t_arr.split(" ").map(Number);
let party = [];

for (let i = 0; i < m; i++) {
  let [people, ...pNums] = p_arr[i].split(" ").map(Number);
  party.push(pNums);
}
let parent = Array.from({ length: n + 1 }, (e, i) => (e = i));

const find = (u) => {
  if (parent[u] === u) return u;

  return (parent[u] = find(parent[u]));
};
const merge = (u, v) => {
  u = find(u);
  v = find(v);
  if (u == v) return;
  parent[u] = v;
};

for (let i = 0; i < m; i++) {
  for (let j = 0; j < party[i].length; j++) {
    if (j >= 1) merge(party[i][j - 1], party[i][j]);
  }
}

let count = 0;
for (let i = 0; i < m; i++) {
  let know = false;
  for (let j = 0; j < party[i].length; j++) {
    for (let k = 0; k < tNum; k++) {
      if (find(party[i][j]) === find(truth[k])) {
        know = true;
        break;
      }
    }
    if (know) break;
  }
  if (!know) count++;
}
console.log(count);
