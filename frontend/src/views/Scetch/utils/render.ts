import type { ScetchCanvasState } from '../types';

export const CANVAS_BACKGROUND_COLLOR = 'yellow';

export function clear(
  ctx: CanvasRenderingContext2D,
  state: ScetchCanvasState
): void {
  const [width, height] = state.windowSize;
  ctx.clearRect(0, 0, width, height);
}

export function draw(
  ctx: CanvasRenderingContext2D,
  state: ScetchCanvasState
): void {}

export function render(
  ctx: CanvasRenderingContext2D,
  state: ScetchCanvasState
): void {
  clear(ctx, state);
  draw(ctx, state);
}
