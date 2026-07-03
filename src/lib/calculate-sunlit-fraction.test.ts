import { describe, expect, it } from "vitest";
import {
  SUNLIT_THRESHOLD,
  calculateSunlitFraction,
  isWindowSunlit,
} from "./calculate-sunlit-fraction";

describe("calculateSunlitFraction", () => {
  it("returns 0 when the window is fully covered by the shadow polygon", () => {
    expect(
      calculateSunlitFraction(2, 2, {
        shadowShape: [
          [-2, 2],
          [2, 2],
          [2, -2],
          [-2, -2],
        ],
      }),
    ).toBe(0);
  });

  it("returns 1 when the shadow polygon does not overlap the window", () => {
    expect(
      calculateSunlitFraction(2, 2, {
        shadowShape: [
          [10, 12],
          [12, 12],
          [12, 10],
          [10, 10],
        ],
      }),
    ).toBe(1);
  });

  it("returns the uncovered fraction when the window is half covered", () => {
    // Shadow covers the left half (x from -1 to 0) of a 2x2 window.
    expect(
      calculateSunlitFraction(2, 2, {
        shadowShape: [
          [-1, 1],
          [0, 1],
          [0, -1],
          [-1, -1],
        ],
      }),
    ).toBeCloseTo(0.5);
  });

  it("clips a sheared parallelogram shadow with slanted edges", () => {
    // Real overhang shadows are sheared parallelograms, not axis-aligned
    // rectangles. This one has two diagonal edges crossing the 2x2 window.
    // Its intersection with the window has area 3, so 1/4 stays sunlit.
    const fraction = calculateSunlitFraction(2, 2, {
      shadowShape: [
        [-2, -1],
        [0, -1],
        [1, 1],
        [-1, 1],
      ],
    });

    expect(fraction).toBeCloseTo(0.25);
  });

  it("returns 0 when the window has zero area", () => {
    expect(
      calculateSunlitFraction(0, 2, {
        shadowShape: [
          [10, 12],
          [12, 12],
          [12, 10],
          [10, 10],
        ],
      }),
    ).toBe(0);
  });

  it("stays near 0 when only a thin sliver at an edge is lit", () => {
    // Regression: the old 4-corner test flipped to 'sunlit' for an infinitesimal
    // corner sliver. A 0.02 wide lit strip on a 262 wide window is ~0.01%.
    const width = 262;
    const height = 128;
    const fraction = calculateSunlitFraction(width, height, {
      shadowShape: [
        [-800, height / 2 + 40],
        [width / 2 - 0.02, height / 2 + 40],
        [width / 2 - 0.02, -height / 2 - 40],
        [-800, -height / 2 - 40],
      ],
    });

    expect(fraction).toBeGreaterThan(0);
    expect(fraction).toBeLessThan(0.001);
  });

  it("treats a missing shadow as fully shaded (not sunlit)", () => {
    expect(
      calculateSunlitFraction(2, 2, {
        shadowShape: null,
      }),
    ).toBe(0);
  });

  it("works regardless of shadow polygon winding order", () => {
    const clockwise = calculateSunlitFraction(2, 2, {
      shadowShape: [
        [-1, 1],
        [0, 1],
        [0, -1],
        [-1, -1],
      ],
    });
    const counterClockwise = calculateSunlitFraction(2, 2, {
      shadowShape: [
        [-1, -1],
        [0, -1],
        [0, 1],
        [-1, 1],
      ],
    });

    expect(clockwise).toBeCloseTo(0.5);
    expect(counterClockwise).toBeCloseTo(0.5);
  });
});

describe("isWindowSunlit", () => {
  it("reports not sunlit when the fraction is exactly at the threshold", () => {
    expect(isWindowSunlit(SUNLIT_THRESHOLD)).toBe(false);
  });

  it("reports not sunlit for a fraction just below the threshold", () => {
    expect(isWindowSunlit(SUNLIT_THRESHOLD - 1e-6)).toBe(false);
  });

  it("reports sunlit for a fraction just above the threshold", () => {
    expect(isWindowSunlit(SUNLIT_THRESHOLD + 1e-6)).toBe(true);
  });

  it("treats a razor thin lit sliver below the threshold as not sunlit", () => {
    expect(isWindowSunlit(0)).toBe(false);
    expect(isWindowSunlit(0.0001)).toBe(false);
  });

  it("reports a fully lit window as sunlit", () => {
    expect(isWindowSunlit(1)).toBe(true);
  });
});
