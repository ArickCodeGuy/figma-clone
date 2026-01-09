import { ScetchCanvasState } from '../ScetchCanvasState';

export function addListeners(
  canvas: HTMLCanvasElement,
  state: ScetchCanvasState
): () => void {
  function handleMouseMove(e: MouseEvent) {
    state.handState.onMouseMove(e, state);
  }

  function handleMouseUp(e: MouseEvent) {
    state.handState.onMouseUp(e, state);
  }

  function handleMouseDown(e: MouseEvent) {
    state.handState.onMouseDown(e, state);
  }

  canvas.addEventListener('mousedown', handleMouseDown);
  canvas.addEventListener('mousemove', handleMouseMove);
  canvas.addEventListener('mouseup', handleMouseUp);

  return () => {
    canvas.removeEventListener('mousedown', handleMouseDown);
    canvas.removeEventListener('mousemove', handleMouseMove);
    canvas.removeEventListener('mouseup', handleMouseUp);
  };
}
