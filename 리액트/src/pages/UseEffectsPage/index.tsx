import { useEffect, useLayoutEffect, useState } from "react";

/**
 * cleanup 까지 테스트해보기 위해선 react 버전 19이상이 필요함.
 */
export default function UseEffectsPage() {
  const [open, setOpen] = useState(true);

  return (
    <>
      <button onClick={() => setOpen((p) => !p)}>clickme</button>
      {open ? <Test /> : null}
    </>
  );
}

function Test() {
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

  return (
    <div
      ref={(_) => {
        console.log("callbackref invoked");
        return () => {
          console.log("callbackref clenaup");
        };
      }}
    >
      asd
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
