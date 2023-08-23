/*
parent[]= 인덱스의 부모 노드 저장. 전역변수

t=1000 n=50*50 
명령어의 개수: 1000개
명령어 하나 당 사용 가능한 최대 시간 100000
n = 50 * 50

update1: 
1.curr의 parent를 찾기(find)
2.parent의 value update
3.병합된 애들도 다 업데이트

update2:
value1을 갖고 있는 parent노드 찾기?
or 그냥 다 돌기 50*50

merge: 위치2의 부모를 위치1로 바꾸기 union, update
unmerge: 값을 temp에 저장 후 나머지는 다 빈 공간으로 원상복구

그룹 확인=>같은 부모를 같은 인덱스도 바꿔주기=>부모값만 갱신
=> 결국 부모값만 확인하면 됨
union,find 시간 복잡도:O(logN)

***틀린 이유-인덱스는 0부터인데 1~50까지니까 처리해줘야함
***        - union할때 값이 없는 애가 처음 인자일 수 있다.
           - unmerge 는 for문으로 순서대로 하기때문에 union에서 자식의 부모값도 최상위 부모로 바꿔주지 않으면 타고 들어갈 수 없다.
           -B가 C의 부모인 상태에서 A와 C를 병합하려고 하면 B와 C의 부모를 모두 업데이트해 주어야 합니다. C의 부모만 A로 수정하면 문제가 발생합니다.
*/
// function solution(commands) {
//     var answer = [];
//     let parent = Array.from({ length: 51 }, (e, i) => Array.from({ length: 51 }, (e2, i2) => [i, i2]))
//     //50*50 배열
//     let arr = Array.from({ length: 51 }, e => Array(51))

//     const findParent = (x, y) => {
//         if (parent[x][y][0] == x && parent[x][y][1] == y) return [x, y]
//         return parent[x][y] = findParent(parent[x][y][0], parent[x][y][1])
//     }
//     const union = (x1, y1, x2, y2) => {
//         if (x1 === x2 && y1 === y2) return
//         //더 작은 수를 부모값으로
//         let parentA = findParent(x1, y1)
//         let parentB = findParent(x2, y2)
//         if (parentA === parentB) return
//         const value = arr[parentA[0]][parentA[1]] !== null ? arr[parentA[0]][parentA[1]] : arr[parentB[0]][parentB[1]];
//         for (let i = 1; i < 51; i++) {
//             for (let j = 1; j < 51; j++) {
//                 let temp = findParent(i, j)
//                 if (parentB[0] === temp[0] && parentB[1] === temp[1]) {
//                     parent[i][j] = parentA
//                     arr[i][j] = value
//                 }
//             }
//         }
//     }
//     commands.forEach(c => {
//         let command = c.split(" ")
//         //5가지 명령어 구분하기
//         if (command[0] === "UPDATE" && command.length === 4) {
//             //그룹 확인=>부모의 값만 갱신
//             let p = findParent(Number(command[1]), Number(command[2]))
//             arr[p[0]][p[1]] = command[3]
//         } else if (command[0] === "UPDATE" && command.length === 3) {
//             for (let i = 1; i < 51; i++) {
//                 for (let j = 1; j < 51; j++) {
//                     if (arr[i][j] === Number(command[1])) arr[i][j] = Number(command[2])
//                 }
//             }
//         } else if (command[0] === "MERGE" && command.length === 5) {
//             //그룹의 부모들도 갱신해야힘(unMerge때문에)
//             union(Number(command[1]), Number(command[2]), Number(command[3]), Number(command[4]))
//         } else if (command[0] === "UNMERGE" && command.length === 3) {
//             //해당 위치의 부모값을 갖고 있는 노드들 구하기
//             let p = findParent(Number(command[1]), Number(command[2]))
//             let value = arr[p[0]][p[1]]
//             for (let i = 1; i < 51; i++) {
//                 for (let j = 1; j < 51; j++) {
//                     let temp = findParent(i, j)
//                     if (p[0] === temp[0] && p[1] === temp[1]) {//부모가 같으니끊어내기
//                         parent[i][j] = [i, j]
//                         arr[i][j] = null
//                     }
//                 }
//             }
//             arr[Number(command[1])][Number(command[2])] = value
//         } else if (command[0] === "PRINT" && command.length === 3) {
//             let p = findParent(Number(command[1]), Number(command[2]))
//             arr[p[0]][p[1]] == null ? answer.push("EMPTY") : answer.push(arr[p[0]][p[1]])
//         }

//     })
//     return answer;
// }
/*
class Node는 배열의 값이므로 몇번째 인덱스인지 식별하지 않아도 된다.
값과 부모/자식 배열만 있으면 된다.
merge는 앞에 있는 값이 n2 이다. 
*/

const Cell = class {
    constructor() {
        this.parent = null
        this.child = []
        this.value = null;
    }
    findParent() {
        if (this.parent) return this.parent
        return this
    }
    getValue() {
        return this.findParent().value
    }

    updateValue(newValue) {
        this.findParent().value = newValue
    }
    merge(n2) {
        let parent2 = n2.findParent()
        let myParent = this.findParent()
        if (parent2 === myParent) return
        myParent.child.forEach(c => {
            c.parent = parent2
            parent2.child.push(c)
        })
        // parent2에 소속됐으니 자식 초기화
        myParent.child = []
        myParent.parent = parent2
        parent2.child.push(myParent)
        if (parent2.value === null) parent2.value = myParent.value
        myParent.value = null
    }
    unmerge() {
        let p = this.findParent()
        let v = this.getValue()
        p.child.forEach(c => {
            c.parent = null
            c.value = null
        })
        p.value = null
        p.child = []
        p.parent = null
        this.value = v
    }
}
function solution(commands) {
    let answer = []
    let arr = Array.from({ length: 51 }, e => Array.from({ length: 51 }, e => new Cell()))
    commands.forEach(c => {
        let command = c.split(" ")
        //5가지 명령어 구분하기
        if (command[0] === "UPDATE" && command.length === 4) {
            arr[Number(command[1])][Number(command[2])].updateValue(command[3])
        } else if (command[0] === "UPDATE" && command.length === 3) {
            for (let i = 1; i < 51; i++) {
                for (let j = 1; j < 51; j++) {
                    if (arr[i][j].value === command[1]) arr[i][j].updateValue(command[2])
                }
            }
        } else if (command[0] === "MERGE") {
            if (Number(command[1]) !== Number(command[3]) || Number(command[2]) !== Number(command[4])) {
                const n2 = arr[Number(command[1])][Number(command[2])]
                arr[Number(command[3])][Number(command[4])].merge(n2)
            }
        } else if (command[0] === "UNMERGE") {
            arr[Number(command[1])][Number(command[2])].unmerge()
        } else if (command[0] === "PRINT") {
            arr[Number(command[1])][Number(command[2])].getValue() == null ? answer.push("EMPTY") : answer.push(arr[Number(command[1])][Number(command[2])].getValue())
        }
    })
    return answer
}
console.log(solution(["UPDATE 1 1 a", "UPDATE 1 2 b", "UPDATE 2 1 c", "UPDATE 2 2 d", "MERGE 1 1 1 2", "MERGE 2 2 2 1", "MERGE 2 1 1 1", "PRINT 1 1", "UNMERGE 2 2", "PRINT 1 1"]))
