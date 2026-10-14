import { Point } from '../FileSystem';
import { SketchCanvasState } from '../SketchCanvasState';

export function clientPositionToPoint(
  position: Point,
  state: SketchCanvasState,
): Point {
  // Get current transform matrix
  const transform = state.ctx.getTransform();
  // Invert it
  const inverted = transform.invertSelf();
  // Convert point
  const point = new DOMPoint(position.x, position.y).matrixTransform(inverted);

  return new Point(point.x, point.y);
}
