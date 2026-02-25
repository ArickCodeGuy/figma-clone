import { CanvasPosition } from '../CanvasPosition';
import { ScetchCanvasState } from '../ScetchCanvasState';
import { BaseScetchItem } from './BaseScetchItem';

export class Line implements BaseScetchItem {
  public type = 'Line';
  public hidden = false;
  public start = new CanvasPosition();
  public vector = new CanvasPosition(1, 1);
  public fillColor = 'black';

  constructor(x?: number, y?: number, w?: number, h?: number) {
    if (x) this.start.x = x;
    if (y) this.start.y = y;
    if (w) this.vector.x = w;
    if (h) this.vector.y = h;
  }

  public toJSON() {
    return '';
  }

  public fromJSON(str: string) {
    return new Line();
  }

  public isVisible(state: ScetchCanvasState): boolean {
    return false;
  }
  public draw(ctx: CanvasRenderingContext2D, state: ScetchCanvasState): void {
    ctx.beginPath();
    ctx.fillStyle = this.fillColor;
    ctx.moveTo(this.start.x, this.start.y);
    ctx.lineTo(this.start.x + this.vector.x, this.start.y + this.vector.y);
    ctx.stroke();
  }
}
