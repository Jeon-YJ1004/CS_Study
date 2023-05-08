//1713 후보 추천하기
// 아직 미해결
const fs = require("fs");
const [N, I, ...arr] = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin")
    : `3
9
2 1 4 3 5 6 2 7 2`
)
  .toString()
  .trim()
  .split("\n");

// 정렬: 추천 수 내림차순-> 추천 날짜가 내림 차순 / 뒤부터 삭제
// 출력: 최종 후보 N명. 기호 번호 오름차순
// 길이가 N인 배열[후보 기호]에 arr에 맞춰 넣기, 넣을때 마다 정렬해줘서 자리가 없으면 마지막을 변경
// candidate={후보보기호:넣은 날짜, 추천수}
let candidates = new Array(101);
let temp = new Array(0);
function Candidate(num, count, day, inList) {
  this.num = num;
  this.count = count;
  this.day = day;
  this.inList = inList;
}
function comparable(a, b) {
  // if(a.count==b.count){
  //     return b.day-a.day
  // }
  // return b[2]-a[2]
}
for (let i = 0; i < I.length; i++) {
  let num = array[i];
  //최초 호출
  if (candidates[num] == null) {
    candidates[num] = new Candidate(num, 0, 0, false);
  }
  if (candidates[num].inList) candidates[num].count++;
  else {
    //    틀에 없음
    if (temp.length() === N) {
      temp.sort(comparable());
      delete temp[0];
    }
    //    틀에 여유 있음
    candidates[num].count = 1;
    candidates[num].day = i;
    temp.push(candidates[num]);
  }
}
