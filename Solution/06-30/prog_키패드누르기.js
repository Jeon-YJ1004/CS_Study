function solution(numbers, hand) {
  let answer = [];
  let left = 10;
  let right = 12;
  for (var i = 0; i < numbers.length; i++) {
    if (numbers[i] == 0) {
      numbers[i] = 11;
    }
  }
  numbers.forEach((num) => {
    //         무조건 왼손
    if (num == 1 || num == 4 || num == 7) {
      answer.push("L");
      left = num;
      //         무조건 오른손
    } else if (num == 3 || num == 6 || num == 9) {
      answer.push("R");
      right = num;
    } else {
      //          가까운 손가락=>거리비교. 거리가 같으면 왼/오른손잡이로 판단.
      let distance_L = 0;
      let distance_R = 0;
      //         왼손이 왼쪽에 있을때
      if (left == 1 || left == 4 || left == 7 || left == 10) {
        distance_L = Math.abs((num - left - 1) / 3) + 1;
      } else {
        //왼손이 가운데 있을때
        distance_L = Math.abs((num - left) / 3);
      }
      //         오른손이 오른쪽에...
      if (right == 3 || right == 6 || right == 9 || right == 12) {
        distance_R = Math.abs((num - right + 1) / 3) + 1;
      } else {
        //오른손이 가운데 있을때
        distance_R = Math.abs((num - right) / 3);
      }
      if (distance_L == distance_R) {
        if (hand == "left") {
          answer.push("L");
          left = num;
        } else {
          answer.push("R");
          right = num;
        }
      } else if (distance_L > distance_R) {
        //오른손이 가까움
        answer.push("R");
        right = num;
      } else {
        answer.push("L");
        left = num;
      }
    }
  });
  return answer.join("");
}
