import { useMachine } from "@xstate/react";
import { assign, createMachine } from "xstate";

const counterMachine = createMachine(
  {
    id: "counter",
    initial: "idle",
    context: {
      count: 0,
    },
    always: {
      actions: [() => console.log("zero")],
      guard: "isZero",
    },
    states: {
      idle: {
        on: {
          OPERATE: { target: "working" },
        },
      },
      working: {
        entry: "entry",
        on: {
          IDLE: { target: "idle" },
          INCREASE: { actions: ["increase"] },
          DECREASE: { actions: ["decrease"] },
        },
      },
    },
  },
  {
    actions: {
      increase: assign({ count: ({ context }) => context.count + 1 }),
      decrease: assign({ count: ({ context }) => context.count - 1 }),
    },
    guards: {
      isZero: ({ context }) => context.count === 0,
    },
  }
);

export default function FSM() {
  const [{ context, value }, send] = useMachine(counterMachine);

  return (
    <div className="bg-slate-200 grid gap-4">
      <p>현재 상태 : {value.toString()}</p>
      <p>현재 컨텍스트 : {context.count}</p>
      <button onClick={() => send({ type: "OPERATE" })}>operate</button>
      <button onClick={() => send({ type: "IDLE" })}>idle</button>
      <button onClick={() => send({ type: "INCREASE" })}>increase</button>
      <button onClick={() => send({ type: "DECREASE" })}>decrease</button>
    </div>
  );
}
