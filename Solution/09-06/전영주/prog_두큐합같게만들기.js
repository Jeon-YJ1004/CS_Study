//최대 원소 10^9이므로 push shift하면 시간 초과.
function solution(queue1, queue2) {
  const getSum = (q) =>
    q.reduce((acc, curr) => {
      return (acc += curr);
    }, 0);
  let sum = getSum(queue1) + getSum(queue2);
  let half = sum / 2;
  if (sum % 2 == 1) return -1;

  let max_count = queue1.length * 3;
  let queue = [...queue1, ...queue2, ...queue1, ...queue2];
  let [current_sum, plus, minus, count] = [getSum(queue1), queue1.length, 0, 0];
  while (count < max_count) {
    if (current_sum == half) return count;
    else if (current_sum < half) {
      current_sum += queue[plus];
      plus++;
      count++;
    } else {
      current_sum -= queue[minus];
      minus++;
      count++;
    }
  }
  return -1;
}
