/**
 * object는 string을 좋아한다.
 * 1. Array의 index도 string으로 처리한다.
 * 2. key로 undefined, null도 가능하며, string으로 처리한다.
 */

// 1.
const arr = new Array(["a", "b", "c"]);
console.log(arr[0] === arr["0"]);

// 2. undefined
const obj = {
  undefined: "hello world",
};
console.log(obj.undefined); // hello world

const obj2 = {
  [undefined]: "hello world2",
};
console.log(obj2.undefined); // hello world2

let key = undefined;
const obj3 = {
  [key]: "hello world3",
};
console.log(obj3.undefined); // hello world3

// 2. null
const obj4 = {
  null: "possible?",
};
console.log(obj4.null);

const obj5 = {
  [null]: "possible2?",
};
console.log(obj5.null);

let key2 = null;
const obj6 = {
  [key2]: "possible3?",
};
console.log(obj6.null);
