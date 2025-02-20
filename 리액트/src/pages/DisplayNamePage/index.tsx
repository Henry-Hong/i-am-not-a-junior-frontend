import { forwardRef, useState } from "react";

type DisplayNameProps = {
  name: string;
};

const DisplayNamePage = forwardRef(({ name }: DisplayNameProps, ref: any) => {
  const [myName, setMyName] = useState(name);

  return (
    <div ref={ref}>
      <h1>DisplayNamePage</h1>
      <p>{myName}</p>
      <button onClick={() => setMyName("changed")}>button</button>
    </div>
  );
});

DisplayNamePage.displayName = "DisplayNamePage";
export default DisplayNamePage;
