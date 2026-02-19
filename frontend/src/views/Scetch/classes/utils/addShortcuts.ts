import { CircleHandState } from '../HandState/Figures/CircleHandState';
import { SquareHandState } from '../HandState/Figures/SquareHandState';
import { ScetchCanvasState } from '../ScetchCanvasState';

export function addShortcuts(state: ScetchCanvasState): () => void {
  function handleKeyDown(e: KeyboardEvent): void {
    if (e.code === 'Digit1') {
      state.handState = new CircleHandState();
    }
    if (e.code === 'Digit2') {
      state.handState = new SquareHandState();
    }
  }

  document.addEventListener('keydown', handleKeyDown);

  return () => {
    document.removeEventListener('keydown', handleKeyDown);
  };
}
