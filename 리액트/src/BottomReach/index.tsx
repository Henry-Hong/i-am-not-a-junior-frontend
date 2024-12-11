import { useRef, useState } from "react";
import { useBottomReached } from "./useBottomReached";
import { useBottomReached2 } from "./useBottomReached2";

export default function BottomReach() {
  const bottomRef = useRef<HTMLDivElement>(null);

  // case1 : 디바운스 적용안된 bottom reach
  // const { isBottomReached } = useBottomReached(bottomRef, () => {
  //   console.log("bottom reached");
  // });

  // case2 : 디바운스 적용한 bottom reach
  useBottomReached2({
    ref: bottomRef,
    callback: () => console.log("bottom reached2"),
  });

  const [datas, setDatas] = useState<string[]>(
    Array.from({ length: 100 }, (_, index) => "data" + (index + 1))
  );

  const handleClickAddData = () => {
    setDatas((prev) => [...prev, "data" + (prev.length + 1)]);
  };

  return (
    <ul className="bg-red-300 h-[100  px] overflow-y-auto">
      <button
        className="fixed top-10 right-10 rounded p-2 bg-blue-300"
        onClick={handleClickAddData}
      >
        add data
      </button>
      <h1 className="fixed right-0 top-0 font-bold">
        {/* {isBottomReached ? "reached" : "not reached"} */}
      </h1>
      {datas.map((data) => (
        <li key={data}>{data}</li>
      ))}
      <div ref={bottomRef} />
    </ul>
  );
}
