import { CanvasPosition } from '../../CanvasPosition';
import { ScetchCanvasState } from '../../ScetchCanvasState';
import { BaseFigure } from '../Base/BaseFigure';
import { SquareFigureComponent } from './SquareFigureComponent';
import { SquareToOutlineSquareAdapter } from './SquareToOutlineSquareAdapter';

export class SquareFigure implements BaseFigure {
  public type = 'Square';
  public name = 'New Square';
  public hidden = false;
  public position = new CanvasPosition();
  public size = new CanvasPosition();
  public fillColor = 'black';
  public hollow = false;
  public getOutlineFigure = () => SquareToOutlineSquareAdapter(this);
  public component = SquareFigureComponent;

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
  public fromJSON(str: string): BaseFigure {
    return new SquareFigure();
  }
  public isVisible(state: ScetchCanvasState): boolean {
    return false;
  }
  public draw(ctx: CanvasRenderingContext2D, state: ScetchCanvasState): void {
    ctx.beginPath();
    ctx.rect(this.position.x, this.position.y, this.size.x, this.size.y);
    ctx.fillStyle = this.fillColor;
    if (!this.hollow) ctx.fill();
    ctx.strokeStyle = this.fillColor;
    ctx.stroke();
  }

  public isPositionInside(position: CanvasPosition): boolean {
    const x = position.x,
      y = position.y;
    if (x < this.position.x) return false;
    if (y < this.position.y) return false;
    if (x > this.position.x + this.size.x) return false;
    if (y > this.position.y + this.size.y) return false;
    return true;
  }
}
