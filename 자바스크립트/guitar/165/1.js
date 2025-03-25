function Wrapper2(num) {
  this._num = num;
}
Wrapper2.prototype.value = function Hello() {
  return this._num;
};

class Wrapper {
  constructor(value) {
    this.value = () => {
      return value;
    };
  }
}

const arr = [4, 2];
const brr = arr.map((e) => new Wrapper2(e));

console.log(brr[0].value()); // 4
console.log(brr[1].value()); // 2
console.log(brr[0].value === brr[1].value); // true
console.log(brr[0].hasOwnProperty("value")); // false
console.log(brr[1].hasOwnProperty("value")); // false
