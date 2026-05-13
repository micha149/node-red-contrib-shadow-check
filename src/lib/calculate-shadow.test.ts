import { describe, expect, it } from "vitest";
import { calculateShadow } from "./calculate-shadow";

describe("calculateShadow", () => {
  it("calculates the shadow polygon cast onto the window plane", () => {
    const shadow = calculateShadow(1, 2, 3, 2, {
      phi: 0,
      theta: Math.PI / 4,
      sunInSky: true,
    });

    expect(shadow.shadowShape).not.toBeNull();
    expect(shadow.shadowShape?.[0]).toEqual([-2, 2]);
    expect(shadow.shadowShape?.[1]).toEqual([3, 2]);
    expect(shadow.shadowShape?.[2]?.[0]).toBe(3);
    expect(shadow.shadowShape?.[2]?.[1]).toBeCloseTo(1);
    expect(shadow.shadowShape?.[3]?.[0]).toBe(-2);
    expect(shadow.shadowShape?.[3]?.[1]).toBeCloseTo(1);
  });

  it("returns no shadow when the sun is not in the sky", () => {
    const shadow = calculateShadow(1, 2, 3, 2, {
      phi: 0,
      theta: Math.PI / 4,
      sunInSky: false,
    });

    expect(shadow.shadowShape).toBeNull();
  });
});
