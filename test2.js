function solution(chocolate, n) {
  const grid = buildGridInfo(chocolate);
  if (n > grid.totalCells) return [0, 0];

  const pieces = enumeratePieces(grid, n);
  console.log(pieces.length, pieces);

  const { minB, maxB } = computeBestForB(pieces, grid.totalCells);

  if (!Number.isFinite(minB)) {
    // A가 유효하게 선택할 수 있는 조각이 없음
    return [0, 0];
  }
  return [minB, maxB];
}

/* ================================
 * 1. Grid 전처리
 * ================================ */

function buildGridInfo(chocolate) {
  const H = chocolate.length;
  const W = chocolate[0].length;
  const totalCells = H * W;

  const values = [];
  for (let r = 0; r < H; r++) {
    for (let c = 0; c < W; c++) {
      values.push(chocolate[r][c]);
    }
  }

  const idx = (r, c) => r * W + c;

  const neighbors = Array.from({ length: totalCells }, () => []);
  for (let r = 0; r < H; r++) {
    for (let c = 0; c < W; c++) {
      const i = idx(r, c);
      const dirs = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ];
      for (const [dr, dc] of dirs) {
        const nr = r + dr;
        const nc = c + dc;
        if (nr >= 0 && nr < H && nc >= 0 && nc < W) {
          neighbors[i].push(idx(nr, nc));
        }
      }
    }
  }

  return { H, W, totalCells, values, neighbors };
}

/* ================================
 * 2. 모든 크기 n 연결 조각 생성
 * ================================ */

function enumeratePieces(grid, n) {
  const { totalCells, values, neighbors } = grid;
  const pieces = [];
  const seen = new Set(); // 중복 조각 방지 (정렬된 셀 리스트 문자열로 관리)

  function makeKey(cells) {
    // 정렬된 인덱스 문자열을 키로 사용
    const sorted = [...cells].sort((a, b) => a - b);
    return sorted.join(",");
  }

  function dfs(cells, sum, boundary, size) {
    if (size === n) {
      const key = makeKey(cells);
      if (!seen.has(key)) {
        seen.add(key);
        pieces.push({ cells: [...cells], sum });
      }
      return;
    }

    const boundaryArr = Array.from(boundary);
    for (const v of boundaryArr) {
      if (cells.includes(v)) continue; // 이미 포함된 칸이면 스킵

      const newCells = [...cells, v];
      const newSum = sum + values[v];

      const newBoundary = new Set(boundary);
      newBoundary.delete(v);
      for (const nb of neighbors[v]) {
        if (!newCells.includes(nb)) {
          newBoundary.add(nb);
        }
      }

      dfs(newCells, newSum, newBoundary, size + 1);
    }
  }

  // 각 칸을 시작점으로 DFS
  for (let s = 0; s < totalCells; s++) {
    const cells = [s];
    const sum = values[s];

    const boundary = new Set();
    for (const nb of neighbors[s]) {
      boundary.add(nb);
    }

    dfs(cells, sum, boundary, 1);
  }

  return pieces;
}

/* ================================
 * 3. B의 최적 선택 계산
 * ================================ */

function computeBestForB(pieces /*, totalCells */) {
  const K = pieces.length;
  if (K === 0) return { minB: Infinity, maxB: -Infinity };

  const bestB = Array(K).fill(-Infinity);

  for (let i = 0; i < K; i++) {
    const cellsA = pieces[i].cells;
    const setA = new Set(cellsA);

    for (let j = 0; j < K; j++) {
      const cellsB = pieces[j].cells;
      if (!isOverlap(setA, cellsB)) {
        if (pieces[j].sum > bestB[i]) {
          bestB[i] = pieces[j].sum;
        }
      }
    }
  }

  let minB = Infinity;
  let maxB = -Infinity;

  for (let i = 0; i < K; i++) {
    if (!Number.isFinite(bestB[i])) continue; // A가 선택 불가
    if (bestB[i] < minB) minB = bestB[i];
    if (bestB[i] > maxB) maxB = bestB[i];
  }

  return { minB, maxB };
}

function isOverlap(setA, cellsB) {
  for (const c of cellsB) {
    if (setA.has(c)) return true;
  }
  return false;
}

console.log(
  solution(
    [
      [2, 10, 7],
      [1, 10, 10],
      [6, 10, 1],
    ],
    4
  )
); // [18, 37]

console.log(
  solution(
    [
      [1, 1, 1, 0, 1],
      [0, 0, 0, 0, 1],
      [1, 0, 2, 1, 1],
      [0, 0, 2, 0, 0],
    ],
    5
  )
); // [3, 7]

console.log(
  solution(
    [
      [1, 0, 2, 2, 2],
      [9, 9, 0, 9, 9],
      [1, 1, 1, 0, 2],
    ],
    6
  )
); // [13, 31]

console.log(
  solution(
    [
      [0, 0, 3, 0, 0, 0, 0, 0],
      [3, 3, 3, 0, 0, 0, 2, 0],
      [3, 3, 0, 0, 2, 2, 2, 2],
      [0, 0, 0, 0, 2, 0, 0, 0],
    ],
    6
  )
); // [10, 18]
