/**
 * @title let, const : block-level scope
 * @description
 * 장점: var가 가지는 단점들 해결
 * 특징: var와는 다르게, 초기화까지 가지않고, 변수의 선언만 진행된다. 따라서 ReferenceError가 발생한다.
 * (변수 생성단계 : 선언 - 초기화 - 할당)
 * https://poiemaweb.com/es6-block-scope
 *
 * @tip
 * 변수 선언이란?
 * - 변수 선언은 선언의 일종이다.
 * - 선언에는 function, let, const, var, function*, class 등 다양한 선언이 존재한다.
 * - 이 모든 선언은 '호이스팅'된다.
 *
 * 호이스팅이란?
 * - JSParser가 담당함. 우선순위도 있음.
 * - 변수선언 (var, let, const)가, 함수선언(function) 보다 위에있음.
 * - 아무튼, JSParser가 호이스팅을 하면서, 환경레코드에 값을 바인드해둠.
 *
 * TDZ란?
 * - var, function, import : TDZ 없음
 * - let, const, class : TDZ 있음.
 *
 * 환경레코드란?
 * - 렉시컬 환경 = 환경레코드 + 아우터 렉시컬 환경
 * - 환경레코드 = 해당 스코프내에서 식별자(key)와 값(value)을 저장해두는 객체
 * - 아우터 렉시컬 환경 = 환경레코드에서 식별자를 찾지 못하면, 참조하게되는 포인터 to 렉시컬환경
 */

console.log(foo); // undefined
console.log(typeof foo); // "undefined"
var foo = 1;

console.log(bar); // ReferenceError: Cannot access 'bar' before initialization
let bar;
