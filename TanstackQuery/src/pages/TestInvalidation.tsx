import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useReducer } from "react";

/**
 * 강제로 invalidation을 해버리면,
 * staleTime: Infinity 라도, stale 상태로 간주하게 된다
 * 이는 다음을 트리거한다
 *
 * isRefetching: true
 * isFetching: true
 * fetchStatus: "fetching"
 *
 * invalidate (inactive) -> isStale만 true로 변함
 *
 * TODO: invalidateQueries의 다양한 option에 따른 결과 정리하기
 */

export default function TestInvalidation() {
  const [, forceRerender] = useReducer(() => ({}), {});

  const queryClient = useQueryClient();
  const data = useQuery({
    queryKey: ["invalidation"],
    queryFn: () => {
      return fetch("/invalidation").then((res) => res.json());
    },
    staleTime: Infinity,
  });

  return (
    <div>
      <button onClick={forceRerender}>rerender</button>
      <button
        onClick={() =>
          queryClient.invalidateQueries({ queryKey: ["invalidation"] })
        }
      >
        Invalidate
      </button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
