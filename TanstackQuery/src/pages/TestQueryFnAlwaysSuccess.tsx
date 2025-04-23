import { useQuery } from "@tanstack/react-query";

export default function TestQueryFnAlwaysSuccess() {
  const { data: alwaysSuccessData } = useAlwaysSuccessQuery();

  return (
    <div>
      <h1>TestQueryFnAlwaysSuccess</h1>
      <p>{alwaysSuccessData ? "success" : "failure"}</p>
    </div>
  );
}

const useAlwaysSuccessQuery = () => {
  return useQuery({
    queryFn: async () => {
      if (Math.random() > 0.5) {
        return true;
      }
      return false;
    },
    retry: false,
  });
};
