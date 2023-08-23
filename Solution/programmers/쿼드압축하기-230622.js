/*
arr<1024
1. 재귀
주어진 인덱스 안에서 합칠 수 있는지(=같은 수인지)를 확인하는 함수를 구현하고
이 함수를 재귀.
네모 사등분하고 사등분한 네모 각각을 재귀. 크기가 1일때까지. 만약 1이면 돌면서++


2. bottom-up 

quadArr=한 행에 2의 제곱수 단위로 같은 수 집합 저장
=>길이 n에 안에 배열은 집합개수에 따라 달라짐.
이중 for문해서 각각 체크.
첫 열 돌다 2의 제곱수면서 같은 숫자 집합 인덱스 저장. 이후 숫자도 
각각의 2의제곱수까지 두번째 열 체크
2번째 열에서 숫자 같은거 2의 제곱수번째 안에서만 
이거 반복.
내 예상
1,0,3.  0,4,6=>0,4,5  0,6,6 
*/
function solution(arr) {
  let answer = [0,0];//0과 1의 개수
  const arrLen=arr.length

  const quad=(col,row,count)=>{
      let temp=arr[col][row]
      let dFlag=false
      for(let i=col;i<col+count;i++){
          for(let j=row;j<row+count;j++){
              if(temp!==arr[i][j]) {
                  //4등분 해야함
                  dFlag=true
                  break
              }
              if(dFlag)break
          }
      }
      if(dFlag){
          quad(col,row,count/2)
          quad(col+count/2,row,count/2)
          quad(col,row+count/2,count/2)
          quad(col+count/2,row+count/2,count/2)
      }else{ //안나눠도 됨. 하나 ++
          answer[temp]++
      }
      
  }
  quad(0,0,arrLen)
  return answer;
}

// 다른 사람 코드
function solution(arr) {
  const quadZip = (row, col, n) => {
      if(n < 2) return arr[row][col] ? [0, 1] : [1, 0];
      let cnt0 = 0, cnt1 = 0; n >>= 1;
      for(let [i, j] of [[0,0],[0,1],[1,0],[1,1]]) {
          let [zero, one] = quadZip(row+i*n, col+j*n, n);
          cnt0 += zero;
          cnt1 += one;
      }
      if(cnt0 === 0) return [0, 1];
      if(cnt1 === 0) return [1, 0];
      return [cnt0, cnt1];
  }
  return quadZip(0, 0, arr.length);
}