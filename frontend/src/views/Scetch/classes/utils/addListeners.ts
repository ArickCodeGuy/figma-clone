import { ScetchCanvasState } from '../ScetchCanvasState';
import { addShortcuts } from './addShortcuts';
import { mouseEventToCanvasPosition } from './mouseEventToCanvasPosition';

export function addListeners(state: ScetchCanvasState): () => void {
  function handleMouseMove(e: MouseEvent) {
    e.preventDefault();
    state.BaseHandState.onMouseMove(e, state);
  }

  function handleMouseUp(e: MouseEvent) {
    e.preventDefault();
    state.BaseHandState.onMouseUp(e, state);
  }

  function handleMouseDown(e: MouseEvent) {
    e.preventDefault();
    console.log(mouseEventToCanvasPosition(e, state));

    state.BaseHandState.onMouseDown(e, state);
  }

  function handleWheel(e: WheelEvent) {
    e.preventDefault();
    state.BaseHandState.onWheel(e, state);
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
