/**
 * 사용되는 문자 : +, -, |
 * 1. 가장 큰 숫자의 자릿수를 먼저 파악하기
 * 2. 먼저 덮어씌우는거 만들기.
 */

function solution(A, K) {
  const maxLen = Math.max(...A).toString().length;

  const cols = K;
  const rows = Math.ceil(A.length / K);

  console.log({ A, K, cols, rows });

  // const header = `+${"-".repeat(maxLen)}+`;
  // const body = `|${num.toString().padStart(maxLen)}|`;
  // const footer = `+${"-".repeat(maxLen)}+`;

  const output = [];
  for (let i = 0; i < rows; i++) {
    let header = ``;
    let body = ``;
    let footer = ``;
    for (let j = 0; j < cols; j++) {
      const idx = i * K + j;
      if (idx >= A.length) break;

      header += `+${"-".repeat(maxLen)}${j === cols - 1 ? "+" : ""}`;
      body += `|${A[idx].toString().padStart(maxLen)}${
        j === cols - 1 ? "|" : ""
      }`;
      if (i === rows - 1)
        footer += `+${"-".repeat(maxLen)}${j === cols - 1 ? "+" : ""}`;
    }
    output.push(header);
    output.push(body);
    output.push(footer);
  }

  console.log(output.filter((line) => line !== "").join("\n"));
}

solution([1, 22, 333, 4444, 55555, 6, 77, 88], 5);
