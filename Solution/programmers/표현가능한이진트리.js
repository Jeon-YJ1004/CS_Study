/*
트리 순회방법: 중위 순회=> 이진 탐색으로 하기
문자열을 반으로 나누고 나눈걸 나누고 해서 1이 되면 트리에 넣어주기
더미노드면 문자열 뒤에 0,아니면 1
1 주어진 n 만-> 
2 이진법으로 바꾸기-> 포화 이진트리 형태에 맞게 앞에 0붙이기.
3 트리 생성 
4 가능 여부 따지기

안되는 경우:1의 부모노드가 0=> 문자열의 가운데 숫자가(루트노드가) 0인경우 무조건 안됌
반대로 생각하면 0인 노드의 자식 노드가 1인 경우=> 루트 부터 
*/

let number=[7, 42, 5]
const checkBiTree=(tree,start,end)=>{
  //루트노드 부터 즉 부모노드부터 0인지 확인 후 맞으면 자식 노드가 1인지 체크
  let parent=Math.floor((start+end)/2)
  let left=Math.floor((start+parent-1)/2)
  let right=Math.floor((parent+1+end)/2)
  // 재귀 종료 조건. 리프노드에 도달했는지 확인
  if(start===end) return true
  // 부모 노드가 0일 때 왼.오 자식 노드 중 1이 있으면 거짓
  if(tree[parent]==='0'&&(tree[left]==='1'||tree[right]==='1')) return false
  //왼,오 자식의 자식을 체크하기 위해 재귀
  if (!checkBiTree(tree, start, parent-1)) return false;
  if (!checkBiTree(tree, parent+1, end)) return false;
  return true;
}
function solution(numbers) {
  var answer = [];
  numbers.forEach(num=>{
    let bi=num.toString(2)
    let biLen=bi.length
    let tLevel=biLen.toString(2).length//트리의 레벨 개수
    let biTree='0'.repeat(2**tLevel-1-biLen) //앞에 넣을 0의 개수
    biTree+=bi
    if (checkBiTree(biTree, 0, biTree.length-1))answer.push(1)
    else answer.push(0)
  })
  return answer;
}
console.log(solution(number))