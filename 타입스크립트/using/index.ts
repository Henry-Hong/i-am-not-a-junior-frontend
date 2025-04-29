async function doWork() {
  // Do fake work for half a second.
  await new Promise(resolve => setTimeout(resolve, 500));
}

function loggy(id: string): AsyncDisposable {
  console.log(`Constructing ${id}`);
  return {
      async [Symbol.asyncDispose]() {
          console.log(`Disposing (async) ${id}`);
          await doWork();
      },
  }
}

async function func() {
  await using a = loggy("a");
  await using b = loggy("b");
  {
      await using c = loggy("c");
      await using d = loggy("d");
  }
  await using e = loggy("e");
  return;

  // Unreachable.
  // Never created, never disposed.
  await using f = loggy("f");
}

func();
