import { SearchDataEntry } from "~~/composables/states";

export function intersectUnique(a: any[], b: any[]) {
  var setA = new Set(a);
  var setB = new Set(b);
  var intersection = new Set([...setA].filter((x) => setB.has(x)));
  return Array.from(intersection);
}

export function sum(numbers: number[]) {
  return numbers.reduce((a, b) => a + b, 0);
}

/**
 * Returns real count of searchentries based on the length of their language properties.
 *
 * @param matches list of searchentries that contain languages as a list: lang: {"nb", "nny"}
 */
export function countSearchEntries(matches: SearchDataEntry[]): number {
  return sum(
    matches.map((entry) => {
      return entry.lang.length;
    })
  );
}
