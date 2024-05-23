/* eslint-disable react-refresh/only-export-components */

/**
 * Question. 컨텍스트에서는 Provider에 값들을 넘겨줄 때, 최대한 비슷한 값들을 넘겨줘야 한다.
 * Answer. 컨텍스트는 결국 전역변수라서, 영향을 받는 컴포넌트들이 모두 리렌더링되기때문.
 * Question2. 그런데, useContext로 필요한 값만 가져와도그런가?
 * Answer2. 그렇다. React.memo를 사용해도 마찬가지다.
 *
 * Props. Context는 Props Drilling을 피할 수 있으면서, React 기본 제공 API라 쉽게 사용이 가능하다.
 * Cons. Provider에서 관리하는 state가 많아질 수록, 영향을 받는 컴포넌트가 많아진다. 즉
 * Solutions.
 * 1. 자주 바뀌는 state의 응집도를 높인다. (Provider를 분리한다)
 * 2. Redux와 reselect를 사용한다.
 */
import React from "react";
import { createContext, useState } from "react";
import { useContext } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Context = createContext<any | null>(null);

export default function 컨텍스트() {
  const [count, setCount] = useState(0);
  const [noTouch] = useState(false);

  const increase = () => setCount((prev) => prev + 1);

  return (
    <>
      <Context.Provider value={{ count, noTouch, increase }}>
        <DisplayComponent />
        <DontWantToReRenderThisComponent />
      </Context.Provider>

      <button onClick={increase}>increase</button>
    </>
  );
}

function DisplayComponent() {
  console.log("Display 컴포넌트가 렌더링됨");
  const { count } = useContext(Context);
  return <p>count : {count}</p>;
}

const DontWantToReRenderThisComponent = React.memo(function () {
  console.log("DontWantToReRenderThisComponent 컴포넌트가 렌더링됨");
  const { noTouch } = useContext(Context); // <- count를 사용하지 않지만 리렌더링된다.
  return <p>{noTouch ? "true" : "false"}</p>;
});
