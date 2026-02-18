import { CanvasPosition } from '../CanvasPosition';
import { ScetchCanvasState } from '../ScetchCanvasState';
import { applyTransform } from './applyTransform';

export function clientPositionToCanvasPosition(
  position: CanvasPosition,
  state: ScetchCanvasState,
): CanvasPosition {
  return applyTransform(position, state.transform);
}
