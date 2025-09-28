import type { ScetchCanvasState } from './types';

export function addListeners(
  canvas: HTMLCanvasElement,
  state: ScetchCanvasState
): () => void {
  function handleMouseMove(e: MouseEvent) {
    const dy = e.clientY,
      dx = e.clientX;
  }

  function handleMouseUp() {
    document.removeEventListener('mousemove', handleMouseMove);
  }

  function handleMouseDown() {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }

  canvas.addEventListener('mousedown', handleMouseDown);

  return () => {
    canvas.removeEventListener('mousedown', handleMouseDown);
  };
}
