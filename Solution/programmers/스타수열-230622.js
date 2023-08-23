/*
스타 수열을 n개로 나누고,  연속하는 두 집합의 교집합이 있어야한다
하지만 연속하는 두집합은 같지 않다. 결국 스타 순열의 길이는 4부터 시작이다.
==> 틀림. 문제 잘못 읽음. 이거 아님!!!
배열의 길이는 십만 
가장 긴 스타 수열의 길이=> 스타 수열 자체는 여러개지만 그 중 길이가 긴것=> 길이만 저장

1. dp?
이중 for문=> n제곱 안됌. 그럼 어케 하지..
dp[i][j]= i는 길이, j는 교집합 원소?
// 시간초과 날듯

2.스타 순열의 길이를 정해서 가능한지 확인하기.(이분탐색)
스타 수열 길이의 최대값은 a배열의 길이가 홀수이면 len(a)-1, 짝수이면 len(a)-2
start랑 end해서 스타 순열 mid값 구하고 이 길이(2n)일때 
필요한 교집합 원소 즉 원 배열에 n개 이상인 원소가 있다면 
겹치는 집합 잇는지 확인 후 성공여부 확인.
성공하면 end++해서 그 보다 큰 순열 길이로 해보고 이거 안돼면 다시 줄이기 반복해서 최대 길이 찾기
왜냐 성공하면 그 아래 길이의 스타 순열은 무조건 가능
* 교집합 원소를 뭐로 할지에 따라 길이가 가능한지 1차 판별
// 접근이 잘못됨

=> 결국 교집합의 원소에 따라 스타 순열이 결정된다.
그럼 최장길이는 어케 얻는가? 개수가 가장 많은 교집합 원소, 그리고 이게 n개의 집합을 이룰때.
3.
만약 원수열이 100이면 98부터 부분 수열이 가능하고 49개의 스타 부분 수열이 가능하다.
즉 교집합 원소의 개수가 49개를 넘으면 오히려 49개 보다 더 작아짐 
교집합의 원소가 k일때 스타 수열의 길이가 몇이 가장 긴지 확인
-원수열의 원소들 개수 오름차순으로 정렬
- 교집합원소와 일치하지 않는 어떤 수 찾기.

** 코드가 잘안짜진 이유: 
1. 계속 교집합 원소가 있을때를 조건으로 식전개를 하려했지만
 교집합 원소가 없으면 넘어가면 됨
2. 부분집합이므로 for문을 돌다가 넘어가도 되는 애를 발견할 수도 있음. 이걸 어케 처리해야하나..
입출력 예3에서 03302020도 가능.넘어가야하는 애는 어떤 애인가?
=> 두개씩 비교할때 교집합 원소가 없을때 or 교집합 원소가 반복될때. 하나만 넘어가야함.
3. sCount를 원소마다 0으로 초기화 한다음 부분수열 개수를 세야한다!
*/
function solution(a) {
  let aLen=a.length
  
    //[원소,개수], 없는 숫자는 empty
  let eCount=a.reduce((acc,curr)=>{
      acc[curr]?acc[curr][1]++:acc[curr]=[curr,1]
      return acc
  },[]).filter(Boolean)
  eCount.sort((a,b)=>b[1]-a[1])
  let sCount=0; //스타수열의 부분집합 개수
  
  //스타 순열 개수 세기. eCount의 수보다 작을 수 있음. 
  for(let j=0;j<eCount.length;j++){
      if(sCount>=eCount[j][1]) continue //이미 최대값이 나왔기 때문에
      let temp=0
      for(let i=0;i<aLen;i++){
          //배열의 길이가 1일경우, 홀수 길이 일때
          if(a[i+1]===undefined)continue
          if(a[i]===a[i+1])continue // x[0]!=x[1]이기 때문에
          if(a[i]!==eCount[j][0]&&a[i+1]!==eCount[j][0])continue
          // 스타 수열의 부분 수열 가능
          temp++
          i++
      }
      sCount=sCount<temp?temp:sCount
  }
  //sCount는 스타수열의 부분수열 즉 2n해야함
  return 2*sCount      
}

//다른 사람 코드 .내가 처음에 생각한 대로 푸심. 
function solution(a) {
  const map = new Map();
  a.forEach((num) => {
      map.set(num, (map.get(num) || 0) + 1);
  });

  const sorted = [...map].sort((a,b) => b[1] - a[1]);

  let maxLen = Number.MIN_SAFE_INTEGER;
  for(const [common, count] of sorted) {
      if (count * 2 <= maxLen) continue;

      const visited = Array(sorted.length).fill(false);
      let len = 0;
      for(let i = 0; i < a.length; i++) {
          if (a[i] !== common) continue;

          visited[i] = true;
          if (i-1 >= 0 && !visited[i-1] && a[i-1] !== common) {
              len += 2;
              visited[i-1] = true;
          } else if (i+1 < a.length && !visited[i+1] && a[i+1] !== common) {
              len += 2; 
              visited[i+1] = true;
          }
      }     
      maxLen = Math.max(maxLen, len);        
  }

  return maxLen;
}