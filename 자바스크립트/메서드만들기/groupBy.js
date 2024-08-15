const inventory = [
  { name: "asparagus", type: "vegetables", quantity: 5 },
  { name: "bananas", type: "fruit", quantity: 0 },
  { name: "goat", type: "meat", quantity: 23 },
  { name: "cherries", type: "fruit", quantity: 5 },
  { name: "fish", type: "meat", quantity: 22 },
];

const groupBy = (iterable, key) => {
  const result = new Map();

  for (let iter of iterable) {
    const mapKey = iter[key]; // iter[key]가 없는 key일 수도 있음.
    if (result.get(mapKey) === undefined) {
      result.set(mapKey, []);
    }
    const list = result.get(mapKey);
    list.push(iter);
  }

  return result;
};

console.log(groupBy(inventory, "type"));
// Map(3) {
//   'vegetables' => [ { name: 'asparagus', type: 'vegetables', quantity: 5 } ],
//   'fruit' => [
//     { name: 'bananas', type: 'fruit', quantity: 0 },
//     { name: 'cherries', type: 'fruit', quantity: 5 }
//   ],
//   'meat' => [
//     { name: 'goat', type: 'meat', quantity: 23 },
//     { name: 'fish', type: 'meat', quantity: 22 }
//   ]
// }

const groupByFunc = (iterable, callback) => {
  const result = new Map();

  for (let iter of iterable) {
    const mapKey = callback(iter);
    if (!result.get(mapKey)) {
      result.set(mapKey, []);
    }
    result.get(mapKey).push(iter);
  }

  return result;
};

console.log(
  groupByFunc(inventory, ({ quantity }) =>
    quantity <= 5 ? "restock" : "sufficient"
  )
);
// Map(2) {
//   'restock' => [
//     { name: 'asparagus', type: 'vegetables', quantity: 5 },
//     { name: 'bananas', type: 'fruit', quantity: 0 },
//     { name: 'cherries', type: 'fruit', quantity: 5 }
//   ],
//   'sufficient' => [
//     { name: 'goat', type: 'meat', quantity: 23 },
//     { name: 'fish', type: 'meat', quantity: 22 }
//   ]
// }
