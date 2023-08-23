//for문으로 돌면서 확인. 100 이라 이중 for문 가능.
//두 원소의 합의 개수는 최대 n*(n-1)/2. 얘를 중복확인(.includes)하고 sort하는 방식과
//중복 체크를 위한 배열, 최대 값*2 boolean 확인하는 방식 두개가 있음
//만약 숫자의 값이 크다면 boolean은 비효율, 숫자의 양이 많다면 sort가 비효율.
//아래는 중복 체크 방식을 구현함
function solution(numbers) {
  let answer = [];
  let num=Array(201).fill(false)
  for ( let i = 0; i < numbers.length; i++) {
// i와 j는 서로 달라야 하므로 j=i+1 부터로 설정.
    for ( let j = i + 1; j < numbers.length; j++) {
          let sum = numbers[i] + numbers[j];
          num[sum]=true
      }
    }
  num.forEach((e,i)=>{if(e)answer.push(i)})
  return answer;
}

//아래는 JS Set을 이용한 다른 사람 풀이
//Set 객체로 중복 방지 후 sort로 정렬.
//https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Set
function solution(numbers) {
  const temp = []
  for (let i = 0; i < numbers.length; i++) {
      for (let j = i + 1; j < numbers.length; j++) {
          temp.push(numbers[i] + numbers[j])
      }
  }
  const answer = [...new Set(temp)]
  return answer.sort((a, b) => a - b)
}