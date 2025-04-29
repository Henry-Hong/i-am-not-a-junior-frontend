"use strict";
/**
 * extends 를 이용하면, 조건부 타입이 가능하기 때문에,
 * 유틸리티타입인 Extract을 구현할 수 있다.
 * 장점 : intelliSense를 지원한다.
 *
 * 아래 MyExtract는 extends가 2가지 형태로 쓰인것을 알 수 있다.
 * 파라미터 : [인터페이스 확장] P extends T -> P 가 T 를 확장한다. 즉, P는 T의 구체화된 버전이다.
 * 표현식 : [조건부 타입] P extends T ? T : never -> P 가 T의 구체화된 버젼이면 T, 그렇지 않으면 never
 * never는 Union 타입에서 삭제된다. ("a" | "b" | never === "a" | "b")
 */
Object.defineProperty(exports, "__esModule", { value: true });
