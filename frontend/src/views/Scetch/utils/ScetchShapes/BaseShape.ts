import { ScetchCanvasState } from '../../types';

export interface BaseShape {
  type: string;
  isVisible: (state: ScetchCanvasState) => boolean;
  draw: (ctx: CanvasRenderingContext2D, state: ScetchCanvasState) => void;
}
