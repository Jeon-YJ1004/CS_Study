function solution(absolutes, signs) {
  let answer = 0
  for(let i=0;i<signs.length;i++){

      answer+=signs[i]?absolutes[i]:-1*absolutes[i]
  }
  return answer;
}