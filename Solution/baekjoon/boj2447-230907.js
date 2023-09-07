//2447 별찍기 10
/*
재귀 n<3^8
n이 3^k 라면 1~k개 패턴이 존재
각 i,j좌표가 공백일지 별일지 확인
*/
const fs = require("fs");
const input = fs.readFileSync('/dev/stdin').toString().split('\n');
const num = parseInt(input[0])

const ans = []

printStars(num);
console.log(ans.join(""))

function printStars(num) {
  for (let i = 0; i < num; i++) {
    for (let j = 0; j < num; j++) {
      checkStar(i, j, num)
    }
    ans.push("\n")
  }
}

function checkStar(i, j, num) {
  if (i % 3 == 1 && j % 3 == 1) {
    ans.push(" ")
  } else {
    if (num == 1) {
      ans.push("*")
    } else {
      checkStar(parseInt(i / 3), parseInt(j / 3), parseInt(num / 3))
    }
  }
}