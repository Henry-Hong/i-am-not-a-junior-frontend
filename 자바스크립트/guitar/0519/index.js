// 1. Secret
Object.defineProperty(Array.prototype, "secret", {
  get() {
    return "secret";
  },
});

// 2. Sum
Array.prototype.sum = function () {
  return this.reduce((acc, val) => acc + val, 0);
};

// 3. Factorial
Object.defineProperty(Array.prototype, "factorial", {
  get() {
    return this._factorial ?? 0;
  },
  set(val) {
    this._factorial = val;
  },
});

// 4. Factorial updates
const originalPush = Array.prototype.push;
Array.prototype.push = function (...args) {
  for (let val of args) {
    if (this.length === 0 && this.factorial === 0) {
      this.factorial = 1;
    }
    this.factorial *= val;
  }
  return originalPush.apply(this, args);
};

// 5. Reset
Array.prototype.reset = function () {
  this.length = 0;
  this.factorial = 0;
};

// 6. Foreach
const originalForeach = Array.prototype.forEach;
Array.prototype.forEach = function (callback, thisArg, skip = false) {
  if (skip) return;
  return originalForeach.call(this, callback, thisArg);
};
