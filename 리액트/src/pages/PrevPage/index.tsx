import { useEffect, useRef, useState } from "react";

export default function PrevPage() {
  const [state, setState] = useState(0);
  const ref = useRef(state);

  useEffect(() => {
    ref.current = state;
  });

  return (
    <div>
      <button onClick={() => setState(state + 1)}>{state}</button>
      <p>state: {state}</p>
      <p>ref: {ref.current}</p>
    </div>
  );
}
