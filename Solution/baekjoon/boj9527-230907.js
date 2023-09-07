const fs = require("fs");
let [n, ...arr] = (
  process.platform === "linux"
    ? fs.readFileSync("dev/stdin")
    : `5 150
0 50 10
0 50 20
50 100 10
100 151 10
110 140 90`)
  .toString()
  .trim()
  .split("\n")

n = Number(n)