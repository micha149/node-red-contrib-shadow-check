import { describe, expect, it } from "vitest";
import * as v from "valibot";
import { configSchema } from "./config-schema";

const validConfig = {
  width: "120",
  height: "140",
  azimuth: "180",
  inset: "10",
  overhang: "60",
  overhangOffsetLeft: "40",
  overhangOffsetRight: "50",
  overhangOffsetTop: "30",
};

describe("configSchema", () => {
  it("normalizes Node-RED string config values to numbers", () => {
    expect(v.parse(configSchema, validConfig)).toEqual({
      topic: "sunInWindow",
      width: 120,
      height: 140,
      azimuth: 180,
      inset: 10,
      overhang: 60,
      overhangOffsetLeft: 40,
      overhangOffsetRight: 50,
      overhangOffsetTop: 30,
    });
  });

  it("accepts numeric config values", () => {
    expect(
      v.parse(configSchema, {
        ...validConfig,
        width: 120,
        topic: "customTopic",
      }),
    ).toMatchObject({
      topic: "customTopic",
      width: 120,
    });
  });

  it("rejects non-numeric config values", () => {
    expect(() =>
      v.parse(configSchema, {
        ...validConfig,
        width: "wide",
      }),
    ).toThrow();
  });

  it.each(["width", "height"])(
    "rejects a non-positive %s",
    (field) => {
      expect(() =>
        v.parse(configSchema, { ...validConfig, [field]: "0" }),
      ).toThrow();
      expect(() =>
        v.parse(configSchema, { ...validConfig, [field]: "-10" }),
      ).toThrow();
    },
  );

  it.each([
    "inset",
    "overhang",
    "overhangOffsetLeft",
    "overhangOffsetRight",
    "overhangOffsetTop",
  ])("rejects a negative %s", (field) => {
    expect(() =>
      v.parse(configSchema, { ...validConfig, [field]: "-1" }),
    ).toThrow();
  });

  it("accepts a zero distance value", () => {
    expect(
      v.parse(configSchema, { ...validConfig, inset: "0" }),
    ).toMatchObject({ inset: 0 });
  });

  it("rejects an azimuth outside 0..360 degrees", () => {
    expect(() =>
      v.parse(configSchema, { ...validConfig, azimuth: "-1" }),
    ).toThrow();
    expect(() =>
      v.parse(configSchema, { ...validConfig, azimuth: "361" }),
    ).toThrow();
  });

  it("accepts the azimuth range boundaries", () => {
    expect(
      v.parse(configSchema, { ...validConfig, azimuth: "0" }),
    ).toMatchObject({ azimuth: 0 });
    expect(
      v.parse(configSchema, { ...validConfig, azimuth: "360" }),
    ).toMatchObject({ azimuth: 360 });
  });
});
