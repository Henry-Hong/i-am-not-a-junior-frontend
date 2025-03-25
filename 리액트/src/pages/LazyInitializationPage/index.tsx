import { useReducer, useState } from "react";

let num = 0;

const getNum = () => {
  console.log("getNum invoked", num);
  return num++;
};

export default function LazyInitializationPage() {
  const [_, rerender] = useReducer((prev) => !prev, false);
  const [counter] = useState(getNum); // rerender가 되더라도 한번만 실행함.. -> num이 리렌더링이 발생하더라도 고정됨 -> 언마운트 전까지는 고정.
  // const [counter] = useState(getNum()); // rerender가 될 때마다 초기화를 진행함... -> num이 리렌더가 발생하면 계속 증가함.. -> 언마운트 전에도 얼마든지 바뀔 여지가 있음;;

  return (
    <div>
      <p>{counter}</p>
      <button onClick={rerender}>rerender</button>
    </div>
  );
}
