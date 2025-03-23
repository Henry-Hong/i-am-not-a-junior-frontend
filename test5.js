async function foo() {
  throw Error("error");
}

async function run() {
  console.log("start");
  try {
    foo();
  } catch (error) {
    console.log("error");
  }
  console.log("end");
}

run();

/**
 * 1. 모노포와 폴리레포의 차이점, 장단점 등
 * 2. 배포가 잦은 환경에서 사용자가 이전 청크를 보고있어서 not found 뜨는경우
 * 3.
 */
