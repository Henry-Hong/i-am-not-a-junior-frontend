import { RefObject, useEffect, useMemo, useState } from "react";

export const useIntersectionObserver = (
  ref: RefObject<Element>,
  { root = null, rootMargin = "0%", threshold = 0 }: IntersectionObserverInit
) => {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>();

  const callback = ([entry]: IntersectionObserverEntry[]) => setEntry(entry);

  const options: IntersectionObserverInit = useMemo(
    () => ({
      root,
      rootMargin,
      threshold,
    }),
    [root, rootMargin, threshold]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(callback, options);
    if (!ref || !ref.current) return;
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options, ref]);

  return entry;
};
