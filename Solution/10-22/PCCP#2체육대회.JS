function solution(ability) {
  let student = ability.length;
  let sport = ability[0].length;
  let visited = Array(student).fill(false);
  let max_sum = 0;
  const dfs = (start, sum) => {
    if (start === sport) {
      max_sum = Math.max(max_sum, sum);
      return;
    }
    for (let i = 0; i < ability.length; i++) {
      if (!visited[i]) {
        visited[i] = true;
        dfs(start + 1, sum + ability[i][start]);
        visited[i] = false;
      }
    }
  };
  dfs(0, 0);
  return max_sum;
}
