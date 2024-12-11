import { RefObject, useEffect } from "react";
import { useIntersectionObserver } from "./useIntersectionObserver";

// 평범한 유즈케이스에서는 잘 작동함.
// 하지만, bottomRef 위에 아이템이 하나 더 추가되거나 할 때는 더이상 bottom이 아니므로 동작하면 안되지만 동작함.
// 이경우, 한번만 실행하도록 debounce를걸어줘야함.
// useBottomReached2 참고
export const useBottomReached = (
  ref: RefObject<HTMLDivElement>,
  callback: () => void
) => {
  const entry = useIntersectionObserver(ref, {});
  useEffect(() => {
    if (entry?.isIntersecting) {
      callback();
    }
  }, [callback, entry]);

  return { isBottomReached: entry?.isIntersecting ?? false };
};
