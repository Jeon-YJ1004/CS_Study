// 1914   하노이의 탑
/*
n<=100 
n을 3번째==n-1까지를 2번째에 -> n-2번째를 3번째에== n-2까지를 1번째에.. 반복
마지막은 2를 3번째에== 1을 1번쩨에 -> 1을 3번째에 두기
dp[n]=dp[n-1]*2+1
하지만 과정을 출력해야함
*****헤멘 이유: 
printMove에서 출력하고 중간에 console.log로 제일 아래에 있는 애도 옮겨 줘야한다. 
이동횟수는 2^(n-1)-1이므로 dp배열이 필요가 없다. 
또한 한줄한줄 콘솔로그로 출력하면 시간 초과가 나오므로 배열에 답을 담은 후 join해서 한번에 출력해야한다.
 */
const fs = require("fs");
let n = fs.readFileSync("/dev/stdin")
  .toString()
  .trim()
n = Number(n)
let answer = []
const printMove = (i, from, to, via) => {//i번째 원판을 top번째 장대 맨 밑에

  if (i === 1) return answer.push(`${from} ${to}`);
  else {
    printMove(i - 1, from, via, to)
    answer.push(`${from} ${to}`);
    printMove(i - 1, via, to, from)
  }
}

if (n <= 20) {
  console.log(Math.pow(2, n) - 1)
  printMove(n, 1, 3, 2)
  console.log(answer.join("\n"))
} else {
  console.log((2n ** BigInt(n) - 1n).toString())
}