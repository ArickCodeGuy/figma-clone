import { Point } from '../FileSystem';
import { ScetchCanvasState } from '../ScetchCanvasState';
import { clientPositionToPoint } from './clientPositionToPoint';

export function mouseEventToCanvasPosition(
  e: MouseEvent,
  state: ScetchCanvasState,
): Point {
  return clientPositionToPoint(new Point(e.clientX, e.clientY), state);
}
