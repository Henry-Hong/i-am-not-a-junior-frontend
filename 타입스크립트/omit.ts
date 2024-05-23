/**
 * A extends B 라고하자.
 * 'A가 B를 확장한다'라고 이해하면, 직관적인것과 반대되는 결과가 나온다.
 * 일례로, true extends boolean은 true가 boolean을 확장한다는 의미인데, boolean을 확장하므로 더욱 범위가 넓어져야 할것 같지만, 사실 범위가 줄어든다.
 * 따라서, 더욱 '깊어진다'라고 이해하면 조금 더 직관적이다.
 *
 * A는 더욱 디테일하며, B는 더욱 일반화되어있다.
 *
 */

type result1 = true extends boolean ? true : false; // true

type User = {
  name: string;
  age: number;
};

type PremiumUser = {
  name: string;
  age: number;
  expiration: Date;
};

type result2 = PremiumUser extends User ? true : false; // true
