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

async function callback(param) {
  await new Promise((res) => setTimeout(res, 1000));
  if (Math.random() > 0.5) {
    console.log("실패");
    throw new Error("errrrrrrrr");
  } else {
    console.log("성공");
    return param;
  }
}

(async () => {
  console.log(await withRetry(() => callback("good"), 3));
})();
