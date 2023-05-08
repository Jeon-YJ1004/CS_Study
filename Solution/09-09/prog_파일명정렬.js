function solution(files) {
  var answer = [];
  answer = files.sort((a, b) => {
    //정규 표현식(RegExp)이용
    //숫자
    const [numbersA, numbersB] = [a.match(/\d+/), b.match(/\d+/)];
    const [numA, numB] = [Number(numbersA[0]), Number(numbersB[0])]; //head 다음의 숫자
    //영문, numbers.index부터 숫자임
    const [headA, headB] = [
      a.slice(0, numbersA.index).toLowerCase(),
      b.slice(0, numbersB.index).toLowerCase(),
    ];
    return headA < headB
      ? -1
      : headA > headB
      ? 1
      : numA < numB //head가 같을때
      ? -1 //head는 같고 number는 다를때
      : numA > numB //head는 같고 number는 다를때
      ? 1
      : 0; //number가 같을때
  });
  return answer;
}
