function solution(absolutes, signs) {
  let answer = 0
  for(let i=0;i<signs.length;i++){

      answer+=signs[i]?absolutes[i]:-1*absolutes[i]
  }
  return answer;
}
//다른 사람 코드
//속도 면에서 for가 더 빠르기는 하나 가독성과 유지보수성에서 reduce도 사용하는 것을 연습해야함
//$.each(제이쿼리 객체) > map > filter == forEach > reduce > for loop
// function solution(absolutes, signs) {

//   return absolutes.reduce((acc, val, i) => acc + (val * (signs[i] ? 1 : -1)), 0);
// }