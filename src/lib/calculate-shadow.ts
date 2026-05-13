type Point2D = [number, number];
type Vector3D = [number, number, number];

type SunPosition = {
  phi: number;
  theta: number;
  sunInSky: boolean;
};

type Shadow = SunPosition & {
  shadowShape: Point2D[] | null;
};

const negate = ([x, y, z]: Vector3D): Vector3D => [-x, -y, -z];

const intersectRayWithWindowPlane = (
  origin: Vector3D,
  direction: Vector3D,
): Vector3D | null => {
  const [, , directionZ] = direction;

  if (directionZ === 0) {
    return null;
  }

  const t = -origin[2] / directionZ;

  if (t < 0) {
    return null;
  }

  return [origin[0] + direction[0] * t, origin[1] + direction[1] * t, 0];
};

export const calculateShadow = (
  overhang: number,
  overhangOffsetLeft: number,
  overhangOffsetRight: number,
  overhangOffsetTop: number,
  sunPos: SunPosition,
): Shadow => {
  const { phi, theta, sunInSky } = sunPos;
  let shadowShape: Point2D[] | null = null;

  const sunDirection: Vector3D = [
    -Math.sin(phi) * Math.cos(theta),
    Math.sin(theta),
    -Math.cos(theta) * Math.cos(phi),
  ];

  const shadowDirection = negate(sunDirection);
  const topLeft: Vector3D = [-overhangOffsetLeft, overhangOffsetTop, -overhang];
  const bottomLeft = intersectRayWithWindowPlane(topLeft, shadowDirection);
  const topRight: Vector3D = [
    overhangOffsetRight,
    overhangOffsetTop,
    -overhang,
  ];
  const bottomRight = intersectRayWithWindowPlane(topRight, shadowDirection);

  if (sunInSky && bottomLeft && bottomRight) {
    shadowShape = [
      [topLeft[0], topLeft[1]],
      [topRight[0], topRight[1]],
      [bottomRight[0], bottomRight[1]],
      [bottomLeft[0], bottomLeft[1]],
    ];
  }

  return {
    phi,
    theta,
    sunInSky,
    shadowShape,
  };
};
