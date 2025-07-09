const array = [
  ...(function* () {
    if (Math.random() > 0.5) {
      yield 1;
    }
    yield 2;
    yield 3;
  })(),
];

console.log({ array });
