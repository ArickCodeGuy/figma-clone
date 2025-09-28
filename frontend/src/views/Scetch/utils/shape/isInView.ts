import type { ScetchCanvasState } from '../../types';

/**
 * Use before drawing to know if shape is in viewport
 */
export function isInView(
  ctx: CanvasRenderingContext2D,
  state: ScetchCanvasState
): boolean {
  return false;
}
