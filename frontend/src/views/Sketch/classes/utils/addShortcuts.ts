import { CirclePlacerHandState } from '../handStates/circlePlacerHandState';
import { RectanglePlacerHandState } from '../handStates/rectanglePlacerHandState';
import { SketchCanvasState } from '../SketchCanvasState';

/** Typing into a field (e.g. the figure edit panel) should not trigger canvas shortcuts */
function isTypingInField(e: KeyboardEvent): boolean {
  const target = e.target;
  if (!(target instanceof HTMLElement)) return false;

  return (
    target.isContentEditable ||
    ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)
  );
}

export function addShortcuts(state: SketchCanvasState): () => void {
  function handleKeyDown(e: KeyboardEvent): void {
    // Ctrl + S (Cmd + S on macOS) works everywhere, also while typing.
    // `code` instead of `key`, so it also works with non-latin keyboard layouts
    if ((e.ctrlKey || e.metaKey) && e.code === 'KeyS') {
      e.preventDefault(); // Browser "Save page" dialog
      state.save();
      return;
    }

    if (isTypingInField(e)) return;

    if (e.code === 'Delete') {
      state.deleteSelectedFigure();
      return;
    }
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
