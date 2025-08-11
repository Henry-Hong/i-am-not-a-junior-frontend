import { useQueryClient } from "@tanstack/react-query";

export default function TestFetchQueryAndEnsureQueryData() {
  const queryClient = useQueryClient();

  const handleFetchQuery = () => {
    queryClient.fetchQuery({
      queryKey: ["fetch-query-and-ensure-query-data", "type1"],
      queryFn: () => fetch("/fetch-query-and-ensure-query-data/fetchQuery"),
      staleTime: 3000,
      cacheTime: Infinity,
    });
  };

  const handleEnsureQueryData = () => {
    queryClient.ensureQueryData({
      queryKey: ["fetch-query-and-ensure-query-data", "type2"],
      queryFn: () =>
        fetch("/fetch-query-and-ensure-query-data/ensureQueryData"),
      staleTime: 3000,
      cacheTime: Infinity,
    });
  };

  return (
    <div>
      <h1>TestFetchQueryAndEnsureQueryData</h1>
      <h3>fetchQuery. 얘는 staleTime이 지나면 무조건 "refetch" 하게됨</h3>
      <h3>
        버튼 연타하면 지정된 staleTime이 지나고 (3초) 요청보내는것 확인가능
      </h3>
      <button onClick={handleFetchQuery}>type 1</button>
      <h3>
        ensureQueryData. 얘는 staleTime이 지나더라도, cacheTime이 지나지
        않았으면 "refetch"하지 않음
      </h3>
      <h3>버튼 연타시 지정된 staleTime이 지나도 (3초) 요청을 보내지 않음</h3>
      <button onClick={handleEnsureQueryData}>type 2</button>
    </div>
  );
}
