import type { ScetchCanvasState } from '../types';
import { filePostorderTraversal } from './filePostorderTraversal';

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
  // In our case files are only BaseShapes
  // This function should return shapes in
  // order which we want to render them
  const ids = filePostorderTraversal(state.layout);

  for (const id of ids) {
    const item = state.shapes.get(id);
    if (!item || !item.isVisible(state)) continue;
    item.draw(ctx, state);
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
