import { CanvasPosition } from '../CanvasPosition';
import { ScetchCanvasState } from '../ScetchCanvasState';

export function getTransformMatrix(state: ScetchCanvasState): CanvasPosition[] {
  // @@TODO update when have transform, scale
  return [new CanvasPosition(0, 1), new CanvasPosition(1, 0)];
}
