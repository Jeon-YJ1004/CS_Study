// 14226 이모티콘
const fs = require("fs");
let n = Number(
  process.platform === "linux" ? fs.readFileSync("dev/stdin") : `217`
);
let stack = [[2, 1, 2]]; //screen,clipboard,time
let time = 0;
let visited = Array.from({ length: 1001 }, () => Array(1001).fill(false)); //screen,clipboard
visited[1][1] = true;
visited[2][1] = true;
visited[1][0] = true;
while (stack.length) {
  let [screen, clip, t] = stack.shift();
  if (screen === n) {
    time = t;
    break;
  }
  //copy
  if (!visited[screen][screen]) {
    visited[screen][screen] = true;
    stack.push([screen, screen, t + 1]);
  }
  //+paste
  if (screen + clip <= 1000 && !visited[screen + clip][clip]) {
    visited[screen + clip][clip] = true;
    stack.push([screen + clip, clip, t + 1]);
  }
  //-1
  if (screen > 1 && !visited[screen - 1][clip]) {
    visited[screen - 1][clip] = true;
    stack.push([screen - 1, clip, t + 1]);
  }
}
console.log(time);
