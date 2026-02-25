import { ScetchCanvasState } from '../ScetchCanvasState';
import { addShortcuts } from './addShortcuts';
import { mouseEventToCanvasPosition } from './mouseEventToCanvasPosition';

export function addListeners(state: ScetchCanvasState): () => void {
  function handleMouseMove(e: MouseEvent) {
    e.preventDefault();
    state.handState.onMouseMove(e, state);
  }

  function handleMouseUp(e: MouseEvent) {
    e.preventDefault();
    state.handState.onMouseUp(e, state);
  }

  function handleMouseDown(e: MouseEvent) {
    e.preventDefault();
    console.log(mouseEventToCanvasPosition(e, state));

    state.handState.onMouseDown(e, state);
  }

  function handleWheel(e: WheelEvent) {
    e.preventDefault();
    state.handState.onWheel(e, state);
  }

  state.canvas.addEventListener('mousedown', handleMouseDown);
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);
  document.addEventListener('wheel', handleWheel);

  const removeShortcuts = addShortcuts(state);

  return () => {
    state.canvas.removeEventListener('mousedown', handleMouseDown);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    document.addEventListener('wheel', handleWheel);
    removeShortcuts();
  };
}
