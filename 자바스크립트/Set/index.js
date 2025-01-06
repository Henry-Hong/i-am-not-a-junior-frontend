class SetOperations {
  constructor(set) {
    // Ensure the input is a Set to handle unique values
    this.set = new Set(set);
  }

  // Union of current set with another set
  union(otherSet) {
    return new Set([...this.set, ...otherSet]);
  }

  // Intersection of current set with another set
  intersect(otherSet) {
    return new Set([...this.set].filter((item) => otherSet.has(item)));
  }

  // Difference of current set with another set
  difference(otherSet) {
    return new Set([...this.set].filter((item) => !otherSet.has(item)));
  }

  // Symmetric difference of current set with another set
  symmetricDifference(otherSet) {
    const diff1 = [...this.set].filter((item) => !otherSet.has(item));
    const diff2 = [...otherSet].filter((item) => !this.set.has(item));
    return new Set([...diff1, ...diff2]);
  }

  // Check if the current set is a subset of another set
  isSubsetOf(otherSet) {
    return [...this.set].every((item) => otherSet.has(item));
  }

  // Check if the current set is a superset of another set
  isSupersetOf(otherSet) {
    return [...otherSet].every((item) => this.set.has(item));
  }

  // Convert the set to an array
  toArray() {
    return [...this.set];
  }
}

// Usage example
const setA = new SetOperations([1, 2, 3]);
const setB = new Set([3, 4, 5]);

console.log("Union:", setA.union(setB)); // Set { 1, 2, 3, 4, 5 }
console.log("Intersection:", setA.intersect(setB)); // Set { 3 }
console.log("Difference (A - B):", setA.difference(setB)); // Set { 1, 2 }
console.log("Symmetric Difference:", setA.symmetricDifference(setB)); // Set { 1, 2, 4, 5 }
console.log("Is Subset:", setA.isSubsetOf(setB)); // false
console.log("Is Superset:", setA.isSupersetOf(setB)); // false
