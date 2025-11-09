import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { retry } from "./retry";

export default function ReactQueryThrow() {
  const result = useQuery({
    queryFn: () =>
      retry(() => axios.get("/react-query-throw"), {
        delay: 3000,
        shouldRetry: (error) => {
          if (error instanceof AxiosError) {
            return error.response?.data.code === "not-ready";
          }
          return false;
        },
      }),
    queryKey: ["react-query-throw"],
    retry: false,
  });

  return <pre>{JSON.stringify(result, null, 2)}</pre>;
}
