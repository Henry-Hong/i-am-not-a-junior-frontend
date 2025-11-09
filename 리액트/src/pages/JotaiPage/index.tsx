import { atom, PrimitiveAtom, useAtom } from "jotai";
import { createContext, PropsWithChildren, useContext } from "react";
import WriteOnlyTest from "./WriteOnlyTest";

/**
 * 테스트하고 싶은것
 * 1. atom with debugLabel
 * 2. atom in Context.
 * - 뭐가 좋은지 모르겠다.
 */

const counter = atom(0);
const doubleCounter = atom((get) => get(counter) * 2);
counter.debugLabel = "counter";

export default function JotaiPage() {
  return <WriteOnlyTest />;
  const [count, setCount] = useAtom(counter);
  return (
    <div>
      <p>{count}</p>
      <div className="flex flex-col gap-5">
        <button
          className="border-2 border-red-500"
          onClick={() => setCount((p) => p + 1)}
        >
          +
        </button>

        <button
          className="border-2 border-blue-400"
          onClick={() => setCount((p) => p - 1)}
        >
          -
        </button>
      </div>

      <hr />

      <Outer>
        <Inner />
      </Outer>
      <Outer>
        <Inner />
      </Outer>
    </div>
  );
}

const context = createContext<{ atom: PrimitiveAtom<number> | null }>({
  atom: null,
});

function Outer({ children }: PropsWithChildren) {
  return (
    <context.Provider value={{ atom: atom(0) }}>{children}</context.Provider>
  );
}

function Inner() {
  const value = useContext(context);

  const [innerCounter, setInnerCounter] = useAtom(value.atom!);

  return (
    <div>
      <h3>Inner</h3>
      <p>counter : {innerCounter}</p>
      <div className="flex gap-3">
        <button onClick={() => setInnerCounter((p) => p - 1)}>minus</button>
        <button onClick={() => setInnerCounter((p) => p + 1)}>plus</button>
      </div>
    </div>
  );
}
