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

export const configSchema = v.object({
  name: v.optional(v.string()),
  topic: v.optional(v.string(), DEFAULT_TOPIC),
  width: configNumberSchema,
  height: configNumberSchema,
  azimuth: configNumberSchema,
  inset: configNumberSchema,
  overhang: configNumberSchema,
  overhangOffsetLeft: configNumberSchema,
  overhangOffsetRight: configNumberSchema,
  overhangOffsetTop: configNumberSchema,
});

export type ShadowCheckNodeRawConfig = v.InferInput<typeof configSchema>;
export type ShadowCheckNodeConfig = v.InferOutput<typeof configSchema>;
