function maxDifferentSongs(play_list, listen_time) {
  const n = play_list.length;

  // prefix sum 계산
  const prefix = new Array(n + 1).fill(0);
  for (let i = 0; i < n; i++) {
    prefix[i + 1] = prefix[i] + play_list[i];
  }
  const L = prefix[n];

  // 전체 플레이리스트 길이보다 오래 들으면 모든 곡 들을 수 있음
  if (listen_time >= L) {
    return n;
  }

  const T = listen_time;

  // 경계(곡 시작 시각)들을 2배로 펼친 배열 P
  const P = new Array(2 * n);
  for (let i = 0; i < n; i++) {
    P[i] = prefix[i]; // 첫 번째 바퀴
    P[i + n] = prefix[i] + L; // 두 번째 바퀴
  }

  let right = 0;
  let answer = 0;

  for (let k = 0; k < n; k++) {
    const b = P[k]; // 이 경계 바로 직전 곡의 끝 직전에서 시작한다고 생각

    // right 포인터를 가능한 만큼 앞으로 이동: P[right] < b + T
    if (right < k) right = k;
    const limit = b + T;
    while (right < k + n && P[right] < limit) {
      right++;
    }

    const boundariesInRange = right - k; // [b, b+T) 안의 곡 시작 경계 수

    // 시작 곡 index (k 경계 바로 앞 곡)
    const startIdx = (k - 1 + n) % n;
    const startBoundary = P[startIdx]; // 첫 번째 바퀴에서의 시작 시각
    let containsStartBoundary = false;

    // 시작 곡의 경계가 [b, b+T) 안에 있는지 체크 (두 바퀴 중 하나)
    if (b <= startBoundary && startBoundary < limit) {
      containsStartBoundary = true;
    } else {
      const startBoundary2 = startBoundary + L;
      if (b <= startBoundary2 && startBoundary2 < limit) {
        containsStartBoundary = true;
      }
    }

    // 시작한 곡 1개 + 범위 안의 경계 수 - (시작 곡 중복이면 1 빼기)
    const songs = 1 + boundariesInRange - (containsStartBoundary ? 1 : 0);
    if (songs > answer) {
      answer = songs;
    }
  }

  return answer;
}

// // 테스트
// console.log(maxDifferentSongs([2, 3, 1, 4], 3)); // 3
// console.log(maxDifferentSongs([1, 2, 3, 4], 5)); // 4
// console.log(maxDifferentSongs([1, 2, 3, 4], 20)); // 4

console.log(maxDifferentSongs([2, 3, 1, 4], 3)); // 3
console.log(maxDifferentSongs([2, 3, 2, 4], 5)); // 3
console.log(maxDifferentSongs([1, 2, 3, 4], 20)); // 4
