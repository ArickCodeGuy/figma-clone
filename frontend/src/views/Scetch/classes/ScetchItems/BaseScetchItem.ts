import { ScetchCanvasState } from '../ScetchCanvasState';

export interface BaseScetchItem {
  type: string;
  hidden: boolean;

  isVisible: (state: ScetchCanvasState) => boolean;
  draw: (ctx: CanvasRenderingContext2D, state: ScetchCanvasState) => void;

  // Every figure can be chosen. Thus we need to outline that
  getOutlineFigure: () => BaseScetchItem;

  toJSON: () => string;
  fromJSON: (str: string) => BaseScetchItem;
}
