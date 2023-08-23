//n->3진법-> 앞뒤 반전-> 10진법으로
//3진법... 쉬운 방법은 나누기 3해서 나머지
function solution(n) {
  let answer = n.toString(3)
  answer=answer.split("").reverse().join("")
  return parseInt(answer,3)
}
/*
js에서  10진수=> N진수는 num.toString(N)
      N진수=>10진수는 parseInt(num,N)   
      N=>X는 parseInt(num,N).toString(X))
다른 사람 코드:
return parseInt([...n.toString(3)].reverse().join(""), 3);

** spread syntax: 배열이나 문자열과 같은 반복 가능한 문자를 개별 요소로 확장시킴.
ex) ...[1,2,3]  ...string   ...'hello'   ...new Map()    d=[,,,arr1, ...arr2]

Array.reverse()는 원본 배열을 변형한다. 즉 위의 다른 사람 코드처럼 하면 원본 n의 변형을 막을 수 있다!!
내 코드도 문자열을 배열로 바꾼 뒤 리버스해서 괜찮지만 주어진 배열을 리버스하여 새 변수에 할당해 줄땐 spread 를 쓸 필요가 있다 

만약 js가 아니라면 나머지를 이용한 진법 변환이 필요하다
function solution(n) {
  const answer = [];
  while(n !== 0) {
      answer.unshift(n % 3); 
      n = Math.floor(n/3); //형변환을 막기 위해
  }
  return answer.reduce((acc,v,i) => acc + (v * Math.pow(3, i)),0);   
}
*/