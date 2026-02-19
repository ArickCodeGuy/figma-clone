import { CanvasPosition } from '../CanvasPosition';
import { ScetchCanvasState } from '../ScetchCanvasState';
import { BaseScetchItem } from './BaseScetchItem';

export class Square implements BaseScetchItem {
  public type = 'Square';
  public hidden = false;
  public position = new CanvasPosition();
  public size = new CanvasPosition();
  public fillColor = 'black';

  constructor(x?: number, y?: number, w?: number, h?: number) {
    if (x) this.position.x = x;
    if (y) this.position.y = y;
    if (w) this.size.x = w;
    if (h) this.size.y = h;
  }

  public toJSON() {
    return JSON.stringify({
      hidden: this.hidden,
      position: this.position.toString(),
      size: this.size.toString(),
      fillColor: this.fillColor,
    });
  }
  public fromJSON(str: string) {
    return new Square();
  }
  public isVisible(state: ScetchCanvasState): boolean {
    return false;
  }
  public draw(ctx: CanvasRenderingContext2D, state: ScetchCanvasState): void {
    ctx.beginPath();
    ctx.rect(this.position.x, this.position.y, this.size.x, this.size.y);
    ctx.fillStyle = this.fillColor;
    ctx.fill();
    ctx.stroke();
  }
}
