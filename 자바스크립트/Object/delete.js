const arr = ["a", "b", "c", "d", "e"];
console.log(Object.entries(arr));

/**
 * 예상 : [0 1 2 3 4] 중 3 이 없어지고 다시 shift 되어서 [0 1 2 3] 이 되지않을까?
 * 현실 : [ [ '0', 'a' ], [ '1', 'b' ], [ '2', 'c' ], [ '4', 'e' ] ]
 * -> Javascript에게 기대를 하지말자.
 */
delete arr["3"];
console.log(Object.entries(arr));

/**
 * 예상 : 4이긴 4이다.
 * 현실 : 5이다.
 */
console.log(arr.length);

/**
 * length가 5라서, 중간에 undefined가 나옴
 */
for (let i = 0; i < arr.length; i++) {
  console.log("for-loop", arr[i]);
}

/**
 * undefined 제외하고, 출력됨.
 */
arr.forEach((e) => console.log("foreach", e));
