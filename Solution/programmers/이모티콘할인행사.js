/*
dfs?재귀
emoticons<=7 
각각 이모티콘의 할인율 몇으로 할지-> 최대 4^7의 경우의 수
사용자 수를 n, 이모티콘 수를 m 이면 O(4^n × n × m)
임티의 모든 할인율에서 구매여부 따지며 가입자 수와 매출액 계산

**중간에 이모티콘 구매 모두 취소가 있음-> 어떻게??
사람마다 총 구매 금액 배열을 만들까? n<=100이니까 가능이긴 함

*/
function solution(users, emoticons) {
  let cases=[]
  let discountRatio=new Array(emoticons.length)
  const calIncome=()=>{
    let sum=0
    let sub=0
    for(let j=0;j<users.length;j++){
      let charge=0
      discountRatio.forEach((e,i)=>{
        let discount=1-e/10
        if(users[j][0]<=e*10){//사야함
          charge+=emoticons[i]*discount
         
      }
      })
       //플러스 가입 여부 따지기    
      if(users[j][1]<=charge){// 플러스 가입
        sub++
      }else sum+=charge
  }
    cases.push([sub,sum])
  }
  const dfs=(emt)=>{
      //재귀 종료 조건
      if(emt===emoticons.length){
          //총 판매 금액 구하기
          calIncome()          
          return 
      } 
      //이모티콘의 할인율을 1~40퍼로 설정후 모든 사용자의 구매 여부를 업데이트해서 다음 임티로 
      for(let i=4;i>=1;i--){
          discountRatio[emt]=i
          //다음 임티에서 할인율 설정하기
          dfs(emt+1)
      } 
  } 
  dfs(0)
  cases.sort((a,b)=>b[0]-a[0]||b[1]-a[1])
  console.log(cases)
  return cases[0]
}

console.log(solution(	[[40, 2900], [23, 10000], [11, 5200], [5, 5900], [40, 3100], [27, 9200], [32, 6900]], [1300, 1500, 1600, 4900]))

// //처음에 틀린 코드
// function solution(users, emoticons) {
//   let cases=[]
//   let u=users.slice()
//   u.forEach(e=>e.push(0))
//   const dp=(user,emt,sub)=>{
//       //재귀 종료 조건
//       if(emt>=emoticons.length){
//           //총 판매 금액 구하기
//           let sum=user.reduce((acc,curr)=>acc+curr[2],0)
//           console.log([sub,sum])
//           cases.push([sub,sum])
//           return 
//       } 
//       //이모티콘의 할인율을 1~40퍼로 설정후 모든 사용자의 구매 여부를 업데이트해서 다음 임티로 
//       for(let i=1;i<=4;i++){
//           let discount=1-i/10
//           for(let j=0;j<user.length;j++){
//               if(user[j][0]<=i*10&&user[j][1]>0){//사야함
//                   user[j][1]-=emoticons[emt]*discount
//                   //플러스 가입 여부 따지기
//                   if(user[j][1]<=0){// 플러스 가입
//                       user[j][2]=0
//                       sub++
//                   }else user[j][2]+=emoticons[emt]*discount
//               }
//           }
//           //다음 임티에서 할인율 설정하기
//           dp(user,emt+1,sub)
//       } 
//   } 
//   dp(u,0,0)
//   cases.sort((a,b)=>b[0]-a[0]||b[1]-a[1])

//   return cases[0]
// }