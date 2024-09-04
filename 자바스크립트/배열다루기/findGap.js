const formatDate = (value) => {
  const pad = (n, p) => n.toString().padStart(p, "0");
  const hour = pad(Math.floor(value / 3600), 2);
  const min = pad(Math.floor((value % 3600) / 60), 2);
  const sec = pad(Math.floor(value % 60), 2);
  return `${hour}:${min}:${sec}`;
};

const linspace = (min, max, length) => {
  if (length < 2) throw Error("length should be larger or equal than 2");
  let step = (max - min) / (length - 1);

  return Array(length)
    .fill(0)
    .map((_, i) => i * step);
};

const gaps = [
  10, 15, 20, 30, 35, 40, 45, 50, 60, 75, 90, 105, 120, 150, 180, 210, 240, 270,
  300, 330, 360, 390, 420, 450, 480, 510, 540, 570, 600, 660, 720, 780, 840,
  900, 960,
];

/**
 * 1. 최대시간을 알아낸다
 * 2. 최대시간을 4등분하여, 그 갭을 알아낸다.
 * 3. 예쁜 후보갭들 중에서, 가장 가까운 갭을 찾는다.
 * 4. 해당 갭을 적용한다.
 *
 * Q. 예쁜 후보갭에는 어떤게 있을까?
 * - Good : 1분 30초 -> 3분 00초 -> 4분 30초
 * - Bad : 47초 -> 1분 34초 -> 2분 21초
 * - Good : 5분 -> 10분 -> 15분
 * - Bad : 7분 -> 14분 -> 21분 (이 기준이 애매)
 * - 1, 2, 3, 4, 5, 6, 7, 8, 9, 10분
 */

// 2분 미만을 제외하고는, 그래프가 정상적으로 그려짐.
// 정상의 기준 = 가로줄 사이의 간격이 원래 위치에서 threshold값 이상 벗어나지 않아야함.

const findNearest = (arr, val) => {
  arr.sort((a, b) => a - b);

  let len = arr.length;

  for (let i = 1; i < len; i++) {
    let offset = Math.abs(arr[i] - val);
    let prevOffset = Math.abs(arr[i - 1] - val);
    if (offset >= prevOffset) return arr[i - 1];
  }

  return arr[len - 1];
};

// for (let i = 60; i <= 360; i += 60) {
//   const nearest = findNearest(gaps, i);
//   const offset = Math.abs(i * 4 - nearest * 4);
//   const offsetRatio = (offset / nearest).toFixed(4);
//   console.log(
//     i,
//     nearest,
//     `${Math.floor((i * 4) / 60)}분${(i * 4) % 60}초`,
//     offsetRatio
//   );
//   const threshold = 0.5;
//   if (offsetRatio > threshold) {
//     console.log("   ", i, nearest);
//   }
// }

for (let gap of gaps) {
  linspace(0, gap * 4, 5).forEach((e) => console.log(formatDate(e)));
  console.log("--------");
}
