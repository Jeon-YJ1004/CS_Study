function solution(numbers) {
  let answer = 45;
  let sum = numbers.reduce(function (a, b) {
    return a + b;
  });
  return answer - sum;
}
// 숫자가 0부터 9밖에 없기 때문에 없는 숫자도 그 안에서만 발생.
// 걍 0~9의 합인 45에서 전체 값을 빼주면 빈 값이 나오는 쉬운
