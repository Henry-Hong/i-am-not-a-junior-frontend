// 일반 Array
const normalArray = Array(1000).fill(0);

// TypedArray
const typedArray = new Int32Array(1000);

console.time("Normal Array");
for (let i = 0; i < normalArray.length; i++) {
  normalArray[i] += 1;
}
console.timeEnd("Normal Array"); // Normal Array: 0.075ms

console.time("Typed Array");
for (let i = 0; i < typedArray.length; i++) {
  typedArray[i] += 1;
}
console.timeEnd("Typed Array"); // Typed Array: 0.036ms
