import { Matrix } from '../../../../classes/Matrix';
import { ScetchCanvasState } from '../ScetchCanvasState';
import { addShortcuts } from './addShortcuts';
import { mouseEventToCanvasPosition } from './mouseEventToCanvasPosition';

export function addListeners(state: ScetchCanvasState): () => void {
  function handleMouseMove(e: MouseEvent) {
    state.handState.onMouseMove(e, state);
  }

  function handleMouseUp(e: MouseEvent) {
    state.handState.onMouseUp(e, state);
  }

  function handleMouseDown(e: MouseEvent) {
    const m = mouseEventToCanvasPosition(e, state);

    console.log(m);

    state.handState.onMouseDown(e, state);
  }

  state.canvas.addEventListener('mousedown', handleMouseDown);
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);

  const removeShortcuts = addShortcuts(state);

  return () => {
    state.canvas.removeEventListener('mousedown', handleMouseDown);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    removeShortcuts();
  };
}
