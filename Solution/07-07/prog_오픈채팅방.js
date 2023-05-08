function solution(record) {
  var answer = [];
  const uid = {};
  record.map((message) => {
    const [ins, id, nicname] = message.split(" ");
    if (ins !== "Leave") uid[id] = nicname;
  });
  record.map((message) => {
    const [ins, id, nicname] = message.split(" ");
    if (ins === "Enter") answer.push(uid[id] + "님이 들어왔습니다.");
    if (ins === "Leave") answer.push(uid[id] + "님이 나갔습니다.");
  });
  return answer;
}
