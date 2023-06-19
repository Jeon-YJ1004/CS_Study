// 배열 길이는 백만, 수는 십억-> c++ 이면 long 써야함.
// 번호가 더 작은 풍선은 최대 1번=> n개의 풍선이라면 n-2번은 큰쪽, 1번은 작은 쪽/ n-1번 다 큰쪽
// 1차적으로 생각했을때 n-1번 다 큰쪽이라면 무조건 제일 작은 수만 남을 수 있음
// 풍선  터트리는 과정 완탐으로 생각하면, 재귀=> 무조건 시간초과 날듯...
// 남지 못하는 수: 양 옆에 자기보다 작은 수가 있을 경우
// 당연히 처음과 끝은 수에 상관없이 남을 수 있다
// 배열을 돌면서 양 옆의 값들 확인하기-> c++이면 lower_bound 사용
// 뭔가 최장 증가 수열 문제가 생각남.
// for문을 앞부터, 뒤부터 총 두번 돌아서 각 인덱스까지의 최소 값을 저장.
// left,right에 저장된 값은 그 인덱스 전에 배열에서의 최소값. 만약 원 배열의 값과 같다면 그 인덱스의 값이 제일 작음
// function solution(a) {
//   let len=a.length
//   let right=Array(len).fill(0)
//   let left=Array(len).fill(0)
//   let min=1000000000
//   for(let i=0;i<len;i++){
//       if(a[i]<min) min=a[i]
//       right[i]=min
//   }
//   min=1000000000
//   for(let i=len-1;i>=0;i--){
//       if(a[i]<min)min=a[i]
//       left[i]=min;
//   }
//   let count=2;
//   for(let i=1;i<len-1;i++){
//       if(a[i]>right[i]&&a[i]>left[i])continue
//       count++
//   }
//   return count;
// }

//마지막 for문은 불필요하므로 아래 코드로 리팩토링함.
function solution(a) {
  let len=a.length
  let right=Array(len).fill(false)
  let min=a[0]
  let count=2;
  for(let i=1;i<len-1;i++){
      if(a[i]<min){
          min=a[i]
          right[i]=true
      } 
  }
  min=a[len-1]
  for(let i=len-2;i>=1;i--){
      if(a[i]<min){
          min=a[i]
          count++
      }else if(right[i]) count++
  }
  return count;
}
