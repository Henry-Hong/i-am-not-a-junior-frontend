import { useQuery } from "@tanstack/react-query";
import { useReducer } from "react";

export default function TanstackQueryPage() {
  const [isMounted, toggleIsMounted] = useReducer((prev) => !prev, false);

  return (
    <div className="p-4">
      <button className="border-2 border-black p-4" onClick={toggleIsMounted}>
        {isMounted ? "mounted" : "unmounted"}
      </button>
      {isMounted ? <TanstackContainer /> : <div>nothing</div>}
    </div>
  );
}

function TanstackContainer() {
  const { data, isLoading, error } = useQuery<{ data: string }>({
    queryKey: ["test"],
    queryFn: async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ data: "test" });
        }, 1000);
      });
    },
    staleTime: 0,
    gcTime: 0,
  });

  return (
    <div>
      <p>loading : {isLoading ? "loading..." : "loaded"}</p>
      <p>data: {data?.data}</p>
      <p>error: {error ? "error" : "no error"}</p>
    </div>
  );
}
