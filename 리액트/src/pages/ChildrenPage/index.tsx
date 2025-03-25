import { PropsWithChildren, useReducer } from "react";

export default function ChildrenPage() {
  return (
    <div>
      <h2 className="font-bold text-2xl">Using children prop:</h2>
      <Parent>
        <Child name="via children prop" />
      </Parent>

      <h2 className="font-bold text-2xl">Direct inclusion:</h2>
      <ParentWithDirectChild />
    </div>
  );
}

function Parent({ children }: PropsWithChildren) {
  const [_, forceUpdate] = useReducer((prev) => !prev, false);
  console.log("Parent rendered");
  return (
    <div>
      <p>Parent</p>
      <button className="border-2 border-black" onClick={forceUpdate}>
        rerender Parent
      </button>
      {children}
    </div>
  );
}

function ParentWithDirectChild() {
  const [_, forceUpdate] = useReducer((prev) => !prev, false);
  console.log("ParentWithDirectChild rendered");
  return (
    <div>
      <p>Parent with direct child</p>
      <button className="border-2 border-black" onClick={forceUpdate}>
        rerender Parent
      </button>
      <Child name="direct inclusion" />
    </div>
  );
}

function Child({ name }: { name?: string }) {
  console.log(`Child rendered: ${name}`);
  return <div>Child {name}</div>;
}
