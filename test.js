function solution(numStr) {
    if(isNaN(numStr) || numStr.length > 10) {
        return 0;
    }

    let answer = 0;

    const str = numStr + '';
    const pos = str.split('.')?.[0];
    const neg = str.split('.')?.[1];

    if(!!pos) {
        for(let i = 0; i < pos.length; i++) {
            answer += +pos[i];
        }
    }

    if(!!neg) {
        for(let i = 0; i < neg.length; i++) {
            answer -= +neg[i];
        }
    }
    return answer;
}


console.log(solution('0'))