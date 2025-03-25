import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useReducer } from "react";

/**
 * refetching 은 cache가 있는 경우에만 발생한다.
 * 따라서 cacheTime이 0이면 항상 refetched 상태이다.
 */
export function TestStaleAndCacheTime() {
  const [isMounted, toggleIsMounted] = useReducer((prev) => !prev, false);
  const [isMounted2, toggleIsMounted2] = useReducer((prev) => !prev, false);
  const [isMounted3, toggleIsMounted3] = useReducer((prev) => !prev, false);
  const [isMounted4, toggleIsMounted4] = useReducer((prev) => !prev, false);
  const [isMounted5, toggleIsMounted5] = useReducer((prev) => !prev, false);

  return (
    <div className="p-4">
      <h3>staleTime: Default(0), cacheTime: Default(5분)</h3>
      <h4>
        staleTime이 0이라서, refetchOnFocusWindow가 적용된다. 다만,
        cacheTime내에 요청보낸거라면, 서버가 아닌 캐시에서 가져온다.
      </h4>
      <button className="border-2 border-black p-4" onClick={toggleIsMounted}>
        {isMounted ? "mounted" : "unmounted"}
      </button>
      {isMounted ? <TanstackContainer /> : <div>nothing</div>}

      <hr />

      <h3>staleTime: Infinity, cacheTime: 0</h3>
      <h4>
        staleTime 이 Infinity 라서, refetchOnFocusWindow가 적용되지 않는다.
        다만, 다시 마운트되면 캐싱된게 없기 때문에 무조건 서버로 요청한다.
      </h4>
      <button className="border-2 border-black p-4" onClick={toggleIsMounted2}>
        {isMounted2 ? "mounted" : "unmounted"}
      </button>
      {isMounted2 ? <TanstackContainer2 /> : <div>nothing</div>}

      <hr />

      <h3>staleTime: 0, cacheTime: Infinity</h3>
      <h4>
        staleTime 이 0이라서, refetch 계속할거임. 그래도 cacheTime이 Infinity
        니까, 앱이 활성회된 동안 계속 캐시를 사용함. optimistic UI 처럼 캐시에
        있는 데이터를 보여주고, background 에서 refetching을 아마 열심히
        하고있을것임. 가장 default랑 유사한 동작.
      </h4>
      <button className="border-2 border-black p-4" onClick={toggleIsMounted3}>
        {isMounted3 ? "mounted" : "unmounted"}
      </button>
      {isMounted3 ? <TanstackContainer3 /> : <div>nothing</div>}

      <hr />

      <h3>staleTime: 0, cacheTime: 0</h3>
      <h4>계속 refetch 할꺼고, 캐싱도 안해서 매번 서버요청함.</h4>
      <button className="border-2 border-black p-4" onClick={toggleIsMounted4}>
        {isMounted4 ? "mounted" : "unmounted"}
      </button>
      {isMounted4 ? <TanstackContainer4 /> : <div>nothing</div>}

      <hr />

      <h3>staleTime: Infinity, cacheTime: Infinity</h3>
      <h4>
        staleTime이 도래하지않았으니까 refetch도 안하고, 항상 캐시에서 가져옴.
        서버로의 요청이 굉장히 감소함
      </h4>
      <button className="border-2 border-black p-4" onClick={toggleIsMounted5}>
        {isMounted5 ? "mounted" : "unmounted"}
      </button>
      {isMounted5 ? <TanstackContainer5 /> : <div>nothing</div>}
    </div>
  );
}

function TanstackContainer() {
  const { data, isLoading, isFetching, isRefetching, error } = useQuery({
    queryKey: ["asdf"],
    queryFn: () => axios.get("/cache-and-stale-time"),
    select: (data) => data.data,
  });

  return (
    <div>
      <p>loading : {isLoading ? "loading..." : "loaded"}</p>
      <p>fetching : {isFetching ? "fetching..." : "fetched"}</p>
      <p>refetching : {isRefetching ? "refetching..." : "refetched"}</p>
      <p>data: {JSON.stringify(data?.data, null, 2)}</p>
      <p>error: {error ? "error" : "no error"}</p>
    </div>
  );
}

function TanstackContainer2() {
  const { data, isLoading, isFetching, isRefetching, error } = useQuery({
    queryKey: ["asdf2"],
    queryFn: () => axios.get("/cache-and-stale-time"),
    select: (data) => data.data,
    staleTime: Infinity,
    cacheTime: 0,
  });

  return (
    <div>
      <p>loading : {isLoading ? "loading..." : "loaded"}</p>
      <p>fetching : {isFetching ? "fetching..." : "fetched"}</p>
      <p>refetching : {isRefetching ? "refetching..." : "refetched"}</p>
      <p>data: {JSON.stringify(data?.data, null, 2)}</p>
      <p>error: {error ? "error" : "no error"}</p>
    </div>
  );
}

function TanstackContainer3() {
  const { data, isLoading, isFetching, isRefetching, error } = useQuery({
    queryKey: ["asdf3"],
    queryFn: () => axios.get("/cache-and-stale-time"),
    select: (data) => data.data,
    staleTime: 0,
    cacheTime: Infinity,
  });

  return (
    <div>
      <p>loading : {isLoading ? "loading..." : "loaded"}</p>
      <p>fetching : {isFetching ? "fetching..." : "fetched"}</p>
      <p>refetching : {isRefetching ? "refetching..." : "refetched"}</p>
      <p>data: {JSON.stringify(data?.data, null, 2)}</p>
      <p>error: {error ? "error" : "no error"}</p>
    </div>
  );
}

function TanstackContainer4() {
  const { data, isLoading, isFetching, isRefetching, error } = useQuery({
    queryKey: ["asdf4"],
    queryFn: () => axios.get("/cache-and-stale-time"),
    select: (data) => data.data,
    staleTime: 0,
    cacheTime: 0,
  });

  return (
    <div>
      <p>loading : {isLoading ? "loading..." : "loaded"}</p>
      <p>fetching : {isFetching ? "fetching..." : "fetched"}</p>
      <p>refetching : {isRefetching ? "refetching..." : "refetched"}</p>
      <p>data: {JSON.stringify(data?.data, null, 2)}</p>
      <p>error: {error ? "error" : "no error"}</p>
    </div>
  );
}

function TanstackContainer5() {
  const { data, isLoading, isFetching, isRefetching, error } = useQuery({
    queryKey: ["asdf5"],
    queryFn: () => axios.get("/cache-and-stale-time"),
    select: (data) => data.data,
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  return (
    <div>
      <p>loading : {isLoading ? "loading..." : "loaded"}</p>
      <p>fetching : {isFetching ? "fetching..." : "fetched"}</p>
      <p>refetching : {isRefetching ? "refetching..." : "refetched"}</p>
      <p>data: {JSON.stringify(data?.data, null, 2)}</p>
      <p>error: {error ? "error" : "no error"}</p>
    </div>
  );
}
