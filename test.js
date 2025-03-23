const assert = require("assert");
const c = (x, m) => `\x1B[${x}m${m}\x1B[0m`;
process.once("beforeExit", (code) => code || console.log(c("37,42", "통과!")));
process.on("uncaughtException", (e) => {
  if (!(e instanceof assert.AssertionError)) throw e;
  const line = e.stack
    .split("\n")
    .map((v) => v.match(/\bat .+ \((?!node:internal).+\)$/)?.[0])
    .filter((v) => v);
  console.error(
    c("37,41", `다음 조건에서 실패: ${e.message}\n${line.map((v) => `  ${v}`)}`)
  );
  process.exit(1);
});

let callCount = 0;

function getSleepAnimal(animal) {
  return `${animal}이(가) 잠들었다.`;
}

async function sleep(ms = 500) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function sleepAnimal({ animal, sleepTime }) {
  return sleep(sleepTime).then(() => getSleepAnimal(animal));
}

// 이 함수의 구현만 수정하세요.
function createOnceCaller(callback) {
  let prev = null;
  return (...args) => {
    if (prev) return prev;
    const promiseRtn = callback(...args).then((rtn) => {
      callCount += 1; // 여기서 하면, 이미 설정된 promiseRtn 을 갖게됨. prev = null 되기 전까지.
      prev = null;
      return rtn;
    });
    prev = promiseRtn;
    return promiseRtn;
  };
}

(async () => {
  const onceCallSleepAnimal = createOnceCaller(sleepAnimal);

  const response_1 = onceCallSleepAnimal({ animal: "강아지", sleepTime: 500 });
  const response_2 = onceCallSleepAnimal({ animal: "고양이", sleepTime: 300 });

  await sleep(500);

  const response_3 = onceCallSleepAnimal({ animal: "토끼", sleepTime: 200 });

  await sleep(100);

  const response_4 = onceCallSleepAnimal({ animal: "코끼리", sleepTime: 200 });
  const response_5 = onceCallSleepAnimal({ animal: "당나귀", sleepTime: 500 });

  await sleep(500);

  const response_6 = onceCallSleepAnimal({ animal: "기린", sleepTime: 1000 });

  assert.deepEqual(
    await Promise.all([
      response_1,
      response_2,
      response_3,
      response_4,
      response_5,
      response_6,
    ]),
    [
      getSleepAnimal("강아지"),
      getSleepAnimal("강아지"),
      getSleepAnimal("토끼"),
      getSleepAnimal("토끼"),
      getSleepAnimal("토끼"),
      getSleepAnimal("기린"),
    ]
  );

  assert.equal(callCount, 3);

  console.log("success");
})();
