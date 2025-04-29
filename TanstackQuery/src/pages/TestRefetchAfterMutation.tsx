import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function TestRefetchAfterMutation() {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["test"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return axios.get("https://jsonplaceholder.typicode.com/todos/1");
    },
    staleTime: 0,
    cacheTime: 0,
  });

  const queryClient = useQueryClient();

  const handleRefetch = () => {
    queryClient.resetQueries({ queryKey: ["test"] });
  };

  return (
    <div>
      <div>{isLoading ? "loading..." : "not loading"}</div>
      <div>{isFetching ? "fetching..." : "not fetching"}</div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <button onClick={handleRefetch}>refetch</button>
    </div>
  );
}
