import { atom, useAtom } from "jotai";
import { Suspense } from "react";

const counterAtom = atom(0);
const onlineCounterAtom = atom(async (get) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const counter = get(counterAtom);
  return counter + 100;
});

export default function AtomPage() {
  const [count, setCount] = useAtom(counterAtom);

  return (
    <div>
      <h1>count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>

      <Suspense fallback={<div>Loading...</div>}>
        <OnlineCounter />
      </Suspense>
    </div>
  );
}

function OnlineCounter() {
  const [count] = useAtom(onlineCounterAtom);
  return <div>OnlineCounter: {count}</div>;
}
