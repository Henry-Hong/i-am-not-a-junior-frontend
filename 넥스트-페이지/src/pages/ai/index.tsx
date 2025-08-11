const numberArray = Array.from({ length: 100 })
  .fill(0)
  .map((_, i) => i);

export default function Page() {
  const getAIDoubledNumber = async (num: number) => {
    return fetch(`/api/chat?num=${num}`, { method: "GET" });
  };

  const getAIDoubleNumberBulk = async (nums: number[]) => {
    return fetch(
      `/api/bulk-chat?${nums.map((num) => `nums=${num}`).join("&")}`
    );
  };

  const handleClick = async () => {
    const promises = numberArray.map((num) => getAIDoubledNumber(num));
    const settledResults = await Promise.allSettled(promises);
    const results = await Promise.all(
      settledResults.map((settled) =>
        settled.status === "fulfilled" ? settled.value.json() : "failed"
      )
    );

    console.log(results);
  };

  const handleClickBulk = async () => {
    const nums = Array.from({ length: 100 }, (_, i) => i);
    const response = await getAIDoubleNumberBulk(nums);
    const result = await response.json();
    console.log(result);
  };

  return (
    <>
      <button onClick={handleClick}>click</button>
      <button onClick={handleClickBulk}>click</button>
    </>
  );
}
