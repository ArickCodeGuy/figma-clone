import { CirclePlacerHandState } from '../handStates/circlePlacerHandState';
import { RectanglePlacerHandState } from '../handStates/rectanglePlacerHandState';
import { ScetchCanvasState } from '../ScetchCanvasState';

export function addShortcuts(state: ScetchCanvasState): () => void {
  function handleKeyDown(e: KeyboardEvent): void {
    if (e.code === 'Digit1') {
      state.handState = new CirclePlacerHandState();
    }
    if (e.code === 'Digit2') {
      state.handState = new RectanglePlacerHandState();
    }
  }

  document.addEventListener('keydown', handleKeyDown);

  return () => {
    document.removeEventListener('keydown', handleKeyDown);
  };
}
