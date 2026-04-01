import { CanvasPosition } from '../../CanvasPosition';
import { ScetchCanvasState } from '../../ScetchCanvasState';
import { BaseFigure } from '../Base/BaseFigure';
import { SquareFigure } from '../Square/SquareFigure';
import { LineFigureComponent } from './LineFigureComponent';

export class LineFigure implements BaseFigure {
  public type = 'LineFigure';
  public hidden = false;
  public position = new CanvasPosition();
  public vector = new CanvasPosition(1, 1);
  public fillColor = 'black';
  public name = 'New LineFigure';
  public getOutlineFigure = () => new SquareFigure();
  public component = LineFigureComponent;

  constructor(x?: number, y?: number, w?: number, h?: number) {
    if (x) this.position.x = x;
    if (y) this.position.y = y;
    if (w) this.vector.x = w;
    if (h) this.vector.y = h;
  }

  public toJSON() {
    return '';
  }

  public fromJSON(str: string) {
    return new LineFigure();
  }

  public isVisible(state: ScetchCanvasState): boolean {
    return false;
  }
  public draw(ctx: CanvasRenderingContext2D, state: ScetchCanvasState): void {
    ctx.beginPath();
    ctx.strokeStyle = this.fillColor;
    ctx.moveTo(this.position.x, this.position.y);
    ctx.lineTo(
      this.position.x + this.vector.x,
      this.position.y + this.vector.y,
    );
    ctx.stroke();
  }
  isPositionInside(position: CanvasPosition) {
    return this.getOutlineFigure().isPositionInside(position);
  }
}
