import { CircleHandState } from '../HandState/Figures/CircleHandState';
import { ScetchCanvasState } from '../ScetchCanvasState';

export function addShortcuts(state: ScetchCanvasState): () => void {
  function handleKeyDown(e: KeyboardEvent): void {
    if (e.code === 'Digit1') {
      state.handState = new CircleHandState();
    }
  }

  document.addEventListener('keydown', handleKeyDown);

  return () => {
    document.removeEventListener('keydown', handleKeyDown);
  };
}
