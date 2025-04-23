import { useState } from "react";

export default function CountUpPage() {
  const [count, setCount] = useState(0);
  const [max, setMax] = useState(100);
  const [duration, setDuration] = useState(3000); // 전체 동작 시간 (ms)

  const handleClick = () => {
    setCount(0); // 카운트 초기화

    for (let i = 1; i <= max; i++) {
      const progress = i / max;
      const timing = Math.pow(progress, 3) * duration;

      setTimeout(() => {
        setCount((prev) => prev + 1);
      }, timing);
    }
    requestAnimationFrame((time) => {
      console.log(time);
    });
  };

  return (
    <div>
      <input
        className="border-2 border-gray-300 rounded-md p-2"
        type="number"
        value={duration}
        onChange={(e) => setDuration(Number(e.target.value))}
      />
      <button onClick={handleClick}>click</button>
      <p>{count}</p>
    </div>
  );
}
