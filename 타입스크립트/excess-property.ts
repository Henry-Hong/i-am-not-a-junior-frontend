/**
 * 잉여 속성 = 초과 프로퍼티란?
 * - 잉여속성에러는 "객체 리터럴로 선언할 때"만 발생
 * - 근데 중간 변수나 함수의 매개변수로 사용될 경우 발생하지 않음
 * - 따라서 대부분은 에러일 가능성이 있으니, 인터페이스를 수정하는 경우가 많음.
 * - 인터페이스에 사용될만큼 고정적이지 않지만, 추가될 가능성이 있다면, string index signature 를 사용할 수 있음
 */

interface Human {
  name: string;
  age: number;
}

const human1: Human = {
  name: "Mark",
  age: 39,
  height: 100, // 에러발생 O
};

const tmp = human1;
const human2: Human = tmp; // 에러발생 X
