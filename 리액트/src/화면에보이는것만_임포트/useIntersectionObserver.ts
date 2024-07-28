import { RefObject, useEffect, useState } from "react";

type TypeParams = {
  root?: Element | Document | null;
  rootMargin?: string;
  threshold?: number | number[];
};

export const useIntersectionObserver = (
  ref: RefObject<Element>,
  { root = null, rootMargin = "0%", threshold = 0 }: TypeParams
) => {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>();

  const callback = ([entry]: IntersectionObserverEntry[]) => setEntry(entry);

  const options: IntersectionObserverInit = {
    root,
    rootMargin,
    threshold,
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callback, options);
    if (!ref || !ref.current) return;
    observer.observe(ref.current);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);

  return entry;
};
