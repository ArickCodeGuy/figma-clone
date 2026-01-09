import { ScetchCanvasState } from './classes/ScetchCanvasState';

export function addListeners(
  canvas: HTMLCanvasElement,
  state: ScetchCanvasState
): () => void {
  function handleMouseMove(e: MouseEvent) {
    state.handState.onMouseMove(e, state);

    const dy = e.clientY,
      dx = e.clientX;
  }

  function handleMouseUp(e: MouseEvent) {
    state.handState.onMouseUp(e, state);

    document.removeEventListener('mousemove', handleMouseMove);
  }

  function handleMouseDown(e: MouseEvent) {
    state.handState.onMouseDown(e, state);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }

  canvas.addEventListener('mousedown', handleMouseDown);

  return () => {
    canvas.removeEventListener('mousedown', handleMouseDown);
  };
}
