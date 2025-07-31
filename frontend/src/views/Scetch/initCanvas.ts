import type { ScetchCanvasState } from './types';

export function initCanvas(el: HTMLCanvasElement): ScetchCanvasState {
  el.style.width = '100%';
  el.style.height = '100%';

  const state: ScetchCanvasState = {
    pos: [0, 0],
    layout: [],
    objects: new Map(),
  };

  const ctx = el.getContext('2d');

  return state;
}
