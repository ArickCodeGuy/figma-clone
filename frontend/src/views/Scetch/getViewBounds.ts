import type { CanvasPosition, ScetchCanvasState } from './types';

/**
 * Returns actual view position bounds
 * With regards to zoom
 *
 * [bottomLeft, topRight]
 */
export function getViewBounds(
  state: ScetchCanvasState
): [CanvasPosition, CanvasPosition] {
  const [x, y] = state.position;
  const [w, h] = state.windowSize;

  return [
    [x, y],
    [x + w, x + h],
  ];
}
