import { Base } from './base';
import { Point } from './point';
import { CircleShape } from './shapes/circleShape';
import { LineShape } from './shapes/lineShape';
import { RectangleShape } from './shapes/rectangleShape';

/** Modify in place shape position by `vector` */
export function moveShape(shape: Base, position: Point): void {
  if (shape instanceof CircleShape) {
    shape.position.x = position.x;
    shape.position.y = position.y;
    return;
  }
  if (shape instanceof LineShape) {
    shape.position.x = position.x;
    shape.position.y = position.y;
    return;
  }
  if (shape instanceof RectangleShape) {
    shape.position.x = position.x;
    shape.position.y = position.y;
    return;
  }

  throw new Error('translateShape: Trying to translate unsupported shape');
}
