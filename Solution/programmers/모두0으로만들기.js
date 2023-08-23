/* 
노드 개수 삼십만, a는 백만 사이 
양방향 트리, 가중치 0으로 -> 
임의의 연결된 두점을 골라서 -> 


1, edges로 간선수로 먼저 볼 노드 배열 fewEdges 생성
2. edges 돌면서 연결된 간선의 개수가 적은 애부터 0 만들기
입출력 에 1에서는 3번 노드보다 0,2,4번의 노드를 0만들고 3번 노드가 0이 되는지 확인하는 것
근데 for문 돌면서 적은애 부터 어케함.
여러 간선이 있을 경우 어떻게 가중치를 분배할 것인지.. 
=> 고민할 필요 없음. 무조건 0을 만들면 된다
다 visit했는데 queue에 간선이 남아 있으면 사이클이 있는것. => 불가능
우선순위 큐 만들기! 간선 수가 적을 수록 앞으로 
class 선언하기 연습하기!
그리고 fewE는 공간 낭비가 심함 

function solution(a, edges) {
  let answer = -2;
  let fewE=Array.from({length:a.length},(e,i)=>[i,0,[]])
  edges.forEach(e=>{
      fewE[e[0]][1]++
      fewE[e[1]][1]++
      fewE[e[0]][2].push(e[1])
      fewE[e[1]][2].push(e[0])
  })
  fewE.sort((a,b)=>a[1]-b[1])
  for(let i=0;i<a.length;i++){
      //fewE[i][0]는 간선 수가 제일 적은 노드 번호
      //fewE[i][1]은 간선 개수
      //fewE[i][2]은 연결된 노드 들
      let currNode=fewE[i][0]
      let currV=a[currNode]
      if(currV===0)continue
      for(e of fewE[i][2]){
          
      }
          
  }
  return answer;
}
*/
/*
모두 0으로 만들 수 있는지 판별=> 트리 가중치 합이 0일 경우
어느 노드에서 해도 트리 형태로 리프노드 부터 부모 노드로 간다면 최소 횟수 보장
리프노드일 경우 0은 볼 필요 없음
1. 트리 형태로 저장하기
2. 배열의 마지막 노드부터 dfs로 부모 노드로 올라가기. 상위 노드들부터 stack에 들어가게 되고 Bottom-up 방식으로 dfs
2-1. 리프노드부터 0으로 만들어 나가기.
2-2. 스택을 이용한 dfs와 동일하게 진행하되 방문하지 않은 노드일 경우 방문 처리를 하고 스택에 다시 넣어줌
2-3. stack이 빌때까지 반복문 돌며 pop

**주의
1.매우 큰 수에 대해서는 연산의 정확도를 보장해주지 않아 오답이 나올 수 있다.
따라서 매우 큰 수에 대해서도 정확한 연산을 해주는 BigInt 자료형으로 정답을 처리해야 한다.

2.JS의 경우 재귀호출을 10만번 이상 깊게 들어가기 버거워하는데, 
시간과 공간제약을 받는 알고리즘 문제 특성과 따로 Node.js를 통해 자바스크립트 구동 환경을 만든 프로그래머스의 ide 환경에서는 더더욱 재귀에 대한 제약이 심함
*/
function solution(a, edges) {
    if (a.reduce((a, b) => a + b) !== 0) 
        return -1
    const tree = new Array(a.length)
        .fill()
        .map(_ => new Array());
    const visit = new Array(a.length).fill(false)
    //dfs를 위한 스택으로 리프노드,부모노드 순서이다.
    const stack = [
        [0, null]
    ]
    let answer = BigInt(0)
    for (const [u, v] of edges) {
        tree[u].push(v);
        tree[v].push(u);
    }
    // 2
    while (stack.length) {
        const [curr, parent] = stack.pop();
        // 방문한 노드를 만나면 더 이상 내려갈 곳 없는 dfs 제일 안쪽 노드를 마주한 경우 => 연산 횟수 구하기 시작. 수행횟수로 curr의
        // 절대값을 더하고, 부모노드에 현재 노드 값 더하기
        if (visit[curr]) {
            answer += BigInt(Math.abs(a[curr]));
            a[parent] += a[curr];
            continue;
        }
        // 첨 만난 노드이므로 방문 체크 후 스택에 다시 넣주기.
        stack.push([curr, parent]);
        visit[curr] = true;

        for (const next of tree[curr]) {
            if (!visit[next]) {
                stack.push([next, curr]);
            }
        }
        return answer;
    }
}
