import { Point } from '../point';

export interface BoundingBox {
  bottomLeft: Point;
  topRight: Point;
}

/** Combines several bounding boxes into the smallest box containing all of them. */
export function unionBoundingBoxes(
  boxes: BoundingBox[],
): BoundingBox | undefined {
  if (boxes.length === 0) {
    return undefined;
  }

  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  for (const box of boxes) {
    minX = Math.min(minX, box.bottomLeft.x, box.topRight.x);
    maxX = Math.max(maxX, box.bottomLeft.x, box.topRight.x);
    minY = Math.min(minY, box.bottomLeft.y, box.topRight.y);
    maxY = Math.max(maxY, box.bottomLeft.y, box.topRight.y);
  }

  return { bottomLeft: new Point(minX, minY), topRight: new Point(maxX, maxY) };
}
