import { CanvasPosition } from '../CanvasPosition';
import { ScetchCanvasState } from '../ScetchCanvasState';
import { applyTransform } from './applyTransform';
import { getTransformMatrix } from './getTransformMatrix';

export function clientPositionToCanvasPosition(
  position: CanvasPosition,
  state: ScetchCanvasState
): CanvasPosition {
  const matrix = getTransformMatrix(state);

  return applyTransform(position, matrix);
}
