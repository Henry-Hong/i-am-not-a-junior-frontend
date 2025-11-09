import { atom, useAtom, useAtomValue } from "jotai";
import { useEffect, useRef } from "react";

// 테스트용 atom들
const counterAtom = atom(0);
const writeOnlyAtom = atom(
  null, // 읽기 불가
  (_get, set, value: number) => set(counterAtom, value)
);

// 리렌더링 횟수를 추적하는 컴포넌트
function RenderCounter({ name }: { name: string }) {
  const renderCount = useRef(0);
  renderCount.current++;

  useEffect(() => {
    console.log(`${name} 렌더링 횟수:`, renderCount.current);
  });

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
      <h4>{name}</h4>
      <p>렌더링 횟수: {renderCount.current}</p>
    </div>
  );
}

// 테스트 컴포넌트들
function DirectUpdateComponent() {
  const [counter, setCounter] = useAtom(counterAtom);

  return (
    <>
      <RenderCounter name="Direct Update" />
      <div>
        <p>Counter: {counter}</p>
        <button onClick={() => setCounter((prev) => prev + 1)}>
          Direct Update (+1)
        </button>
      </div>
    </>
  );
}

function WriteOnlyComponent() {
  const counter = useAtomValue(counterAtom);
  const [, setCounter] = useAtom(writeOnlyAtom);

  return (
    <>
      <RenderCounter name="Write Only" />
      <div>
        <p>Counter: {counter}</p>
        <button onClick={() => setCounter(counter + 1)}>
          Write Only Update (+1)
        </button>
      </div>
    </>
  );
}

function ObserverComponent() {
  const counter = useAtomValue(counterAtom);

  return (
    <>
      <RenderCounter name="Observer" />
      <div>
        <p>Counter: {counter}</p>
      </div>
    </>
  );
}

export default function WriteOnlyTest() {
  return (
    <div>
      <h2>Write-Only Atom 리렌더링 테스트</h2>
      <DirectUpdateComponent />
      <WriteOnlyComponent />
      <ObserverComponent />
    </div>
  );
}
