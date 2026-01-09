import { CanvasPosition } from '../CanvasPosition';
import { ScetchCanvasState } from '../ScetchCanvasState';

export function clientPositionToCanvasPosition(
  pos: CanvasPosition,
  state: ScetchCanvasState
): CanvasPosition {
  // @@TODO update when have transform, scale
  return new CanvasPosition(pos.x, pos.y);
}
