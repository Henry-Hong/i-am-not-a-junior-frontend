/**
 * 함수선언식, 함수표현식
 */

// O. Hello2는 함수 선언식 단독으로 사용되었음. 호이스팅 되어 사용가능.
console.log(Hello2);
function Hello2() {
  console.log("Hi");
}

console.log(Hello); // 1) X. ReferenceError. Hello는 할당되기 전까지 존재자체도 모름.

// 2) const로 선언된 hello가 할당되며, Hello의 존재를 알게됨. 그렇다고 3번이 되지는 않음.
const hello = function Hello() {
  console.log("hi");
};

console.log(Hello); // 3) X. ReferenceError. Hello는 함수 표현식의 name 속성으로 사용하게됨.
