import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

export const useErrorQuery = () => {
  const { error, isFetched, isSuccess } = useQuery({
    queryKey: ["error"],
    queryFn: () => axios.get("/error"),
    retry: false,
  });
  if (!isFetched) return undefined;
  if (isSuccess) return true;
  if (error instanceof AxiosError && error.status === 403) return false;
  throw error;
};
