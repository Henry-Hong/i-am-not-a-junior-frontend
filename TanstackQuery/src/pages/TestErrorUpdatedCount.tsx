import { useQuery } from "@tanstack/react-query";
import { useReducer } from "react";

export default function TestErrorUpdatedCount() {
  const [isMounted, toggleIsMounted] = useReducer((prev) => !prev, false);
  const data = useQuery({
    queryKey: ["test-error-updated-count"],
    queryFn: () => fetch("/test-error-updated-count").then((res) => res.json()),
    retry: false,
    enabled: false,
  });

  return (
    <>
      <button onClick={toggleIsMounted}>
        {isMounted ? "mounted" : "unmounted"}
      </button>

      <pre>{JSON.stringify(data, null, 2)}</pre>

      {isMounted ? <TestErrorUpdatedCountContainer /> : <div>nothing</div>}
    </>
  );
}

function TestErrorUpdatedCountContainer() {
  const data = useQuery({
    queryKey: ["test-error-updated-count"],
    queryFn: () => fetch("/test-error-updated-count").then((res) => res.json()),
    retry: false,
  });

  return (
    <>
      <div>data.errorUpdateCount: {data.errorUpdateCount}</div>
      <details>
        <summary>data</summary>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </details>
    </>
  );
}
