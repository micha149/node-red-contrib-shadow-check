import { describe, expect, it } from "vitest";
import * as v from "valibot";
import { createSunPositionSchema, payloadSchema } from "./payload-schema";

describe("payloadSchema", () => {
  it("validates numeric sun position payloads", () => {
    expect(
      v.parse(payloadSchema, {
        azimuth: 180,
        altitude: 45,
        sunInSky: false,
      }),
    ).toEqual({
      azimuth: 180,
      altitude: 45,
      sunInSky: false,
    });
  });

  it("defaults sunInSky to true", () => {
    expect(
      v.parse(payloadSchema, {
        azimuth: 180,
        altitude: 45,
      }),
    ).toEqual({
      azimuth: 180,
      altitude: 45,
      sunInSky: true,
    });
  });

  it("rejects string based angle values", () => {
    expect(() =>
      v.parse(payloadSchema, {
        azimuth: "180",
        altitude: 45,
      }),
    ).toThrow();
  });
});

describe("createSunPositionSchema", () => {
  it("transforms payload angles to radians relative to the window azimuth", () => {
    const sunPosition = v.parse(createSunPositionSchema(90), {
      azimuth: 180,
      altitude: 45,
    });

    expect(sunPosition.phi).toBeCloseTo(Math.PI / 2);
    expect(sunPosition.theta).toBeCloseTo(Math.PI / 4);
    expect(sunPosition.sunInSky).toBe(true);
  });
});
