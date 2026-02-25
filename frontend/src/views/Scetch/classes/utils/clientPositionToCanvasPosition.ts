import { CanvasPosition } from '../CanvasPosition';
import { ScetchCanvasState } from '../ScetchCanvasState';
import { DOMPointToCanvasPositionAdapter } from './DOMPointToCanvasPositionAdapter';

export function clientPositionToCanvasPosition(
  position: CanvasPosition,
  state: ScetchCanvasState,
): CanvasPosition {
  // Get current transform matrix
  const transform = state.ctx.getTransform();
  // Invert it
  const inverted = transform.invertSelf();
  // Convert point
  const point = new DOMPoint(position.x, position.y).matrixTransform(inverted);

  return DOMPointToCanvasPositionAdapter(point);
}
