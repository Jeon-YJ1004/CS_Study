function solution(input_string) {
  var answer = [];
  let alpa = Array(26).fill(0);
  let prev = input_string.slice(0, 1);
  alpa[prev.charCodeAt(0) - 97] = 1;
  for (let i = 1; i < input_string.length; i++) {
    let num = input_string[i].charCodeAt(0) - 97;
    if (input_string[i] !== prev) alpa[num]++;
    prev = input_string[i];
  }
  alpa.forEach((e, i) => {
    if (e > 1) answer.push(String.fromCharCode(i + 97));
  });
  if (answer.length === 0) return "N";
  else return answer.sort().join("");
}
