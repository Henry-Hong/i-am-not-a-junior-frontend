async function withRetry(callback, maxRetry) {
  for (let tryCount = 1; tryCount <= maxRetry; tryCount += 1) {
    try {
      return await callback();
    } catch (error) {
      if (tryCount >= maxRetry) {
        throw error;
      }
    }
  }
  throw new Error("Unexpected error occurred");
}

const createFailAtLeastNTimes = (n) => {
  let count = 0;
  return async (num) => {
    count += 1;
    await new Promise((res) => setTimeout(res, 1000));
    if (count <= n) {
      throw new Error(`failed count : ${count}`);
    } else {
      return num * 100;
    }
  };
};

const processAsync = async (num) => {
  await new Promise((res) => setTimeout(res, 1000));
  return num * 100;
};

(async () => {
  console.time("test1");

  const arr = [1, 2, 3, 4, 5];

  // map에 걸려있는 async 는 동작하지 않습니다.
  // const brr = await arr.map(async (e) =>
  //   e % 2 === 0 ? await processAsync(e) : e
  // );

  // reduce를 사용하여 해결할 수 있습니다.
  const brr = await arr.reduce(async (a, c) => {
    const acc = await a;
    const v = c % 2 === 0 ? await processAsync(c) : c;
    return [...acc, v];
  }, []);

  console.log("test1", brr);
  console.timeEnd("test1");
})();

// 병렬 처리가 가능하다면 Promise All 최고~
(async () => {
  console.time("test2");
  const arr = [1, 2, 3, 4, 5];
  const promises = arr.map((e) => (e % 2 === 0 ? processAsync(e) : e));

  const result = await Promise.all(promises);
  console.log("test2", result);
  console.timeEnd("test2");
})();

(async () => {
  console.time("test3");

  const arr = [1, 2, 3, 4, 5];
  const funcs = arr.map((e) => createFailAtLeastNTimes(e));

  const promises = funcs.map((func, i) => withRetry(() => func(arr[i]), 10));

  const result = await Promise.all(promises);
  console.log("test3", result);

  console.timeEnd("test3");
})();
