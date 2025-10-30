import { CanvasPosition, ScetchCanvasState } from '../../types';
import { BaseShape } from './BaseShape';

export class ShapeSquare implements BaseShape {
  public type = 'Square';
  public position: CanvasPosition;
  public size: CanvasPosition;
  public fillColor = 'black';

  constructor(x: number, y: number, w: number, h: number) {
    this.position = [x, y];
    this.size = [w, h];
  }

  public isVisible(state: ScetchCanvasState): boolean {
    return false;
  }
  public draw(ctx: CanvasRenderingContext2D, state: ScetchCanvasState): void {}
}
