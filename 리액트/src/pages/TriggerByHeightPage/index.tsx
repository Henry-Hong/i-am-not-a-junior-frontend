import { useCallback, useLayoutEffect, useRef, useState } from "react";

export default function TriggerByHeightPage() {
  const { ref, isPassed } = useElementPassed();

  return (
    <div className=" bg-red-200 relative">
      <div className="fixed top-0 right-0 h-10 bg-red-100 border-2 border-black">
        {isPassed ? "Passed" : "Not Passed"}
      </div>
      <div className="h-32 bg-blue-100 border-2 border-black">1</div>
      <div className="h-32 bg-blue-100 border-2 border-black">2</div>
      <div className="h-32 bg-blue-100 border-2 border-black">3</div>
      <div className="h-32 bg-blue-100 border-2 border-black">4</div>
      <div className="h-32 bg-blue-100 border-2 border-black">5</div>
      <div className="h-32 bg-blue-100 border-2 border-black">6</div>
      <div className="h-32 bg-blue-100 border-2 border-black">7</div>
      <div className="h-32 bg-blue-100 border-2 border-black">8</div>
      <div className="h-32 bg-blue-100 border-2 border-black">9</div>
      <div className="h-32 bg-blue-100 border-2 border-black">10</div>
      <div className="h-32 bg-blue-100 border-2 border-black">11</div>
      <div ref={ref} className="h-32 bg-blue-100 border-2 border-black">
        12
      </div>
      <div className="h-32 bg-blue-100 border-2 border-black">13</div>
      <div className="h-32 bg-blue-100 border-2 border-black">14</div>
      <div className="h-32 bg-blue-100 border-2 border-black">15</div>
      <div className="h-32 bg-blue-100 border-2 border-black">16</div>
      <div className="h-32 bg-blue-100 border-2 border-black">17</div>
      <div className="h-32 bg-blue-100 border-2 border-black">18</div>
      <div className="h-32 bg-blue-100 border-2 border-black">19</div>
      <div className="h-32 bg-blue-100 border-2 border-black">20</div>
    </div>
  );
}

const useElementPassed = () => {
  const ref = useRef<HTMLDivElement>(null);

  const [isPassed, setIsPassed] = useState(false);

  const handleScroll = useCallback(() => {
    if (!ref.current) return;
    const windowScrollY = window.scrollY;
    const innerHeight = window.innerHeight;
    const elementOffsetTop = ref.current.offsetTop;

    if (windowScrollY + innerHeight > elementOffsetTop) {
      setIsPassed(true);
    } else {
      setIsPassed(false);
    }
  }, []);

  useLayoutEffect(() => {
    window.document.addEventListener("scroll", handleScroll);
    return () => window.document.removeEventListener("scroll", handleScroll);
  }, []);

  return { ref, isPassed };
};
