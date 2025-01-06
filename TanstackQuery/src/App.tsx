import { useErrorQuery } from "./useErrorQuery";

function App() {
  const result = useErrorQuery();
  console.log("result", result);

  return (
    <>
      <div></div>
    </>
  );
}

export default App;
