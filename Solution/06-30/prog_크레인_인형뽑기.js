function solution(board, moves) {
  let answer = 0;
  let box = [];
  const board_len = board.length;
  // 이중 for문을 돌면서 박스 마지막 값과 뽑은 값이 같다면 ++
  for (let i = 0; i < moves.length; i++) {
    for (let j = 0; j < board_len; j++) {
      let item = board[j][moves[i] - 1];
      if (item != 0) {
        if (box[box.length - 1] !== item) {
          box.push(item);
        } else {
          box.pop();
          answer += 2;
        }
        board[j][moves[i] - 1] = 0;
        break;
      }
    }
  }
  return answer;
}
