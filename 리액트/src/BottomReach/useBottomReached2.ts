import { useEffect, useRef } from "react";
import { useIntersectionObserver } from "./useIntersectionObserver";
import { useDebounce } from "../Debounce/useDebounce";

export const useBottomReached2 = ({
  ref,
  callback,
}: {
  ref: React.RefObject<HTMLDivElement>;
  callback: (...args: unknown[]) => void;
}) => {
  const callbackRef = useRef(callback);
  const entry = useIntersectionObserver(ref, {});

  useDebounce(
    () => {
      if (entry?.isIntersecting) {
        callbackRef.current();
      }
    },
    500,
    [entry]
  );

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);
};
