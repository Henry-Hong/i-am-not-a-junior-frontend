import { atomEffect } from "jotai-effect";
import { atom, useAtom } from "jotai";
import { useState } from "react";

const countAtom = atom(0);
const logEffect = atomEffect((get) => {
  console.log("🟢 atomEffect 실행됨");
  console.log("get(countAtom)", get(countAtom));
  return () => console.log("🔴 cleanup");
});

function Counter() {
  const [count, setCount] = useAtom(countAtom);
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>count up</button>
    </div>
  );
}

export default function JotaiEffectPage() {
  const [visible, setVisible] = useState(false);
  useAtom(logEffect);
  return (
    <>
      <button onClick={() => setVisible((v) => !v)}>Toggle Counter</button>
      {visible && <Counter />}
    </>
  );
}
