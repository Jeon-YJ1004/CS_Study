//1253 좋다
const fs = require("fs");
let [n, ...arr] = (
  process.platform === "linux"
    ? fs.readFileSync("dev/stdin")
    : `3
-5 -2 -3`
)
  .toString()
  .trim()
  .split(/\s/)
  .map(Number);
// 4000000이라 투 포인터 가능
arr = arr.sort((a, b) => {
  return a - b;
});
console.log(arr);
let count = 0;
for (let i = 0; i < arr.length; i++) {
  let value = arr[i];
  let left = 0;
  let right = n - 1;
  while (left < right) {
    let sum = arr[left] + arr[right];
    if (sum === value) {
      if (left !== i && right !== i) {
        count++;
        break;
      } else if (left == i) left++;
      else if (right == i) right--;
    } else if (sum < value) left++;
    else right--;
  }
}
console.log(count);
