import { DependencyList, useCallback, useEffect, useRef } from "react";

const useDebounce2 = (
  callback: (...args: unknown[]) => void,
  ms: number,
  deps: DependencyList
) => {
  const timeout = useRef<NodeJS.Timeout>();
  const isDebouncing = useRef<boolean>(false);

  const run = () => {
    isDebouncing.current = true;
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      callback();
      isDebouncing.current = false;
    }, ms);
  };

  const clear = () => {
    clearTimeout(timeout.current);
    timeout.current = undefined;
    isDebouncing.current = false;
  };

  useEffect(() => {
    run();
    return clear;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  const getIsDebouncing = useCallback(() => isDebouncing.current, []);

  return {
    isDebouncing: getIsDebouncing,
  };
};

export { useDebounce2 };
