import { useReducer } from "react";

type Action<T> =
  | {
      type: "APPEND";
      payload: T;
    }
  | {
      type: "POP";
    }
  | {
      type: "UPDATE";
      payload: T;
      evaluator: (item: T) => boolean;
    };

export const useArrayState2 = <T>(initialValue: T[]) => {
  const arrayStateReducer = (state: T[], action: Action<T>): T[] => {
    switch (action.type) {
      case "APPEND":
        return [...state, action.payload];
      case "POP":
        return [...state].slice(0, -1);
      case "UPDATE":
        return (() => {
          const idx = state.findIndex(action.evaluator);
          const newArr = [...state];
          newArr.splice(idx, 1, action.payload);
          return newArr;
        })();
      default:
        return state;
    }
  };

  const [arr, dispatch] = useReducer(arrayStateReducer, initialValue);

  return [arr, dispatch] as const;
};
