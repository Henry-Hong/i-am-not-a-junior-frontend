import { useEffect, useRef } from "react";
import { throttle } from "lodash-es";

export default function ScrollPage() {
  const prevScrollSection = useRef(0);

  const handleScroll = () => {
    const docHeight = Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    );
    const windowHeight = window.innerHeight;
    const scrollTop = window.scrollY;
    const trackableHeight = docHeight - windowHeight;
    const scrollPercentage = Math.ceil((scrollTop / trackableHeight) * 100);

    const scrollSection = Math.floor(scrollPercentage / 25);
    if (prevScrollSection.current !== scrollSection) {
      console.log(
        `바뀜 : from ${prevScrollSection.current} to ${scrollSection}`
      );
      prevScrollSection.current = scrollSection;
    }
  };

  const throttledHandleScroll = throttle(handleScroll, 100);

  useEffect(() => {
    window.addEventListener("scroll", throttledHandleScroll);

    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, []);

  return (
    <div className="w-[120vw] bg-red-200 relative overflow-x-scroll">
      {Array.from({ length: 100 }).map((_, index) => (
        <div key={index} className="h-10 bg-blue-200">
          {index + 1}
        </div>
      ))}
    </div>
  );
}
