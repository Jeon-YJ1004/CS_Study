/*
n,m <=50 ,k <=2500..  모든 경로의 경우의 수는 시간 초과
이동하는 거리가 총 k
bfs로 하면서 거리가 넘어가면 스택에서 빼기
문자열이 사전순=> d l r u
막힌 곳은 없음
그럼 최소 루트 구하고 거기서 길이가 k될때까지 문자열을 더하면,,?
1.좌표의 대소로 lrud중 경우의 수 축소
2.최소 루트 구하기
3.거기서 격자를 넘어가지 않는 선에서 dlru순으로 추가 경로 할당하기
dfs? bfs?
*/

const bfs = () => {

}
function solution(n, m, x, y, r, c, k) {
  var answer = '';
  let d_upDown = y - c // 음수면 밑으로
  let d_leftRight = x - r // 음수면 오른쪽으로

  return answer;
}

solution(3, 4, 2, 3, 3, 1, 5)
