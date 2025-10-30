import { CanvasPosition, ScetchCanvasState } from '../../types';
import { BaseShape } from './BaseShape';

export class ShapeLine implements BaseShape {
  public type = 'Line';
  public start: CanvasPosition;
  public end: CanvasPosition;
  public fillColor = 'black';

  constructor(start: CanvasPosition, end: CanvasPosition) {
    this.start = start;
    this.end = end;
  }

  public isVisible(state: ScetchCanvasState): boolean {
    return false;
  }
  public draw(ctx: CanvasRenderingContext2D, state: ScetchCanvasState): void {}
}
