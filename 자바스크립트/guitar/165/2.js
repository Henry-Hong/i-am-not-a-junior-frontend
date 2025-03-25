/**
 * 1. 캐시 레이어를 외부에 정의할지, 인스턴스 내에 정의할지
 * 2.
 */

const data = new Map([
  ["DOGS", ["1"]],
  ["CATS", ["2"]],
  ["BIRDS", ["3"]],
]);

class ApiService {
  async fetch(id) {
    await new Promise((res) => setTimeout(res, 250));
    if (!data.has(id)) {
      return undefined;
    }
    return {
      data: {
        [id]: data.get(id),
      },
    };
  }
}

class CacheInterface {
  get() {
    throw Error("Not implemented yet");
  }
  set() {
    throw Error("Not implemented yet");
  }
  delete() {
    throw Error("Not implemented yet");
  }
  clear() {
    throw Error("Not implemented yet");
  }
}

class InMemoryCache extends CacheInterface {
  ttl = 1000; // time to live (milliseconds)
  constructor(apiService) {
    super();
    this.cache = new Map();
    this.fetch = apiService.fetch;
  }
  async get(key, refetch = false) {
    if (!this.cache.has(key) || refetch) {
      const result = await this.fetch(key);
      this.set(key, result);
      return Object.assign(result, { status: "Fresh" });
    }

    const { value, timestamp } = this.cache.get(key);
    const timeGapInMs = Date.now() - timestamp;
    const isStale = timeGapInMs > this.ttl;
    if (isStale) {
      return await this.get(key, true);
    }

    return Object.assign(value, { status: "Cached" });
  }
  set(key, value) {
    this.cache.set(key, { value, timestamp: Date.now() });
  }
  delete(key) {
    return this.cache.delete(key);
  }
  clear() {
    this.cache.clear();
  }
  setCacheRefresh(ttl) {
    this.ttl = ttl;
  }
}

// function createCache({ type }) {
//   if (type === "memory") {
//     return new InMemoryCache(new ApiService());
//   } else {
//     throw Error("not supported type of cache");
//   }
// }

async function run() {
  const apiService = new ApiService();
  const cacheLayer = new InMemoryCache(apiService);

  console.log(await cacheLayer.get("DOGS")); // Fetches data, Fresh
  await new Promise((res) => setTimeout(res, 100));
  console.log(await cacheLayer.get("DOGS")); // Returns cached response, Cached
  await new Promise((res) => setTimeout(res, 1000));
  console.log(await cacheLayer.get("DOGS")); // Fetches new data, Fresh

  console.log(await cacheLayer.get("CATS")); // Fetches data, Fresh
  cacheLayer.setCacheRefresh(10);
  await new Promise((res) => setTimeout(res, 100));
  console.log(await cacheLayer.get("CATS")); // Fetches new data, Fresh

  console.log(await cacheLayer.get("BIRDS")); // Fetches data, Fresh
  console.log(await cacheLayer.get("BIRDS", true)); // Forces fetch, Fresh
}

run();

/**
 * 데이터를 set 하는 방법
 * 1. set 할 때, 현재 timestamp를 넣는다
 * -> 수정이 즉각적으로 반영된다
 * 2. set 할 때, ttl 계산한값
 * -> 수정이 영구적이달까..?
 */
