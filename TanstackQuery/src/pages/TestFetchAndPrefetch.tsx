import { useQueryClient } from "@tanstack/react-query";
import { useReducer } from "react";

export default function TestFetchAndPrefetch() {
  const [, forceRender] = useReducer(() => ({}), {});

  const queryClient = useQueryClient();

  const queryState = queryClient.getQueryState(["fetch-and-prefetch"]);
  const queryCache = queryClient.getQueryCache();

  const handlePrefetch = () => {
    queryClient.prefetchQuery({
      queryKey: ["fetch-and-prefetch"],
      queryFn: () => {
        return fetch("/fetch-and-prefetch").then((res) => res.json());
      },
      staleTime: 5000,
      cacheTime: Infinity,
    });
    forceRender();
  };

  return (
    <div>
      <button
        onClick={() => {
          forceRender();
          console.log(queryCache.getAll().length);
        }}
      >
        forceRender
      </button>
      <button
        onClick={() =>
          console.log(
            'queryClient.getQueryState(["fetch-and-prefetch"])',
            queryClient.getQueryState(["fetch-and-prefetch"])
          )
        }
      >
        show me
      </button>
      <h1>queryData</h1>
      <pre>{JSON.stringify(queryState, null, 2)}</pre>
      <button onClick={handlePrefetch}>prefetch</button>
    </div>
  );
}

/**
 *
 * 컨텐츠 데이터의 특성상
 * 1. 데이터가 자주 변경되지 않음
 * 2. 한번만 fetch 하면 됨
 * 3. 다시 fetch 할 필요 없음
 * 4. 따라서 staleTime 도 Infinity로 잡자
 * 5. cacheTime 도 Infinity로 해야할까?
 *
 * prefetch 실험
 * - 요청 계속 다시 보냄.
 * - dataUpdateCount 가 계속 증가함
 *
 * ensureQueryData
 * - 요청 안보냄
 * - 아 예는 cache에만 있으면 stale 하든 말든 간에 요청을 안보내는 느낌인가..?
 * - dataUpdateCount 가 증가하지 않음
 *
 * 일단 요청을 다시 안보내는 것만 사용하면됨
 * &&
 * 굳이 응답값을 활용안해도 되는
 * -
 */
