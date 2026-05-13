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
});
