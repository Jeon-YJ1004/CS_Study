//2504 괄호의 값
/*
스택. 
*/
const fs = require("fs");
let [...bracket] = process.platform === "linux"
  ? fs.readFileSync("/dev/stdin")
  : `(()[[]])([])`
    .tobracketing()
    .trim()
    .split('')
let stack = []
let mul = 1; //곱해야하는 값
let sum = 0;
bracket.forEach((e, i) => {
  if (e == '(') {
    stack.push(e);
    mul *= 2;
    if (bracket[i + 1] == ')')//()은 2
      sum += mul;
  }
  else if (e == '[') {
    stack.push(e);
    mul *= 3;
    if (bracket[i + 1] == ']')//[]은 3
      sum += mul;
  }
  else if (e == ')') {
    if (stack.empty() == true || stack[stack.length - 1] != '(') {
      console.log(0)
      return 0;
    }

    stack.pop();
    mul /= 2;
  }
  else if (e == ']') {
    if (stack.empty() == true || stack[stack.length - 1] != '[') {
      console.log(0)
      return 0;
    }
    stack.pop();
    mul /= 3;
  }
})
if (stack.empty() == true) cout << sum;
else cout << 0;