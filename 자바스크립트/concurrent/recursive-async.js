async function recursiveAsync(count = 0) {
  console.log("count is", count);
  return new Promise((resolve) =>
    setTimeout(async () => {
      await recursiveAsync(count + 1);
      resolve();
    }, 500)
  );
}

async function main() {
  console.log("start");
  await recursiveAsync();
  console.log("end");
}

main();
