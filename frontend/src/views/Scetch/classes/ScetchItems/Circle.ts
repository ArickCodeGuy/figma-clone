import { CanvasPosition } from '../CanvasPosition';
import { ScetchCanvasState } from '../ScetchCanvasState';
import { BaseScetchItem } from './BaseScetchItem';

export class Circle implements BaseScetchItem {
  public type = 'Circle';
  public hidden = false;
  public position = new CanvasPosition();
  public radius: number = 1;
  public fillColor = 'black';

  constructor(x?: number, y?: number, radius?: number) {
    if (x) this.position.x = x;
    if (y) this.position.y = y;
    if (radius) this.radius = radius;
  }

  public toJSON() {
    return '';
  }

  public fromJSON(str: string) {
    return new Circle();
  }

  public isVisible(state: ScetchCanvasState): boolean {
    return false;
  }

  public draw(ctx: CanvasRenderingContext2D, state: ScetchCanvasState): void {
    ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.fillColor;
    ctx.fill();
  }
}
