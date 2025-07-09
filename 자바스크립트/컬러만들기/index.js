const getRandom = (start, end) =>
  Math.floor(Math.random() * (end - start) + 1) + start;

const r = getRandom(0, 255);
const g = getRandom(0, 255);
const b = getRandom(0, 255);
// const r = 258;
// const g = 258;
// const b = 258;

const color1 =
  (((r & 0xff) << 16) | ((g & 0xff) << 8) | ((b & 0xff) << 0)) & 0xffffff;
const color2 = ((r & 0xff) << 16) | ((g & 0xff) << 8) | ((b & 0xff) << 0);
const color3 = (r << 16) | (g << 8) | (b << 0);

console.log(color1.toString(16));
console.log(color2.toString(16));
console.log(color3.toString(16));
