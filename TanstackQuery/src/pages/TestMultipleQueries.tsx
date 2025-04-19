import { useQueries } from "@tanstack/react-query";

const userIds = [1, 2, 3, 4, 5];

export default function TestMultipleQueries() {
  const results = useQueries({
    queries: userIds.map((id) => ({
      queryKey: [id],
      refetchOnWindowFocus: false,
      queryFn: async () => {
        await new Promise((resolve) =>
          setTimeout(resolve, 500 + Math.random() * 1000)
        );
        if (id % 2 === 0) {
          throw new Error("Error");
        }
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/users/${id}`
        );
        return res.json();
      },
      retry: false,
    })),
  });

  const failedRefetches = results
    .filter((result) => result.isError)
    .map((result) => result.refetch);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <button
        onClick={async () => {
          failedRefetches.map((refetch) => refetch());
        }}
      >
        refetch all failed requests
      </button>
      {userIds.map((userId, i) => (
        <div
          key={userId}
          style={{
            border: "1px solid black",
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          <h3>{results[i].data?.name}</h3>
          <p>{results[i].isError ? "Error" : "No Error"}</p>
          <p>{results[i].data?.email}</p>
          <details>
            <summary>Everything</summary>
            <pre>{JSON.stringify(results[i], null, 2)}</pre>
          </details>
          <button onClick={() => results[i].refetch()}>refetch</button>
        </div>
      ))}
    </div>
  );
}
