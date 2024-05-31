/**
 * 다음 main 함수를 실행했을때, log의 순서는?
 * 6 7 1 3 5 4 2
 */

function main() {
  async function foo() {
    console.log(1);
    await ooh();
    console.log(2);
  }

  async function ooh() {
    console.log(3);
    return new Promise((res) =>
      setTimeout(() => {
        console.log(4);
        res();
      }, 10)
    );
  }

  function bar() {
    console.log(5);
  }

  console.log("6");

  setTimeout(foo, 0);
  setTimeout(bar, 0);

  console.log("7");
}

main();

async function foo() {
  console.log(1);
  console.log(3);
  await new Promise((res) =>
    setTimeout(() => {
      console.log(4);
      res();
    }, 10)
  );
  console.log(2);
}

async function foo2() {
  console.log(1);
  console.log(3);
  await new Promise((res) =>
    setTimeout(() => {
      console.log(4);
      res();
    }, 10)
  );
  console.log(2);
}

function foo2() {
  return new Promise((resolve) => {
    console.log(1);
    console.log(3);
    resolve();
  }).then(() => {
    new Promise((res) =>
      setTimeout(() => {
        console.log(4);
        res();
      }, 10)
    ).then(() => {
      console.log(2);
    });
  });
}

foo2();

function foo2() {
  console.log(1);
  console.log(3);
  new Promise((res) =>
    setTimeout(() => {
      console.log(4);
      res();
    }, 10)
  ).then(() => {
    console.log(2);
  });
}

foo2();
