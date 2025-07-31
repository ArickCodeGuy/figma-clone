import type { ScetchCanvasState } from './types';

export function createScetchCanvasState(): ScetchCanvasState {
  return {
    position: [0, 0],
    windowSize: [window.innerWidth, window.innerHeight],
    layout: [],
    shapes: new Map(),
  };
}

export function initCanvas(el: HTMLCanvasElement): ScetchCanvasState {
  el.style.width = '100%';
  el.style.height = '100%';

  const state: ScetchCanvasState = createScetchCanvasState();

  const ctx = el.getContext('2d');

  return state;
}
