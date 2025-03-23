/**
 * {@link ITest.world hello world}
 * {@link funcTest}
 */
export function foo() {}

/**
 * {@link foo}
 */
export function bar() {}

/**
 * {@link import('../middleware.ts')}
 */
export function fizz() {}

/**
 * {@link https://www.naver.com}
 */
export function buzz() {}

interface ITest {
  readonly hello: string;
  readonly world: number;
}

function funcTest() {
  function inner() {}
}
