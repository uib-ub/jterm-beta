import { describe, test, expect } from "vitest";
import { intersectUnique } from "../utils";

describe("intersectUnique", () => {
  test("order any[]", () => {
    expect(intersectUnique(["a", 1, "c"], ["c", 1])).toStrictEqual([
      1,
      "c",
    ]);
  });
  test("empty a", () => {
    expect(intersectUnique([], ["c", "b"])).toStrictEqual([]);
  });
});
