import { useReducer } from "react";

export default function ReducerPage() {
  const initialState = {
    count: 0,
    resetCount: 0,
  };
  const [state, dispatch] = useReducer(
    (
      state: typeof initialState,
      action: {
        type: "plus" | "minus" | "reset";
      }
    ) => {
      switch (action.type) {
        case "plus":
          return { ...state, count: state.count + 1 };
        case "minus":
          return { ...state, count: state.count - 1 };
        case "reset":
          return { ...initialState, resetCount: state.resetCount + 1 };
      }
    },
    initialState
  );

  return (
    <div>
      <h3 className="text-2xl font-bold">Counter App</h3>

      <p className="font-bold text-xl">count : {state.count}</p>
      <p className="font-bold text-xl">reset count : {state.resetCount}</p>

      <div className="flex gap-3 ">
        <button
          className="px-2 py-1 border rounded border-gray-300"
          onClick={() => dispatch({ type: "plus" })}
        >
          +1
        </button>
        <button
          className="px-2 py-1 border rounded border-gray-300"
          onClick={() => dispatch({ type: "minus" })}
        >
          -1
        </button>

        <button
          className="px-2 py-1 border rounded border-gray-300"
          onClick={() => dispatch({ type: "reset" })}
        >
          reset
        </button>
      </div>
    </div>
  );
}
