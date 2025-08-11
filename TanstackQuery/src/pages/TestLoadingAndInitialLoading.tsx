import { useQuery } from "@tanstack/react-query";

const query = async () => {
  return await new Promise((resolve) =>
    setTimeout(() => resolve("test query resolved"), 1000)
  );
};

export default function TestLoadingAndInitialLoading() {
  const disabledQuery = useQuery({
    queryKey: ["test-disabled"],
    queryFn: query,
    enabled: false,
  });

  const enabledQuery = useQuery({
    queryKey: ["test-enabled"],
    queryFn: query,
    enabled: true,
  });

  return (
    <div>
      <h1>TestLoadingAndInitialLoading</h1>
      <h3>
        isInitialLoading은, disabled 상태의 query의 loading 상태를 판별할 때
        사용합니다.
      </h3>
      <pre>isInitialLoading === isLoading && isFetching</pre>
      <div style={{ display: "flex", gap: "10px" }}>
        <div>
          <h4>disabled query</h4>
          <pre>{JSON.stringify(disabledQuery, null, 2)}</pre>
        </div>
        <div>
          <h4>enabled query</h4>
          <pre>{JSON.stringify(enabledQuery, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}
