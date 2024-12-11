import { DependencyList, useEffect, useRef, useState } from "react";

/**
 * useDebounce : isDebouncing 값을 state로 관리. run이 한번만 실행되어도 true로 바뀜.
 * useDebounce2 : isDebouncing 값을 ref로 관리. run이 한번만 실행되면 true로 바뀌지 않음.
 * - 개인적으로 debounce1 함수가 더 make sense 한 것 같음
 * - 하지만 react-use 에선, debounce2 함수를 사용중임
 */
const useDebounce = (
  callback: (...args: unknown[]) => void,
  ms: number,
  deps: DependencyList
) => {
  const timeout = useRef<NodeJS.Timeout>();
  const [isDebouncing, setIsDebouncing] = useState(false);

  const run = () => {
    setIsDebouncing(true);
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      callback();
      setIsDebouncing(false);
    }, ms);
  };

  const clear = () => {
    clearTimeout(timeout.current);
    timeout.current = undefined;
    setIsDebouncing(false);
  };

  useEffect(() => {
    run();
    return clear;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return {
    isDebouncing,
  };
};

export { useDebounce };
