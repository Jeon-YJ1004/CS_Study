function solution(n, lost, reserve) {
  let answer = n - lost.length;
  let student = 0;
  lost.sort((x, y) => x - y);
  for (let i = 0; i < lost.length; i++) {
    if (reserve.includes(lost[i])) {
      student = reserve.indexOf(lost[i]);
      lost.splice(i, 1);
      reserve.splice(student, 1);
      answer++;
      i--;
    }
  }

  for (let i = lost.length - 1; i >= 0; i--) {
    if (reserve.includes(lost[i] + 1)) {
      student = reserve.indexOf(lost[i] + 1);
      reserve.splice(student, 1);
      answer++;
    } else if (reserve.includes(lost[i] - 1)) {
      student = reserve.indexOf(lost[i] - 1);
      reserve.splice(student, 1);
      answer++;
    }
  }
  return answer;
}
//1. array.include(x)가 아니라 x in array를 했는데 인식을 못했다. 왜?
// in 연산자는
// 객체가 가지고 있는 프로퍼티 및 메소드의 존재 여부를 Boolean으로 반환함
// 2. lost랑 reserve 중복 처리를 먼저 해줘야한다. + for 과 splice를 같이 쓸땐
//  i-- 해주기
