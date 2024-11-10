/**
 * Promise.all을 사용하는 경우, 한번에 모든 Promise를 처리하므로, mutex를 걸어준다.
 * 혹은 forEach, map 대신 reduce를 사용하거나, for문 사용해도 가능하다.
 */

class Mutex {
  constructor() {
    this._isLocked = false;
  }

  lock() {
    this._isLocked = true;
  }

  unlock() {
    this._isLocked = false;
  }

  release() {
    this.unlock();
  }

  async acquire(count = 0) {
    if (count >= 10) throw new Error("Mutex lock count exceeded");

    const isLocked = this._isLocked;
    if (!isLocked) {
      this.lock();
      return Promise.resolve();
    } else {
      return new Promise((resolve) => {
        setTimeout(() => {
          this.acquire(count + 1).then(resolve);
        }, 100);
      });
    }
  }
}

let sum = 0;
const mutex = new Mutex();

const wait = () =>
  new Promise((resolve) => setTimeout(resolve, Math.random() * 50));

async function add(order) {
  await mutex.acquire();
  console.log(`[${order}] start`);

  await wait(); // async logic
  sum += 1;

  console.log(`[${order}] end`);
  mutex.release();
}

async function main() {
  console.log("start");
  await Promise.all([add(1), add(2), add(3)]);
  console.log("end");
}

main();
