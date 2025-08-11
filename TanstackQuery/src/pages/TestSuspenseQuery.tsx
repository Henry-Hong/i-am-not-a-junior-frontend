import { useQuery } from "@tanstack/react-query";
import { Suspense, useEffect, useState } from "react";

const fetcher = async (data?: number) => {
  await new Promise((res) => setTimeout(res, 1000));
  return Promise.resolve(`you are resolved ${data}`);
  return Promise.reject("you are rejected");
};

export default function TestSuspenseQuery() {
  return (
    <>
      <h1>suspense query</h1>
      <Suspense fallback={<Fallback />}>
        <SuspenseQuery />
      </Suspense>
    </>
  );
}

function SuspenseQuery() {
  const [num, setNum] = useState(0);
  const result = useQuery({
    queryKey: ["fetch", num],
    suspense: true,
    retry: false,
    queryFn: () => fetcher(num),
    keepPreviousData: true,
  });

  // 정확히는, "캐싱되지 않은 새로운 데이터를 자주 받아오는 상황 && 그 새로운 데이터 자체가 그다지 필수적인 값이 아닌경우" 가 있을것 같다.
  // 비로그인 유저와 관련된?, AI추천처럼 자주 실패하는것 -> 필수적인 값이 아닌 경우
  //   -> 캐싱되지 않은 새로운 데이터를 받아오는 상황
  return (
    <>
      <div>suspense query입니다~~</div>
      <pre>{JSON.stringify(result, null, 2)}</pre>
      <input
        type="number"
        value={num}
        onChange={(e) => setNum(Number(e.target.value))}
      />
      <button onClick={() => result.refetch()}>click</button>
    </>
  );
}

function Fallback() {
  useEffect(() => {
    console.log("fallback mounted");

    return () => {
      console.log("fallback unmounted");
    };
  }, []);

  return <div>fallback</div>;
}
