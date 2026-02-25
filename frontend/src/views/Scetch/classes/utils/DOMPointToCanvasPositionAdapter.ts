import { CanvasPosition } from '../CanvasPosition';

export function DOMPointToCanvasPositionAdapter(
  point: DOMPoint,
): CanvasPosition {
  return new CanvasPosition(point.x, point.y);
}
