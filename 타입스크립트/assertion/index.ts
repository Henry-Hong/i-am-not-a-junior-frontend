function assert(
  condition: unknown,
  error: Error | string = new Error()
): asserts condition {
  if (!condition) {
    if (typeof error === "string") {
      throw new Error(error);
    } else {
      throw error;
    }
  }
}

// export function assert(condition: unknown, error: Error | string = new Error()): asserts condition {
//   if (!condition) {
//     if (typeof error === 'string') {
//       throw new Error(error);
//     } else {
//       throw error;
//     }
//   }
// }

type Foo = {
  bar?: string;
};

(() => {
  const foo: Foo = { bar: "hello" };
  assert(foo.bar, "hello");
  const _bar = foo.bar;
})();
