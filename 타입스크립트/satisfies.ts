/**
 * satisfies
 * - 느낌으로 이해하기
 * - as의 약한버전이다.
 * - 기존 리턴타입을 제대로 추론하지 못한 타입스크립트의 문제를 해결함
 *    - 리턴타입을 제대로 추론하기 위해 타입단언(as) 타입선언(:)없이 타입 자동추론을 활용하더라도 typo를 체크하지못함
 *    - 결국엔 satisfies 를 활용해서 해결
 * - as로는 못한 missing field 찾기 -> storybook에서 적극활용중
 */

const human = {
  name: "hhr",
  age: 27,
  family: ["mom", "dad", "sister", "brother"],
};

// 1. human의 타입 선언 / 단언이 없다.
// 2. human의 타입을 추론한다.
// 3. 타입 추론 결과는 다음과 같다.
// const human: {
//   name: string;
//   age: number;
//   family: string[];
// }
// 4. 결과적으로 다음은 잘 작동한다. (객체의 프로퍼티 타입이 잘 추론되었기 떄문)
// human.family.forEach((member) => console.log(member));

// 이제 자동 추론 대신 직접 타입을 만들어보려고한다.
type Human = Record<"name" | "age" | "family", string | number | string[]>;
const human2: Human = {
  name: "lcw",
  age: 29,
  family: ["mom", "dad"],
};
// 다음은 에러가 발생한다
human2.family.forEach((member) => console.log(member));
// -> Property 'forEach' does not exist on type 'string | number | string[]'.
// ->  Property 'forEach' does not exist on type 'string'.ts(2339)
// 객체의 프로퍼티 타입이 잘못 추론되었기 때문이다.

// 그러면 자동 타입 추론을 사용해야할까?
// -> typo 를 잡아내지 못하는 문제가 있다.
// -> typo도 잡아내고, 객체 프로퍼티 타입을 잘 추론할 수있게 해주는 것이 satisfies이다.

const human3 = {
  namewrong: "lcw",
  age: 29,
  family: ["mom", "dad"],
} satisfies Human;

human3.family.forEach((member) => console.log(member));

// 완벽하다.
// 객체 프로퍼티인 family의 타입도 잘 추론되었고, namewrong이라는 오타도 잡아냈다.

// storybook 에서도 사용이 가능한데, as와 비교하여 "더욱 정확한 객체타입을 리턴하기때문에"
// as보다는 satisfies를 사용하는 것이 좋다.
// 결과적으로 as 사용할때는 args의 missing field를 잡아 내지 못했지만,
// satisfies를 사용하면 missing field를 잡아낸다.

/**
 * 
// Button.stories.tsx

import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
  title: 'Example/Button',
  component: Button,
} satisfies Meta<typeof Button>;

// https://storybook.js.org/blog/improved-type-safety-in-storybook-7/
// Auto-infer component level args
export default meta;
type Story = StoryObj<typeof meta>; // meta와 story를 연결지어줌 -> meta에서 선언한 타입을 story에서도 재활용가능.

export const Primary: Story = {
  args: {
    primary: true,
    // where is label field?
  },
};
 */
