import { Point } from '../FileSystem';
import { SketchCanvasState } from '../SketchCanvasState';
import { clientPositionToPoint } from './clientPositionToPoint';

export function mouseEventToCanvasPosition(
  e: MouseEvent,
  state: SketchCanvasState,
): Point {
  return clientPositionToPoint(new Point(e.clientX, e.clientY), state);
}
