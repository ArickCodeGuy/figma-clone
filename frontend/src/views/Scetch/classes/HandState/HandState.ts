import { ScetchCanvasState } from '../ScetchCanvasState';

/**
 * Interface for specifying hand behavior given `HandState`
 */
export interface HandState {
  name: string;

  onMouseDown(e: MouseEvent, state: ScetchCanvasState): void;
  onMouseMove(e: MouseEvent, state: ScetchCanvasState): void;
  onMouseUp(e: MouseEvent, state: ScetchCanvasState): void;
  onMouseClick(e: MouseEvent, state: ScetchCanvasState): void;
}
