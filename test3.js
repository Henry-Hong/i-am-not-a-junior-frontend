function makeBinary(n) {
  let binary = "";

  while (true) {
    if (n === 0) break;
    const m = Math.floor(n / 2);
    const r = n % 2;
    binary = r.toString() + binary;
    n = m;
  }

  return binary;
}

// 100000100001

function findGaps(binary) {
  let curLen = 0;
  let maxLen = 0;
  const strLen = binary.length;

  for (let i = 0; i < strLen; i++) {
    const ch = binary.charAt(i);
    if (ch === "1") {
      maxLen = Math.max(maxLen, curLen);
      curLen = 0;
    } else {
      curLen += 1;
    }
  }

  return maxLen;
}

function solution(N) {
  const binaries = makeBinary(N);
  console.log(binaries);
  const answer = findGaps(binaries);
  return answer;
}

console.log(solution(66561));
