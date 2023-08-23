/*
n은 100, m은 20-> 단순 구현으로도 가능 
term 약관종류  유효기간 달수
privacies 날짜YYYY.MM.DD 약관 종류A~Z
01.01까지 일경우 02부터 ㄴㄴ
01.28까지 -> 01부터 ㄴㄴ
**term을 Set으로 넣어줘도 좋을 듯
*/
function solution(today, terms, privacies) {
  let answer = [];
  let privac=privacies.slice()
  let term=terms.slice()
  //투데이 날짜 구분하기
  let [year,month,day]=today.split(".").map(Number)

  //terms 정렬하기,재정의하기
  for (let i = 0; i < terms.length; i++) {
    term[i]=terms[i].split(" ")
    term[i][1]=Number(term[i][1])
  }
  term.sort()
  //privac 정렬하기,재정의하기 종류 날짜, 개인정보 인덱스
  for (let i= 0; i < privacies.length; i++) {
    const e = privacies[i];
    let [date,kinds]=e.split(" ")
    let [y,m,d]=date.split(".").map(Number)
    privac[i]=[kinds,y,m,d,i]
  }
  privac.sort()
  let currT=0

  for (let i = 0; i < privac.length; i++) {
    // 일자에 약관의 유효기간을 더하고, 더한 수가 오늘보다 작거나 같으면 파기해야함
    //1. 약관의 종류 맞추기
    while(1){
      if(term[currT][0]===privac[i][0]) break
      currT++
    }
    let y=parseInt(term[currT][1]/12)
    let m=term[currT][1]%12
    let [dY,dM,dD]=[privac[i][1]+y,privac[i][2]+m,privac[i][3]]
    // 달이 12를 넘어갈 경우 년도를++
    // 12+12 경우를 추가해야함!!!@!!@
    if(dM>12){
      dY++
      dM-=12
    }
    if(dY<year)answer.push(privac[i][4]+1)
    else if(dY===year&&dM<month)answer.push(privac[i][4]+1)
    else if(dY===year&&dM===month&&dD<=day)answer.push(privac[i][4]+1)
  }
   return answer.sort((a,b) => a-b);
}
//answer.sort()를 리턴하면, 문자열로 인식해서 정렬하기때문에 유니코드 포인트 순서로 비교하여 정렬된다.
//ex)숫자 정렬에서는 9가 80보다 앞에 오지만 숫자는 문자열로 변환되기 때문에 "80"은 유니 코드 순서에서 "9"앞에온다.
/*다른 사람 코드. 나보다 시간이 두배 덜 걸린다.
function solution(today, terms, privacies) {
  var answer = [];
  var [year, month, date] = today.split(".").map(Number);
  var todates = year * 12 * 28 + month * 28 + date;
  var t = {};
  terms.forEach((e) => {
    let [a, b] = e.split(" ");
    t[a] = Number(b);
  });
  privacies.forEach((e, i) => {
    var [day, term] = e.split(" ");
    day = day.split(".").map(Number);
    var dates = day[0] * 12 * 28 + day[1] * 28 + day[2] + t[term] * 28;
    if (dates <= todates) answer.push(i + 1);
  });
  return answer;
}
*/