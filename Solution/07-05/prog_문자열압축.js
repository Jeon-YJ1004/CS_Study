function solution(s) {
  let answer = s.length;
  if (answer === 1) return 1;

  for (let i = 1; i <= Math.floor(s.length / 2); i++) {
    let count = 1;
    let words = "";
    //         완전 탐색
    for (let j = 0; j <= s.length; j += i) {
      let current = s.slice(j, i + j);
      let next = s.slice(j + i, i * 2 + j); //slice의 용법을 제대로 익히지 않아서 시간이 오래 걸림. 두번째 인자가 개수인줄..ㅜ
      if (current === next) {
        count += 1;
      } else {
        if (count === 1) {
          words = words + current;
        } else {
          words = words + count + current;
          count = 1;
        }
      }
    }

    answer = Math.min(answer, words.length);
  }
  return answer;
}
