import { describe, expect, it } from "vitest";
import { checkIfWindowInShadow } from "./check-if-window-in-shadow";

describe("checkIfWindowInShadow", () => {
  it("returns true when all window corners are inside the shadow polygon", () => {
    expect(
      checkIfWindowInShadow(2, 2, {
        shadowShape: [
          [-2, 2],
          [2, 2],
          [2, -2],
          [-2, -2],
        ],
      }),
    ).toBe(true);
  });

  it("returns false when at least one window corner is outside the shadow polygon", () => {
    expect(
      checkIfWindowInShadow(4, 4, {
        shadowShape: [
          [-1, 1],
          [1, 1],
          [1, -1],
          [-1, -1],
        ],
      }),
    ).toBe(false);
  });

  it("treats a missing shadow as the window being in shadow", () => {
    expect(
      checkIfWindowInShadow(2, 2, {
        shadowShape: null,
      }),
    ).toBe(true);
  });
});
