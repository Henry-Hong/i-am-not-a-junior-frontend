import { useState } from "react";
import { useArrayState2 } from "./useArrayState2";

export default function ArrayStatePage() {
  const [arr, dispatch] = useArrayState2<{ num: number }>([]);

  return (
    <>
      <button
        onClick={() => {
          dispatch({ type: "APPEND", payload: { num: 1 } });
        }}
      >
        append
      </button>
      <button
        onClick={() => {
          dispatch({ type: "POP" });
        }}
      >
        pop
      </button>
      <button
        onClick={() => {
          dispatch({
            type: "UPDATE",
            payload: { num: 100 },
            evaluator: (item) => item.num === 1,
          });
        }}
      >
        update
      </button>
      <pre>{JSON.stringify(arr, null, 2)}</pre>
    </>
  );
}

// export default function ArrayStatePage() {
//   const [arr, { updateIndex }] = useArrayState({
//     initialValues: [{ a: 1, b: 2, c: 3 }],
//   });

//   return (
//     <>
//       <button onClick={() => updateIndex(0, { a: 2, b: 4, c: 6 })}>
//         update
//       </button>
//       <pre>{JSON.stringify(arr, null, 2)}</pre>
//     </>
//   );
// }

const useArrayState = <T,>({ initialValues }: { initialValues?: T[] } = {}) => {
  const [arr, setArr] = useState(initialValues ?? []);

  const push = (item: T) => {
    setArr((prev) => {
      const newArr = [...prev];
      newArr.push(item);
      return newArr;
    });
  };

  const pop = () => {
    const lastItem = arr[arr.length - 1];
    setArr((prev) => {
      const newArr = [...prev];
      newArr.pop();
      return newArr;
    });
    return lastItem;
  };

  const removeIndex = (index: number) => {
    const toBeRemovedItem = arr[index];
    setArr((prev) => {
      const newArr = [...prev];
      newArr.splice(index, 1);
      return newArr;
    });
    return toBeRemovedItem;
  };

  const remove = (validator: (item: T) => boolean) => {
    const toBeRemovedItemIndex = arr.findIndex(validator);
    return removeIndex(toBeRemovedItemIndex);
  };

  const updateIndex = (index: number, item: T) => {
    setArr((prev) => {
      const newArr = [...prev];
      newArr[index] = item;
      return newArr;
    });
  };

  const update = (item: T, validator: (item: T) => boolean) => {
    const toBeUpdatedItemIndex = arr.findIndex(validator);
    return updateIndex(toBeUpdatedItemIndex, item);
  };

  return [
    arr,
    { push, pop, remove, removeIndex, update, updateIndex },
  ] as const;
};
