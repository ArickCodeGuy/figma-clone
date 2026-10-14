import { Base } from './base';
import { Point } from './point';
import { CircleShape } from './shapes/circleShape';
import { LineShape } from './shapes/lineShape';
import { RectangleShape } from './shapes/rectangleShape';

export function getShapeOrigin(shape: Base): Point {
  if (shape instanceof CircleShape) {
    return new Point(shape.position.x, shape.position.y);
  }

  if (shape instanceof LineShape) {
    return new Point(shape.position.x, shape.position.y);
  }

  if (shape instanceof RectangleShape) {
    return new Point(shape.position.x, shape.position.y);
  }

  throw new Error(
    'getShapeOrigin: Trying to get shape origin of not supported shape.',
  );
}
