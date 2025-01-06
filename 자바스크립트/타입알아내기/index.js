function classOf(object) {
  const string = Object.prototype.toString.call(object);
  return string.substring(8, string.length - 1);
}

console.log(classOf(new Date()));
console.log(classOf(new RegExp()));
console.log(classOf(new Promise(() => {})));
console.log(classOf(new Array()));
console.log(classOf(new String()));
console.log(classOf(new Number()));
console.log(classOf(new Boolean()));
console.log(classOf(Symbol()));
console.log(classOf(BigInt(123)));
console.log(classOf(new Error()));
console.log(classOf(new ArrayBuffer()));
console.log(classOf(new Float32Array()));
console.log(classOf(new Map()));
console.log(classOf(new Set()));
console.log(classOf(new WeakMap()));
console.log(classOf(new WeakSet()));
console.log(classOf(new Function()));
console.log(classOf(new Object()));

// Date
// RegExp
// Promise
// Array
// String
// Number
// Boolean
// Symbol
// BigInt
// Error
// ArrayBuffer
// Float32Array
// Map
// Set
// WeakMap
// WeakSet
// Function
// Object
