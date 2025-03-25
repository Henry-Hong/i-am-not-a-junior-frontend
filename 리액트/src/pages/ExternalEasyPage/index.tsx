import { useEffect, useRef, useState, useSyncExternalStore } from "react";

/**
 * ExternalStore는, 결국 명시적으로 변화가 일어났다는것을 onStoreChange로 알려줘야한다.
 * 아래 예시는 resize가 일어날 때 마다, onStoreChange를 실행하게 되어, 두번째 파라미터인 () => window.innerWidth를 실행하게된다.
 * 하지만 일반적으로 ref값이나 class 내부에 있는 값이 바뀌었다고 한다면, emitChange를 해줘야한다.
 */

const noop = () => {};

class ExternalData {
  public stack: string[] = [];
  private emitChange: () => void = noop;

  constructor(stack: string[]) {
    this.stack = stack;
  }

  push(data: string) {
    this.stack = [...this.stack, data];
    this.emitChange();
  }

  pop() {
    const popped = this.stack.at(-1);
    this.stack = this.stack.slice(0, -1);
    this.emitChange();
    return popped;
  }

  setListener(listener: () => void) {
    this.emitChange = listener;
  }
}

// export default function ExternalEasyPage() {
//   const externalDataRef = useRef(new ExternalData(["random"]));
//   const stack = useSyncExternalStore(
//     (onStoreChange) => {
//       externalDataRef.current.setListener(() => {
//         onStoreChange();
//         console.log("listener invoked");
//       });
//       return () => externalDataRef.current.setListener(noop);
//     },
//     () => externalDataRef.current.stack
//   );

//   return (
//     <div>
//       {JSON.stringify(stack)}

//       <div>
//         <button onClick={() => externalDataRef.current.push("random")}>
//           push
//         </button>
//         <button onClick={() => externalDataRef.current.pop()}>pop</button>
//       </div>
//     </div>
//   );
// }

export default function ExternalEasyPage() {
  const width = useSyncExternalStore(
    // 1. subscribe 함수: 변화를 감지하고 콜백을 실행
    (onStoreChange) => {
      window.addEventListener("resize", () => {
        onStoreChange();
      });
      return () => {
        window.removeEventListener("resize", onStoreChange);
      };
    },
    // 2. 현재 상태를 반환하는 함수
    () => window.innerWidth
  );

  return <div>현재 창 너비: {width}px</div>;
}

// export default function ExternalEasyWithRef() {
//   const listener = useRef<() => void>();
//   const arrayRef = useRef<string[]>([]);

//   const push = (val: string) => {
//     arrayRef.current.push(val);
//   };

//   const pop = () => {
//     const popped = arrayRef.current.pop();
//     return popped;
//   };

//   const handlePush = () => {
//     console.log("push");
//     push("random");
//     emitChange();
//   };

//   const handlePop = () => {
//     console.log("pop");
//     pop();
//     emitChange();
//   };

//   const emitChange = () => {
//     if (!listener.current) return;
//     listener.current();
//   };

//   const synchronizedArray = useSyncExternalStore(
//     (notify) => {
//       listener.current = notify;
//       return () => {};
//     },
//     () => arrayRef.current
//   );

//   return (
//     <div className="flex flex-col gap-4">
//       <div className="flex gap-4">
//         <button onClick={handlePush}>push</button>
//         <button onClick={handlePop}>pop</button>
//       </div>
//       <p>{JSON.stringify(synchronizedArray)}</p>
//     </div>
//   );
// }

// export default function ExternalEasyWithStateAndEffectPage() {
//   const [width, setWidth] = useState(window.innerWidth);

//   const handleResize = () => {
//     setWidth(window.innerWidth);
//   };

//   useEffect(() => {
//     window.addEventListener("resize", handleResize);
//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   return <div>현재 창 너비 : {width}px</div>;
// }
