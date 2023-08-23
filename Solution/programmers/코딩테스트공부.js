/*
dp? dfs?
여러 경우중 한 경우를 선택하면서,최소 시간 갱신?-> dp
:시간 복잡도:O(목표(최대)알고력 * 목표(최대)코딩력 * problems 배열의 길이)

하지만 문제를 for문으로 순서대로 풀면 시간적으로 비효율, 그리디 아닌가?
그럼 완탐으로 접근. n 값도 작아서 가능할듯-> dfs
:시간 복잡도 O()

1. 알고력 1 높이기 
2. 코딩력 1 높이기
3. 문제 풀기
이 세개를 하는  것으로 dfs 돌면서 알고력과 코딩력이 원하는 값으로 나오면 고정. 갱신 안함
여기서 원하는 값은 모든 문제를 풀 최대값
dp[i][j]는 i와 j의 코딩력,알고리즘력을 얻을 때 최소 시간 저장. 비교값이 작을 때만 갱신
*/
let targetAlgo = 0
let targetCode = 0
let visited = []
function solution(alp, cop, problems) {
  let answer = 0;

  for (let i = 0; i < problems.length; ++i) {
    targetAlgo = Math.max(targetAlgo, problems[i][0]);
    targetCode = Math.max(targetCode, problems[i][1]);
  }
  for (let i = 0; i < 151; ++i) {
    let temp = [];
    for (let j = 0; j < 151; ++j) {
      temp.push(987654321);
    }
    visited.push(temp);
  }

  Dfs(alp, cop, problems, 0)
  return visited[targetAlgo][targetCode];
}
const Dfs = (a, c, problems, time) => {
  // 문제의 최대값 보다 커지면 고정 
  if (targetAlgo < a) a = targetAlgo
  if (targetCode < c) c = targetCode

  //현재 문제를 풀었을때 코딩력, 알고력이 visited값보다 크면 갱신할 필요가 없음
  if (visited[a][c] <= time) return
  visited[a][c] = Math.min(visited[a][c], time);

  // dfs 종료 조건
  if (a === targetAlgo && c === targetCode) return
  // 각각의 모든 문제를 풀었을 경우를 생각해야하므로 for문으로 돌리기(완탐)
  for (let i = 0; i < problems.length; ++i) {
    //문제를 풀 수 있으면 
    if (a >= problems[i][0] && c >= problems[i][1]) {
      let nextAlp = a + problems[i][2];
      let nextCop = c + problems[i][3];
      Dfs(nextAlp, nextCop, time + problems[i][4], problems);
    }
  }
  //문제 풀지 않고 공부하는거로 값 올리기
  Dfs(a + 1, c, time + 1, problems);
  Dfs(a, c + 1, time + 1, problems);
}
/*
  visited = Array.from({ length: 151 }, e => Array.from({ length: 151 }, e => 987654321))
  으로 할땐 효율성에서 떨어짐
*/