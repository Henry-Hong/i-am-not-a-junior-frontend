/**
 * https://happysisyphe.tistory.com/54
 * Suspense
 * - Suspense는 비동기 작업의 로딩상태를 선언적으로 관리할 수 있다!
 * - ErrorBoundary가 throw Error를 잡아내는 것처럼,
 * - Suspense로 throw Promise를 잡아낸다.
 * - Promise가 pending : fallback
 * - Promise가 settled(resolved / rejected) : children
 */

import { useSuspenseQueries, useSuspenseQuery } from "@tanstack/react-query";
import { apis } from "../apis";

export default function 리액트쿼리_Suspense() {
  const getTodos = async () => {
    const response = await apis.get("/todos");
    return response;
  };

  const getTodos2 = async () => {
    const response = await apis.get("/todos2");
    return response;
  };

  /**
   * useSuspenseQuery 2개를 사용하면, network waterfall 현상이 발생한다.
   * 이유는 첫번째 useSuspenseQuery가 resolved되어야 두번째 useSuspenseQuery가 실행되기 때문이다.
   * (첫번째 query가 pending 상태일땐 fallback을 리턴하므로 children (두번째 query가 포함된 <리액트쿼리_Suspense/>)가 실행되지 않는다.)
   */
  const { data: todos1 } = useSuspenseQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  const { data: todos2 } = useSuspenseQuery({
    queryKey: ["todos2"],
    queryFn: getTodos2,
  });

  /**
   * 하지만 useSuspenseQueries를 사용하면, network waterfall 현상이 발생하지 않는다.
   */
  // const [{ data: todos1 }, { data: todos2 }] = useSuspenseQueries({
  //   queries: [
  //     {
  //       queryKey: ["todos"],
  //       queryFn: getTodos, // delay 1000
  //     },
  //     {
  //       queryKey: ["todos2"],
  //       queryFn: getTodos2, // delay 5000
  //     },
  //   ],
  // });

  /**
   * Suspense로 감싸놓고 useSuspsenseQuery대신 useQuery를 사용하면, 쿼리가 병렬적으로 요청된다. side-by-side
   * 차이점은 useQuery는 throw Promise를 하지 않는가보다 (뇌피셜)
   * https://tanstack.com/query/latest/docs/framework/react/guides/parallel-queries#manual-parallel-queries
   */
  // const { data: todos1 } = useQuery({
  //   queryKey: ["todos"],
  //   queryFn: getTodos,
  // });

  // const { data: todos2 } = useQuery({
  //   queryKey: ["todos2"],
  //   queryFn: getTodos2,
  // });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "red",
      }}
    >
      <h1>리액트쿼리_Suspense</h1>
      {todos1}
      {todos2}
    </div>
  );
}
