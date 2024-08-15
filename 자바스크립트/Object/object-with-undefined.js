/**
 * undefined as value
 * undefined를 object의 value로 사용할 수 있다.
 */
const obj1 = { a: 1, b: 2, c: undefined };
const obj2 = { a: 1, b: 2 };

console.log(Object.entries(obj1).length); // 3
console.log(Object.entries(obj2).length); // 2

console.log("c" in obj1); // true
console.log("c" in obj2); // false

/**
 * undefined as key
 * undefined를 object의 key로 사용할 수 있다.
 */
const key = undefined;
const obj3 = { undefined: 1 };
const obj4 = { [undefined]: 2 };
const obj5 = { [key]: 3 };

console.log(undefined in obj3); // true
console.log(undefined in obj4); // true
console.log(undefined in obj5); // true

console.log("undefined" in obj3); // true
console.log("undefined" in obj4); // true
console.log("undefined" in obj5); // true
