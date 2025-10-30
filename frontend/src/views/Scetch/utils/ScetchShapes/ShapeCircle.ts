import { CanvasPosition, ScetchCanvasState } from '../../types';
import { BaseShape } from './BaseShape';

export class ShapeCircle implements BaseShape {
  public type = 'Circle';
  public position: CanvasPosition;
  public radius: number;
  public fillColor = 'black';

  constructor(position: CanvasPosition, radius: number) {
    this.position = position;
    this.radius = radius;
  }

  public isVisible(state: ScetchCanvasState): boolean {
    return false;
  }
  public draw(ctx: CanvasRenderingContext2D, state: ScetchCanvasState): void {}
}
