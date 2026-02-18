import { CanvasPosition } from '../CanvasPosition';
import { ScetchCanvasState } from '../ScetchCanvasState';
import { clientPositionToCanvasPosition } from './clientPositionToCanvasPosition';

export function mouseEventToCanvasPosition(
  e: MouseEvent,
  state: ScetchCanvasState,
): CanvasPosition {
  return clientPositionToCanvasPosition(
    new CanvasPosition(e.clientX, e.clientY),
    state,
  );
}
