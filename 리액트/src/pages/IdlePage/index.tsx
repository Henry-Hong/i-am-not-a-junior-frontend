/**
 * 1. micro task queue : queueMicroTask, Promise.resolve
 * 2. animation frame queue : requestAnimationFrame (대부분 macro task queue 보다 먼저라고 함)
 * 3. macro task queue : setTimeout, setInterval
 * 4. idle queue : requestIdleCallback
 */
import { useState } from "react";

export default function IdlePage() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    queueMicrotask(() => console.log("queueMicrotask"));

    Promise.resolve().then(() => console.log("promise resolve"));

    requestAnimationFrame(() => {
      console.log("requestAnimationFrame");
    });

    setTimeout(() => {
      console.log("setTimeout");
    }, 0);

    // https://developer.mozilla.org/ko/docs/Web/API/Background_Tasks_API#example
    requestIdleCallback((deadline) => {
      console.log(
        "requestIdleCallback",
        deadline.timeRemaining(),
        deadline.didTimeout
      );
    });

    for (let i = 0; i < 1000000; i++) {
      setCount((prev) => prev + 1);
    }
  };

  return (
    <>
      <div>{count}</div>
      <button onClick={handleClick}>countup</button>
    </>
  );
}
