const array = [
  { name: "asparagus", type: "vegetables", quantity: 5 },
  { name: "bananas", type: "fruit", quantity: 0 },
  { name: "goat", type: "meat", quantity: 23 },
  { name: "cherries", type: "fruit", quantity: 5 },
  { name: "fish", type: "meat", quantity: 22 },
];

const groupByTS = <T extends Record<string, any>>(
  iterables: T[],
  callback: (iter: T) => string
) => {
  const map = new Map<ReturnType<typeof callback>, T[]>();
  for (const iter of iterables) {
    const newKey = callback(iter);
    if (!map.has(newKey)) {
      map.set(newKey, []);
    }
    map.get(newKey)!.push(iter);
  }
  return Object.fromEntries(map); //  return map; 처럼 그냥 사용해도 괜찮을듯.
};

const result1 = groupByTS(array, (iter) => iter.type);
console.log(result1);
