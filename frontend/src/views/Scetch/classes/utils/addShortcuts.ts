import { ScetchCanvasState } from '../ScetchCanvasState';
import { CircleHandState } from '../Figures/Circle/CircleHandState';
import { SquareHandState } from '../Figures/Square/SquareHandState';

export function addShortcuts(state: ScetchCanvasState): () => void {
  function handleKeyDown(e: KeyboardEvent): void {
    if (e.code === 'Digit1') {
      state.BaseHandState = new CircleHandState();
    }
    if (e.code === 'Digit2') {
      state.BaseHandState = new SquareHandState();
    }
  }

  document.addEventListener('keydown', handleKeyDown);

  return () => {
    document.removeEventListener('keydown', handleKeyDown);
  };
}
