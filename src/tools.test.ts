import * as t from "./tools.ts";
import { describe, expect, it } from "vitest";

describe("tools", () => {
  it("condSelect()", () => {
    const selection = t.condSelect([
      [(n: number) => n < 0, "negative"],
      [(n) => n > 0, "positive"],
    ]);

    expect(selection(1)).toBe("positive");
    expect(selection(-1)).toBe("negative");
    expect(() => selection(0)).toThrowError("Non exhaustive pattern");
  });
  it("map()", () => {
    const fn = (a: number, b: number, c: string) => `${c} = ${a + b}`;
    const result = t.map(fn, [1, 2, 3], [4, 5, 6], ["five", "seven", "nine"]);
    expect(result).toEqual(["five = 5", "seven = 7", "nine = 9"]);
  });
});
