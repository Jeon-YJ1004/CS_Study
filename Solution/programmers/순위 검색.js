const binarySearch = (arr, target) => {
  let start = 0;
  let end = arr.length - 1;
  let mid = Math.floor((start + end) / 2);
  while (start <= end) {
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) start = mid + 1;
    else end = mid - 1;
    mid = Math.floor((start + end) / 2);
  }
  return mid + 1;
}

const splitCondition = (info) => {
  const condition = {};
  info.forEach(e => {
    const c = e.split(" ")
    const key = "" + c[0] + c[1] + c[2] + c[3];
    if (condition[key]) condition[key].push(Number(c[4]));
    else condition[key] = [Number(c[4])];
  });

  for (const key in condition) {
    condition[key].sort((a, b) => a - b);
  }
  return condition;
}
const filterCondition = (infos, query, score) => {
  const allkey = Object.keys(infos)

  return allkey
    .filter(key => query.every(q => key.includes(q)))//쿼리를 만족하는 키값 분류
    .reduce((acc, curr) => acc + infos[curr].length - binarySearch(infos[curr], score), 0);//그 키값에서 점수 이상인 애들만 합산
}
function solution(info, query) {
  let answer = [];
  //부분 집합 만들기 3*2*2*2
  let condition = splitCondition(info);
  //쿼리 문자열 처리하기
  query.forEach(q => {
    let _q = q.split(/ and | |-/ig).filter(v => v !== "")
    let score = _q.pop();

    answer.push(filterCondition(condition, _q, Number(score)))
  })

  return answer;
}
/* 사람 수<=오만 쿼리<=십만
효율성, 정확성
정확성은 부르트 포스
사람을 순회하며 조건을 키값으로 만들어줌 ,쿼리를 순회하면서 키에 맞는 조건 필터링
=> 조건을 얼마 없기 때문에 사람들에 대해 조건 순회하며 필터링은 가능

부분집합+이분 탐색

*** 정규 표현식!!
정답 코드 let _q = q.split(/ and | |-/i).filter(v => v !== "")
 query
    .map(q => q
       .split(/ and | |-/i) //' and '와 ' '와 '-'이 들어가 있는 친구들 기준으로 split 
       .filter(v => v !== "") // `split`에 의해 값이 "" 처리가 된 친구들을 없애기
    ) // 쿼리 조건들을 필터링
    .forEach(query => {
      const score = query.pop();
      const result = filterCondition(infos, query, score);
      answer.push(result) // getResult로 인해 누산된 결과값을, answer에 넣기
    })
    
틀린 내 코드 let _q = q.split(/and||-/i).filter(v => v !== "")
 query.forEach(q => {
    let _q = q.split(/ and | |-/ig).filter(v => v !== "")
    let score = _q.pop();

    answer.push(filterCondition(condition, _q, Number(score)))
  })
*/
