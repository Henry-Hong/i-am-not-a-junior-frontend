import { useEffect, useLayoutEffect, useState } from "react";

/**
 * cleanup 까지 테스트해보기 위해선 react 버전 19이상이 필요함.
 */
export default function UseEffectsPage() {
  const [open, setOpen] = useState(true);

  useEffect(async () => {
    console.log("1");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("2");
  }, []);

  return <>hello</>;

  return (
    <>
      <button onClick={() => setOpen((p) => !p)}>clickme</button>
      {open ? <Test /> : null}
    </>
  );
}

function Test() {
  const [counter, setCounter] = useState(0);

  useLayoutEffect(() => {
    console.log("useLayoutEffect invked");
    return () => {
      console.log("useLayoutEffect cleanup");
    };
  }, []);

  useEffect(() => {
    console.log("useEffect invoked");
    return () => {
      console.log("useEffect cleanup");
    };
  }, []);

  useEffect(() => {
    // setCounter(counter + 1);
    return () => {
      console.log("useEffect cleanup");
    };
  }, [counter]);

  return (
    <div
      ref={(_) => {
        console.log("callbackref invoked");
        return () => {
          console.log("callbackref clenaup");
        };
      }}
    >
      <p>{counter}</p>
      <button onClick={() => setCounter(counter + 1)}>count up</button>
    </div>
  );
}

/**
 * 실행 순서
 * 1. callbackref
 * 2. useLayoutEffect
 * 3. useEffect
 *
 * 클린업 순서
 * 1. useLayoutEffect
 * 2. callbackref
 * 3. useEffect
 */
