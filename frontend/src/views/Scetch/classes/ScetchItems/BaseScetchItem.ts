import { ScetchCanvasState } from '../ScetchCanvasState';

export interface BaseScetchItem {
  type: string;
  hidden: boolean;

  isVisible: (state: ScetchCanvasState) => boolean;
  draw: (ctx: CanvasRenderingContext2D, state: ScetchCanvasState) => void;

  toJSON: () => string;
  fromJSON: (str: string) => BaseScetchItem;
}
