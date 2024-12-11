import { useState } from "react";
import { useDebounce as useDebounce1 } from "./useDebounce";
import { useDebounce2 } from "./useDebounce2";

export default function Debounce() {
  const [value, setValue] = useState("");
  const [value2, setValue2] = useState("");
  const [derivedValue1, setDerivedValue1] = useState(value);
  const [derivedValue2, setDerivedValue2] = useState(value2);

  const { isDebouncing: isDebouncing1 } = useDebounce1(
    () => setDerivedValue1(value),
    500,
    [value]
  );

  const { isDebouncing: isDebouncing2 } = useDebounce2(
    () => setDerivedValue2(value2),
    500,
    [value2]
  );

  return (
    <div className="bg-red-300">
      <h1>welcome to useDebounce Test Bed</h1>
      <h3>isDebouncing1 : {isDebouncing1 ? "true" : "false"}</h3>
      <h3>isDebouncing2 : {isDebouncing2() ? "true" : "false"}</h3>
      <input
        className="p-4 min-w-[320px] border"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <h1>{derivedValue1}</h1>
      <input
        className="p-4 min-w-[320px] border"
        value={value2}
        onChange={(e) => setValue2(e.target.value)}
      />
      <h1>{derivedValue2}</h1>
    </div>
  );
}
