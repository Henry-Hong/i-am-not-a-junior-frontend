/**
 * 1번 - async / await이 포함된 초기형태
 */
(async () => {
  console.log("async function start");
  for (let i = 1; i < 3; i++) {
    await null;
    console.log("async function resume", i);
  }
  await null;
  console.log("async function end");
})();

/**
 * 2번 - for문 풀어헤치기
 */
(async () => {
  console.log("async function start");
  await null;
  console.log("async function resume", 1);
  await null;
  console.log("async function resume", 2);
  await null;
  console.log("async function resume", 3);
  await null;
  console.log("async function end");
})();

/**
 * 3번 - Promise로 바꾸기.
 * 중요한점은, await일 때 마다 한 틱을 소모한다는 것이다.
 */
(() => {
  return (
    new Promise((resolve) => {
      console.log("async function start");
      resolve(null);
    })
      // then의 콜백인 A: () => {console.log("async function resume", 1)} 이 먼저 micro task queue에 들어간다.
      // 콜스택이 비어있을 때, 이벤트루프가 micro task queue에서 A를 꺼내와 콜스택에 넣는다.
      // 콜스택이 실행된다. 1을 출력한다. 이때, return null; 이지만, then의 콜백은 자연스럽게 Promise를 리턴한다.
      // return null === return Promise.resolve(null).then(뒷부분) 이 실행되고, 뒷부분이 micro task queue에 들어간다.
      .then(
        /*콜백 A*/ () => {
          console.log("async function resume", 1);
          return null;
        }
      )
      .then(() => {
        console.log("async function resume", 2);
        return null;
      })
      .then(() => {
        console.log("async function resume", 3);
        return null;
      })
      .then(() => {
        console.log("async function end");
      })
  );
})();
