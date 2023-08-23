/*
**첫번째 로직
옮겨야할 상황이 어떨때?
넣으려는 자리부터 110 이니까 그 이후 세자리가 1일때는 무조건 앞 사전
-110 뒤에 0이 나오면
- 111이 나오면 이후에 있던 110을 그 앞으로 
안됌.. 


// function solution(s) {
//   var answer = []
// s.forEach(e=>{
// if(e.includes('110')){
//    let count=''
//    while(e.includes('110')){

//        e=e.replace('110','')
//        count+='110'
//    }
//    for (let i = e.length-1; i>=0; i--) {
//        if(e[i]==='0'){
//            let temp=e.slice(0,i+1)+count+e.slice(i+1)
//            answer.push(temp)
//            break
//        }
//        if(i===0){
//            let temp=count+e
//            answer.push(temp)
//        }
//    }
// }else answer.push(e)
// })
// return answer
// }

// 시간 초과 해결을 위해 while문을 바꿈
//while(true){
//         if (i > e.length) break;
//         let j=e.indexOf('110',i)
//         if(j!==-1){
//             e=e.substring(0,j)+e.substring(j+3)
//         count+='110'
//         i+=j-3
//         if(i<0)i=0
//         }else break
       
//     }
//     if(e.length===0)answer.push(count)

// 테스트 실패ㅜ

**두번째 로직
-110이 생기지 않을 때까지 배열에서 제거
-남은 배열에서 마지막 0 다음에  다 넣기


var answer = []
s.forEach(e=>{
if(e.includes('110')){
   let count=''
   let i=0
   while(true){
       if (i > e.length) break;
       let j=e.indexOf('110',i)
       if(j!==-1){
           e=e.substring(0,j)+e.substring(j+3)
           count+='110'
           i+=j-3
           if(i<0)i=0
           console.log(e)
       }else break
       
   }
   if(e.length===0)answer.push(count)
   else{
       for (let i = e.length-1; i>=0; i--) {
       if(e[i]==='0'){
           let temp=e.slice(0,i+1)+count+e.slice(i+1)
           answer.push(temp)
           break
       }if(i===0){
           let temp=count+e
           answer.push(temp)
       }
   }
   }
   
}else answer.push(e)
})
console.log(answer)
*/

/*
마지막 코드
백만자리-> 완탐 불가
줄일 수 있는 패턴 찾기

사전 순 앞으로 
000 - 001 - 010 - 011 - 100 - 101 - 110 - 111

옮겨야할 상황이 어떨때?
넣으려는 자리부터 110 이니까 그 이후 세자리가 1일때는 무조건 앞 사전
1. 문자열에서 110 찾기. 찾은 110을 빼고 빼도 만들어지지 않을 때까지
-> 백만자리기 때문에 while로 replace 하면 시간초과남 =< O(n)안에 수행해야함
-> 스택 사용
2. 스택에 넣으면서 스택의 앞 3개가 110이면 빼고 count++
3. 110 재배치-> 앞에서부터 확인 후 111 이 있다면 그 앞에 없으면 맨 뒤.
*/
function solution(s) {
  let answer = []

s.forEach(e=>{
if(e.includes('110')){
   let stack=[]
   let count=0
   let arr=e.split('')
   let i=0
   for(let i=0;i<arr.length;i++){
       const three=arr[i]
       if(stack.length>1){
           const two=stack.pop()
           const one=stack.pop()
           if(one === '1' &&two === '1' && three === '0') {
             count++
             continue
           }
           else stack.push(one, two, three)
       } else stack.push(three)
   }
    let temp=[]
    const keyword = "011";
   while(stack.length){
       //뒤에서 부터 넣기
       const back=stack.pop() 
       //만약 0이면 while문 끝내고 1이면 그대로 temp 에 넣기
       if(back==='0'){
           stack.push(back)
           break
       }
       temp.push(back)
   }
    //1다 넣은 temp에 110 개수만큼 넣기
   while(count){
    temp.push(...keyword)
    count--
   }
   // 나머지 0 넣기
   while(stack.length) temp.push(stack.pop())
    answer.push(temp.reverse().join(''))
}else answer.push(e)
})

return answer

}