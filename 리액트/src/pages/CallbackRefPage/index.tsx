import { RefCallback, useCallback, useEffect, useRef, useState } from "react";

export default function CallbackRef() {
  const h1Ref = useRef<HTMLHeadingElement>(null);

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  // useEffect 단점.
  // useEffect는 Dev 모드에서 두번 실행될 여지가 있다.
  useEffect(() => {
    console.log("ref in useEffect");
    if (!h1Ref.current) return;
    const { width: w, height: h } = h1Ref.current.getBoundingClientRect();
    setWidth(w);
    setHeight(h);
  }, []);

  // ref가 걸린 DOM Node가 조건부로 렌더링 될 경우애도, 쉽게 처리가능하다.
  const callbackRef: RefCallback<HTMLHeadingElement> = useCallback((node) => {
    console.log("ref in ref callback");
    if (!node) return;
    const { width: w, height: h } = node.getBoundingClientRect();
    setWidth(w);
    setHeight(h);
  }, []);

  return (
    <div className="flex p-4 bg-blue-300">
      <h1 ref={h1Ref}>안녕하세요. 제 사이즈가 어느정도일까요?</h1>
      <h1 ref={callbackRef}>안녕하세요. 제 사이즈가 어느정도일까요?</h1>
      <p>
        width : {width}, height: {height}
      </p>
    </div>
  );
}

// 비고, 아래 Ref의 차이들을 알고있는가?
// React.RefObject, React.MutableRefObject, React.RefCallback, React.Ref, React.ForwardedRef, and React.LegacyRef
