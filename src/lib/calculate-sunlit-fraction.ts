type Point2D = [number, number];

type Shadow = {
  shadowShape: Point2D[] | null;
};

const polygonArea = (polygon: Point2D[]): number => {
  let sum = 0;

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i, i += 1) {
    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];

    sum += xj * yi - xi * yj;
  }

  return sum / 2;
};

// Clips a convex subject polygon against a single, infinite clip edge using the
// Sutherland-Hodgman algorithm. `inside` returns true for points on the kept
// side of the edge.
const clipAgainstEdge = (
  subject: Point2D[],
  inside: (point: Point2D) => boolean,
  intersect: (a: Point2D, b: Point2D) => Point2D,
): Point2D[] => {
  const output: Point2D[] = [];

  for (let i = 0, j = subject.length - 1; i < subject.length; j = i, i += 1) {
    const current = subject[i];
    const previous = subject[j];
    const currentInside = inside(current);
    const previousInside = inside(previous);

    if (currentInside) {
      if (!previousInside) {
        output.push(intersect(previous, current));
      }

      output.push(current);
    } else if (previousInside) {
      output.push(intersect(previous, current));
    }
  }

  return output;
};

// Intersection area of a convex subject polygon with a convex clip polygon.
const convexIntersectionArea = (
  subject: Point2D[],
  clip: Point2D[],
): number => {
  // Orient the clip polygon counter-clockwise so the inside test is consistent
  // regardless of the winding order produced upstream.
  const clipCcw = polygonArea(clip) < 0 ? [...clip].reverse() : clip;
  let result = subject;

  for (
    let i = 0, j = clipCcw.length - 1;
    i < clipCcw.length;
    j = i, i += 1
  ) {
    if (result.length === 0) {
      return 0;
    }

    const edgeStart = clipCcw[j];
    const edgeEnd = clipCcw[i];
    const edgeX = edgeEnd[0] - edgeStart[0];
    const edgeY = edgeEnd[1] - edgeStart[1];

    // Positive cross product == left of the edge == inside for CCW winding.
    const side = ([x, y]: Point2D): number =>
      edgeX * (y - edgeStart[1]) - edgeY * (x - edgeStart[0]);

    const inside = (point: Point2D): boolean => side(point) >= 0;

    const intersect = (a: Point2D, b: Point2D): Point2D => {
      const sideA = side(a);
      const sideB = side(b);
      const t = sideA / (sideA - sideB);

      return [a[0] + t * (b[0] - a[0]), a[1] + t * (b[1] - a[1])];
    };

    result = clipAgainstEdge(result, inside, intersect);
  }

  return Math.abs(polygonArea(result));
};

// The window counts as sunlit once more than this fraction of its area receives
// direct sun. This prevents the boolean output from flapping when only a razor
// thin sliver at a window edge is lit near the shadow boundary.
export const SUNLIT_THRESHOLD = 0.05;

// Decides whether a given sunlit fraction (0..1) means the window should be
// reported as sunlit.
export const isWindowSunlit = (sunlitFraction: number): boolean =>
  sunlitFraction > SUNLIT_THRESHOLD;

// Returns the fraction of the window (0..1) that receives direct sun, i.e. the
// area that is not covered by the overhang shadow polygon. A missing shadow
// shape means the window is fully shaded and therefore not sunlit.
export const calculateSunlitFraction = (
  width: number,
  height: number,
  { shadowShape }: Shadow,
): number => {
  if (!shadowShape) {
    return 0;
  }

  const halfWidth = width / 2;
  const halfHeight = height / 2;
  const windowArea = width * height;

  if (windowArea === 0) {
    return 0;
  }

  const window: Point2D[] = [
    [-halfWidth, -halfHeight],
    [halfWidth, -halfHeight],
    [halfWidth, halfHeight],
    [-halfWidth, halfHeight],
  ];

  const shadedArea = convexIntersectionArea(window, shadowShape);
  const sunlit = 1 - shadedArea / windowArea;

  return Math.min(1, Math.max(0, sunlit));
};
