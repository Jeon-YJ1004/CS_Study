function solution(n, arr1, arr2) {
    let answer = [];
    for(let i=0;i<n;i++){
        let arr1_2=arr1[i].toString(2).padStart(n,0);
        let arr2_2=arr2[i].toString(2).padStart(n,0);
        let temp="";
        for(let j=0;j<n;j++){
            //벽
            if(arr1_2.charAt(j)==1 || arr2_2.charAt(j)==1) temp+="#"
            //공백
            else temp+=" "
        }
        answer.push(temp)
    }
    return answer;
}
