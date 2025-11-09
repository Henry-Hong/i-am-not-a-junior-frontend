const OVERFLOW_FLAG = 1_000_000_000;

function solution(A) {
  const N = A.length;
  const count = new Array(N + 1).fill(0);

  for (const v of A) count[v]++;

  let moves = 0;
  let target = 1;

  for (let val = 1; val <= N; val++) {
    let c = count[val];
    while (c-- > 0) {
      moves += Math.abs(val - target);
      if (moves > OVERFLOW_FLAG) return -1;
      target++;
    }
  }

  return moves;
}

// function solution2(A) {
//     const N = A.length;
//     const arr = [...A].sort((a,b) => a-b);
//     let moves = 0;

//     for(let i=0; i<N; i++){
//         moves += Math.abs((arr[i] - (i+1)));
//         if(moves > OVERFLOW_FLAG){
//             return -1;
//         }
//     }
//     return moves;
// }
