/**
 * extends가 조건부 타입으로도 사용될 수 있기 때문에,
 * 삼항연산자와 함께 사용하여 Exclude를 만들어 낼 수 도 있다.
 * 장점 : intelliSense를 지원한다.
 */

type MyExclude<T, E extends T> = T extends E ? never : T;

type excluded = MyExclude<"a" | "b" | "c", "a">; // intelliSense 지원 O
type excluded2 = Exclude<"a" | "b" | "c", "a">; // intelliSense 지원 X
