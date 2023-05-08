//1700 멀티탭 스케쥴링
// 아직 미해결
const fs = require("fs");
const [NK, arr] = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin")
    : `5 20
1 2 3 4 1 1 1 3 3 2 5 7 20 1 3 4 2 1 9 19`
)
  .toString()
  .trim()
  .split("\n");

let [N, K] = NK.split(" ").map(Number);
let order = arr.split(" ").map(Number);
let using = [];
let count = 0;
for (let i = 0; i < order.length; i++) {
  if (using.includes(order[i])) continue;
  else {
    if (using.length == N) {
      let allIn = true;
      let lastIndex = -1;
      count++;
      for (let j = 0; j < using.length; j++) {
        if (!order.includes(using[j], i + 1)) {
          allIn = false;
          using.splice(j, 1);
        } else {
          let index = order.indexOf(using[j], i + 1);
          lastIndex = lastIndex < index ? index : lastIndex;
        }
      }

      if (allIn) using.splice(using.indexOf(order[lastIndex]), 1);
    }
    using.push(order[i]);
  }
}

console.log(count);
