import { useRef } from "react";
import { useIntersectionObserver } from "./useIntersectionObserver";

/**
 * disconnect : observe 모두 해제
 * unobserve : 특정 대상의 observe 해제
 * isVisible, isIntersection의 차이?
 */
export default function 화면에보이는것만_임포트() {
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const ref3 = useRef<HTMLDivElement>(null);
  const ref4 = useRef<HTMLDivElement>(null);

  const entry1 = useIntersectionObserver(ref1, {});
  const entry2 = useIntersectionObserver(ref2, {});
  const entry3 = useIntersectionObserver(ref3, {});
  const entry4 = useIntersectionObserver(ref4, {});

  console.log("console.log(entry1?.isIntersecting)", entry1?.isIntersecting);
  console.log("console.log(entry2?.isIntersecting)", entry2?.isIntersecting);
  console.log("console.log(entry3?.isIntersecting)", entry3?.isIntersecting);
  console.log("console.log(entry4?.isIntersecting)", entry4?.isIntersecting);

  return (
    <>
      <div
        id="div1"
        ref={ref1}
        style={{
          backgroundColor: "#abdee6",
          width: "100%",
          height: "100dvh",
        }}
      >
        1!
      </div>
      <div
        id="div2"
        ref={ref2}
        style={{
          backgroundColor: "#cbaacb",
          width: "100%",
          height: "100dvh",
        }}
      >
        2!
      </div>
      <div
        id="div3"
        ref={ref3}
        style={{
          backgroundColor: "#ffffb5",
          width: "100%",
          height: "100dvh",
        }}
      >
        3!
      </div>
      <div
        id="div4"
        ref={ref4}
        style={{
          backgroundColor: "#ffccb6",
          width: "100%",
          height: "100dvh",
        }}
      >
        4!
      </div>
    </>
  );
}
