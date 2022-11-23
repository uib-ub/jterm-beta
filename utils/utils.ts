export function intersectUnique(a: any[], b: any[]) {
  var setA = new Set(a);
  var setB = new Set(b);
  var intersection = new Set([...setA].filter((x) => setB.has(x)));
  return Array.from(intersection);
}

export function sum(numbers: number[]) {
  return numbers.reduce((a, b) => a + b, 0);
}
