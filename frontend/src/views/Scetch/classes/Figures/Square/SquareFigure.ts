import { CanvasPosition } from '../../CanvasPosition';
import { ScetchCanvasState } from '../../ScetchCanvasState';
import { BaseFigure } from '../Base/BaseFigure';
import { SquareFigureComponent } from './SquareFigureComponent';
import { SquareHandState } from './SquareHandState';

export class SquareFigure implements BaseFigure {
  public type = 'Square';
  public name = 'New Square';
  public hidden = false;
  public position = new CanvasPosition();
  public size = new CanvasPosition();
  public fillColor = 'black';
  // public hollow = false;
  getOutlineFigure = () => new SquareFigure();
  component = SquareFigureComponent;
  handState = new SquareHandState();

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
    ctx.fill();
    ctx.stroke();
  }
}
