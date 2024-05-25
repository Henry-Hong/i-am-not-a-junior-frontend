/**
 * var : function-level scope
 * 단점 1. 중괄호 스코프 외부에서도 사용이 가능 -> 의도치 않은 결과
 * 단점 2. 키워드 생략이 가능 ->  전역 객체에 바인딩될 수 있다. (메모리릭)
 * 단점 3. 변수 중복 허용 -> 의도치 않은 결과
 * 단점 4. 호이스팅 -> 변수 '선언' 전에 참조 가능 -> 의도치 않은 결과
 * - 단, 참조만 가능하지, 초기화 되어있지는 않다.
 */

// 단점 1.
for (let i = 0; i < 10; i++) {
  var temp = 0;
  // doSomethingWithTemp;
}

temp = temp + 1;
console.log(temp);

// 단점 2.
possible = "without var keyword";
console.log(possible);

// 단점 3.
var again = "first";
var again = "again";
console.log(again);

// 단점 4.
console.log("is it okay?", okay);

var okay = "yes";
