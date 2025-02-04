import { useState } from "react";

export default function CounterPage() {
  const [counter, setCounter] = useState(0);

  return (
    <div>
      <p>CounterPage</p>
      <input disabled value={counter} />
      <button onClick={() => setCounter((prev) => prev + 1)}>plus</button>
      <button onClick={() => setCounter((prev) => prev - 1)}>minus</button>
      <button onClick={() => setCounter(0)}>reset</button>
    </div>
  );
}
