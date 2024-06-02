/**
 * Union 타입을 이용하면 다음 2가지 활용케이스가 있다.
 * 1. mappedType 👍
 * 2. conditional type
 */

/** 1. mappedType */
type fruits = "apple" | "banana" | "cherry";
type fruitStatus = { [fruit in fruits]: boolean };
// type fruitStatus = {
//   apple: boolean;
//   banana: boolean;
//   cherry: boolean;
// }

/**
 * 배열에서 mappedType만들기
 * 방법 : 배열 -> Union 추출 -> mappedType using index type
 * point1. as const로 상수취급 -> 배열에서 튜플타입 생성
 * point2. 튜플타입에서 typeof와 index타입 활용
 */
const elements = ["a", "button", "div", "form", "h1", "h2"] as const; // tuple타입 생성
type TypeUnion = (typeof elements)[number]; // union 타입 추출
type TypeMapped = { [T in TypeUnion]: boolean }; // mappedType 추출
// type TypeMapped = {
//   a: boolean;
//   button: boolean;
//   div: boolean;
//   form: boolean;
//   h1: boolean;
//   h2: boolean;
// }

/** 2. conditional type */
type availableOptions = "option1" | "option2" | "opton3" | "option4";
type conditionalType<T> = T extends availableOptions ? true : false;

type sample1 = conditionalType<"option1">;
type sample2 = conditionalType<"option1000">;
