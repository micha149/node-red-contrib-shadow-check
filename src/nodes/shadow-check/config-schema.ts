import * as v from "valibot";

const DEFAULT_TOPIC = "sunInWindow";

const configNumberSchema = v.pipe(
  v.union([v.number(), v.string()]),
  v.transform((value) =>
    typeof value === "number" ? value : Number.parseFloat(value),
  ),
  v.number(),
  v.finite(),
);

// Window dimensions must have an actual area; a non-positive width or height
// would produce a degenerate window and could flip the sunlit-fraction sign.
const positiveNumberSchema = v.pipe(
  configNumberSchema,
  v.gtValue(0, "Value must be greater than 0"),
);

// Distances (recess depth, overhang extent) cannot be negative in this
// geometry model.
const nonNegativeNumberSchema = v.pipe(
  configNumberSchema,
  v.minValue(0, "Value must be 0 or greater"),
);

// Window orientation as a compass bearing in degrees (north = 0).
const azimuthSchema = v.pipe(
  configNumberSchema,
  v.minValue(0, "Azimuth must be between 0 and 360 degrees"),
  v.maxValue(360, "Azimuth must be between 0 and 360 degrees"),
);

export const configSchema = v.object({
  name: v.optional(v.string()),
  topic: v.optional(v.string(), DEFAULT_TOPIC),
  width: positiveNumberSchema,
  height: positiveNumberSchema,
  azimuth: azimuthSchema,
  inset: nonNegativeNumberSchema,
  overhang: nonNegativeNumberSchema,
  overhangOffsetLeft: nonNegativeNumberSchema,
  overhangOffsetRight: nonNegativeNumberSchema,
  overhangOffsetTop: nonNegativeNumberSchema,
});

export type ShadowCheckNodeRawConfig = v.InferInput<typeof configSchema>;
export type ShadowCheckNodeConfig = v.InferOutput<typeof configSchema>;
