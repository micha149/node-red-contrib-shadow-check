type Point2D = [number, number];

type Shadow = {
  shadowShape: Point2D[] | null;
};

const pointInPolygon = ([x, y]: Point2D, polygon: Point2D[]): boolean => {
  let inside = false;

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i, i += 1) {
    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];
    const intersects =
      yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;

    if (intersects) {
      inside = !inside;
    }
  }

  return inside;
};

export const checkIfWindowInShadow = (
  width: number,
  height: number,
  { shadowShape }: Shadow,
): boolean => {
  const bottom = -height / 2;
  const left = -width / 2;
  const right = width / 2;
  const top = height / 2;

  if (!shadowShape) {
    return true;
  }

  return (
    pointInPolygon([left, top], shadowShape) &&
    pointInPolygon([right, top], shadowShape) &&
    pointInPolygon([right, bottom], shadowShape) &&
    pointInPolygon([left, bottom], shadowShape)
  );
};
