function solution(N, stages) {
  let fail_complete = Array.from({ length: N }, (e, i) => [0, 0]); //아직 클리어 ㄴㄴ 수 , 스테이지 도달 수
  let fail_prob = [];
  for (let i = 0; i < stages.length; i++) {
    //스테이지 완료, 실패, 아직 미도달
    for (let j = 0; j < N; j++) {
      if (stages[i] - 1 > j) fail_complete[j][1]++;
      else if (stages[i] - 1 == j) {
        fail_complete[j][0]++;
        fail_complete[j][1]++;
      }
    }
  }
  for (let i = 0; i < N; i++) {
    fail_prob.push([i, fail_complete[i][0] / fail_complete[i][1]]);
  }

  fail_prob.sort((a, b) => b[1] - a[1]);
  return fail_prob.map((x) => x[0] + 1);
}
