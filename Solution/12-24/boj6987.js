const fs = require("fs");
let [arr] = (
  process.platform === "linux"
    ? fs.readFileSync("dev/stdin")
    : `5 0 0 3 0 2 2 0 3 0 0 5 4 0 1 1 0 4
4 1 0 3 0 2 4 1 0 1 1 3 0 0 5 1 1 3
5 0 0 4 0 1 2 2 1 2 0 3 1 0 4 0 0 5
5 0 0 3 1 1 2 1 2 2 0 3 0 0 5 1 0 4`
)
  .toString()
  .trim()
  .split("\n");

let matrix = Array.from({ length: 4 }, (e) =>
  Array.from({ length: 6 }, (e) => Array(3))
);
let answer = Array(4);
let result= Array.from({ length: 6 }, (e) => Array(3))
for (let k = 0; k < 4; k++) {
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 3; j++) {
      matrix[k][i][j] = arr[i + j + k];
    }
  }
}


console.log(answer)