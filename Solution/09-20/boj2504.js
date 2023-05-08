//2504 괄호의 값
const fs = require("fs");

let [...brackets] = (
  process.platform === "linux" ? fs.readFileSync("/dev/stdin") : `[][]((])`
)
  .toString()
  .trim();

let b_stack = [];
let num = { "[": 3, "(": 2, ")": ["(", "["], "]": ["[", "("] };

brackets.forEach((e) => {
  if (b_stack.length === 0 && (e === ")" || e === "]")) {
    console.log(0);
    exit();
  }
  if (e === "(" || e === "[") b_stack.push(e);
  else {
    if (b_stack[b_stack.length - 1] === num[e][0]) {
      b_stack.pop();
      b_stack.push(num[num[e][0]]);
    } else if (
      b_stack[b_stack.length - 2] === num[e][0] &&
      b_stack[b_stack.length - 1] !== num[e][1]
    ) {
      const sum = b_stack.pop();
      b_stack.pop();
      b_stack.push(num[num[e][0]] * sum);
    } else {
      console.log(0);
      exit();
    }
  }
  if (
    typeof b_stack[b_stack.length - 1] === "number" &&
    typeof b_stack[b_stack.length - 2] === "number"
  ) {
    const sum = b_stack[b_stack.length - 1] + b_stack[b_stack.length - 2];
    b_stack.pop();
    b_stack.pop();
    b_stack.push(sum);
  }
});
if (b_stack.length !== 1 || typeof b_stack[0] !== "number") {
  console.log(0);
} else {
  console.log(b_stack[0]);
}
