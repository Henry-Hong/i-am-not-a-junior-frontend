const arraySize = 10000; // 배열 크기 설정
const array2D = Array.from({ length: arraySize }, () =>
  Array.from({ length: arraySize }, () => Math.random())
);

function measureExecutionTime(label, func) {
  const start = performance.now();
  func();
  const end = performance.now();
  console.log(`${label}: ${(end - start).toFixed(4)} ms`);
}

measureExecutionTime("For Loop", () => {
  for (let i = 0; i < array2D.length; i++) {
    for (let j = 0; j < array2D[i].length; j++) {
      const temp = array2D[i][j]; // For Loop: 33.4003 ms
    }
  }
});

measureExecutionTime("For Loop2", () => {
  for (let i = 0; i < array2D.length; i++) {
    for (let j = 0; j < array2D[i].length; j++) {
      const temp = array2D[j][i]; // For Loop2: 99.8005 ms
    }
  }
});
