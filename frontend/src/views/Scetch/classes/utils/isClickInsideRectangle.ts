import { Point, RectangleShape } from '../FileSystem';

export function isClickInsideRectangle(
  rect: RectangleShape,
  point: Point,
): boolean {
  let x1 = rect.position.x,
    x2 = rect.position.x + rect.size.x,
    y1 = rect.position.y,
    y2 = rect.position.y + rect.size.y;

  [x1, x2, y1, y2] = [
    Math.min(x1, x2),
    Math.max(x1, x2),
    Math.min(y1, y2),
    Math.max(y1, y2),
  ];

  const x3 = point.x,
    y3 = point.y;

  return x3 >= x1 && x3 <= x2 && y3 >= y1 && y3 <= y2;
}
