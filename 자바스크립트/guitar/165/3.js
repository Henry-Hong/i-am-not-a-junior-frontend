function solution(A) {
  const N = A.length;

  // 최소 길이가 5 이상이므로(문제에서 N >= 5),
  // 인접하지 않은 두 지점을 고르는 것은 항상 가능합니다.

  // minUpTo[i] = A[0..i] 구간에서의 최솟값
  const minUpTo = new Array(N).fill(Infinity);
  minUpTo[1] = A[1];
  for (let i = 2; i < N - 1; i++) {
    minUpTo[i] = Math.min(minUpTo[i - 1], A[i]);
  }

  console.log({ minUpTo });

  let answer = Infinity;
  // i를 '두 번째 자르는 위치'라고 생각했을 때
  // P + 1 < Q 이므로, Q = i, P는 i-2 이하의 인덱스여야 함
  // 즉, minUpTo[i-2] + A[i] 의 최솟값을 찾으면 됨
  for (let i = 3; i < N - 1; i++) {
    const cost = minUpTo[i - 2] + A[i];
    if (cost < answer) {
      answer = cost;
    }
  }

  return answer;
}

console.log(solution([5, 2, 4, 6, 3, 7])); // 예시대로라면 5가 출력됩니다.
console.log(solution([1, 2, 3, 4, 5]));
