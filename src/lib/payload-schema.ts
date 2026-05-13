import * as v from "valibot";

const degreesToRadians = (degrees: number): number => (degrees / 180) * Math.PI;

export const payloadSchema = v.object({
  azimuth: v.pipe(v.number(), v.finite()),
  altitude: v.pipe(v.number(), v.finite()),
  sunInSky: v.optional(v.boolean(), true),
});

export const createSunPositionSchema = (windowAzimuthDegrees: number) =>
  v.pipe(
    payloadSchema,
    v.transform(({ azimuth, altitude, sunInSky }) => ({
      phi: degreesToRadians(azimuth - windowAzimuthDegrees),
      theta: degreesToRadians(altitude),
      sunInSky,
    })),
  );

export type Payload = v.InferOutput<typeof payloadSchema>;
export type SunPosition = v.InferOutput<
  ReturnType<typeof createSunPositionSchema>
>;
