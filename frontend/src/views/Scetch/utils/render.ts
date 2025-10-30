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
): void {
  for (const shape of state.shapes.values()) {
    if (!shape.isVisible(state)) continue;

    shape.draw(ctx, state);
  }
}

export function drawAligners(
  ctx: CanvasRenderingContext2D,
  state: ScetchCanvasState
): void {
  const GAP = 100;
  let horizontal = Math.ceil(state.position[0] / GAP) * GAP;
  let vertical = Math.ceil(state.position[1] / GAP) * GAP;

  // draw horizontal lines

  // draw vertical lines
}

export function render(
  ctx: CanvasRenderingContext2D,
  state: ScetchCanvasState
): void {
  clear(ctx, state);
  drawAligners(ctx, state);
  draw(ctx, state);
}
