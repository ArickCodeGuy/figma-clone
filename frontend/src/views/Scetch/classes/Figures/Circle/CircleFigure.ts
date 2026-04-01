import { CanvasPosition } from '../../CanvasPosition';
import { ScetchCanvasState } from '../../ScetchCanvasState';
import { BaseFigure } from '../Base/BaseFigure';
import { BaseHandState } from '../Base/BaseHandState';
import { CircleFigureComponent } from './CircleFigureComponent';
import { CircleHandState } from './CircleHandState';
import { CircleToSquareAdapter } from './CircleToSquareAdapter';

export class CircleFigure implements BaseFigure {
  public type = 'Circle';
  public name = 'New Circle';
  public hidden = false;
  public position = new CanvasPosition();
  public radius: number = 1;
  public fillColor = 'black';
  public component = CircleFigureComponent;
  public getOutlineFigure = () => CircleToSquareAdapter(this);

  constructor(x?: number, y?: number, radius?: number) {
    if (x) this.position.x = x;
    if (y) this.position.y = y;
    if (radius) this.radius = radius;
  }

  public toJSON() {
    return JSON.stringify({
      hidden: this.hidden,
      position: this.position.toString(),
      radius: this.radius,
      fillColor: this.fillColor,
    });
  }

  public fromJSON(str: string): BaseFigure {
    return new CircleFigure();
  }

  public isVisible(state: ScetchCanvasState): boolean {
    return false;
  }

  public draw(ctx: CanvasRenderingContext2D, state: ScetchCanvasState): void {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.fillColor;
    ctx.fill();
  }
}
