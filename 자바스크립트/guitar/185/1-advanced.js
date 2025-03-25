function solution(A, K) {
  const maxLen = Math.max(...A).toString().length;
  const rows = Math.ceil(A.length / K);
  const output = [];

  // 테이블 생성 시작
  output.push(createBorder(A, K, maxLen, 0));

  for (let i = 0; i < rows; i++) {
    const startIdx = i * K;
    const actualCols = Math.min(K, A.length - startIdx);

    // 데이터 행 추가
    output.push(createDataRow(A, startIdx, actualCols, maxLen));

    // 테두리 행 추가
    output.push(createBorder(A, K, maxLen, startIdx));
  }

  console.log(output.join("\n"));
}

function createBorder(A, K, maxLen, startIdx) {
  const actualCols = Math.min(K, A.length - startIdx);
  let border = "";

  for (let j = 0; j < actualCols; j++) {
    border += `+${"-".repeat(maxLen)}`;
  }
  border += "+";

  return border;
}

function createDataRow(A, startIdx, actualCols, maxLen) {
  let row = "";

  for (let j = 0; j < actualCols; j++) {
    const idx = startIdx + j;
    row += `|${A[idx].toString().padStart(maxLen)}`;
  }
  row += "|";

  return row;
}

solution([1, 22, 333, 4444, 55555, 6, 77, 88], 1);
