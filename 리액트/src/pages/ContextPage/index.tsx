import { createContext, ReactNode, useContext } from "react";

export const buildContext = <T extends object>(
  contextName: string,
  defaultValue?: T
) => {
  const Context = createContext(defaultValue);

  const Provider = ({
    children,
    value,
  }: {
    children: ReactNode;
    value?: T;
  }) => {
    return <Context.Provider value={value}>{children}</Context.Provider>;
  };

  const useInnerContext = () => {
    const value = useContext(Context);

    if (value != null) {
      return value;
    }

    if (defaultValue) {
      return defaultValue;
    }

    throw new Error(`${contextName} is not provided`);
  };

  return [Provider, useInnerContext] as const;
};

const [HelloProvider, useHelloContext] = buildContext("hello", { b: 2 });

export default function ContextPage() {
  return (
    <HelloProvider>
      <Hello />
    </HelloProvider>
  );
}

function Hello() {
  const helloValue = useHelloContext();

  return (
    <div>
      <h1>Hello component</h1>
      <pre>{JSON.stringify(helloValue, null, 2)}</pre>
    </div>
  );
}
