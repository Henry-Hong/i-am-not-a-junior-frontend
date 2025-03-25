function solution(S) {
  const n = S.length;
  // 각 알파벳별로 등장 인덱스를 저장할 배열(26개)
  const positions = Array.from({ length: 26 }, () => []);

  // 1. 각 문자 등장 위치 수집
  for (let i = 0; i < n; i++) {
    const c = S.charCodeAt(i) - 97; // 'a' = 97
    positions[c].push(i);
  }

  // 2. 인접한 인덱스 쌍 (i_k, i_{k+1}) 로부터 만들 수 있는 구간을 전부 구한다.
  const intervals = [];
  for (let c = 0; c < 26; c++) {
    const arr = positions[c];
    // arr = [i1, i2, i3, i4, ...] (정렬된 상태)
    for (let k = 0; k < arr.length - 1; k++) {
      // i_k와 i_{k+1}로 만들 수 있는 구간
      const start = arr[k];
      const end = arr[k + 1];
      // 길이가 2 이상이면 유효
      if (end > start) {
        intervals.push([start, end]);
      }
    }
  }

  // 3. 인터벌들을 끝점 기준으로 정렬
  intervals.sort((a, b) => a[1] - b[1]);

  // 4. 겹치지 않게 고르는 그리디
  let answer = 0;
  let lastEnd = -1; // 마지막으로 선택된 구간의 끝 인덱스
  for (const [start, end] of intervals) {
    if (start > lastEnd) {
      // 겹치지 않으면 선택
      answer++;
      lastEnd = end;
    }
  }

  return answer;
}

console.log(solution("sashalikesana"));
console.log(solution("zzaaabbccall"));
console.log(solution("thing"));
console.log(solution("a"));

function solutionBruteForce(S) {
  const n = S.length;
  const intervals = [];

  // 1. 모든 (i, j) 쌍에 대해 부분문자열 후보 찾기
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      // 시작 문자와 끝 문자가 같고, 길이가 2 이상
      if (S[i] === S[j]) {
        intervals.push([i, j]);
      }
    }
  }

  // 2. 끝점 기준으로 정렬
  intervals.sort((a, b) => a[1] - b[1]);

  // 3. 인터벌 스케줄링(그리디)로 겹치지 않는 최대 개수 찾기
  let answer = 0;
  let lastEnd = -1;
  for (const [start, end] of intervals) {
    if (start > lastEnd) {
      answer++;
      lastEnd = end;
    }
  }

  return answer;
}

console.log(solutionBruteForce("sashalikesana"));
console.log(solutionBruteForce("zzaaabbccall"));
console.log(solutionBruteForce("thing"));
console.log(solutionBruteForce("a"));
