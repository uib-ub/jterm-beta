import { SearchDataEntry } from "~~/composables/states";

/**
 * Returns unique intersection of two Arrays, sorted by order of first.
 *
 * @remarks Uses Set.prototype.has() to check for existence.
 * @param a - Array a
 * @param b - Array b
 */
export function intersectUnique(a: any[], b: any[]): any[] {
  var setA = new Set(a);
  var setB = new Set(b);
  var intersection = new Set([...setA].filter((x) => setB.has(x)));
  return Array.from(intersection);
}

export function sum(numbers: number[]): number {
  return numbers.reduce((a, b) => a + b, 0);
}

/**
 * Returns real count of searchentries based on the length of their language properties if present.
 *
 * @param matches - list of searchentries that contain languages as a list: {lang: ["nb", "nn"]}
 */
export function countSearchEntries(matches: SearchDataEntry[]): number {
  return sum(
    matches.map((entry) => {
      try {
        return entry.lang.length;
      } catch (e) {
        return 1;
      }
    })
  );
}
