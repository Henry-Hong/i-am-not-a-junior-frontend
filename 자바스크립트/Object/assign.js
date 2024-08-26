const obj1 = {
  a: 1,
};

const obj2 = {
  b: 2,
};

const obj3 = {
  c: 3,
};

const combinedObj = Object.assign({}, obj1, obj2, obj3);

console.log(combinedObj); // { a: 1, b: 2, c: 3 }

console.log(obj1 === obj1); // true
console.log(obj1 == obj1); // true

const copiedObj1 = obj1; // copy reference

console.log(copiedObj1 == obj1); // true
console.log(copiedObj1 === obj1); // true
