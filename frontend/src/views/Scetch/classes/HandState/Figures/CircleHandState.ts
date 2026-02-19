import { ScetchCanvasState } from '../../ScetchCanvasState';
import { Circle } from '../../ScetchItems/Circle';
import { DefaultHandState } from '../DefaultHandState';
import { HandState } from '../HandState';
import { mouseEventToCanvasPosition } from '../../utils/mouseEventToCanvasPosition';

export class CircleHandState implements HandState {
  public name = 'CircleHandState';
  private circle = new Circle(0, 0, 0);
  private isPlaced = false;

  constructor() {}

  public onMouseDown(e: MouseEvent, state: ScetchCanvasState): void {
    switch (this.isPlaced) {
      case false:
        this.place(e, state);
        break;
      case true:
        this.finish(e, state);
        break;
    }
  }

  public onMouseMove(e: MouseEvent, state: ScetchCanvasState): void {
    if (!this.isPlaced) return;
    const position = mouseEventToCanvasPosition(e, state);

    const x = position.x - this.circle.position.x;
    const y = position.y - this.circle.position.y;
    const radius = Math.sqrt(x * x + y * y);

    // a ^ 2 + b ^ 2 = c ^ 2;
    this.circle.radius = radius;
  }

  public onMouseUp(e: MouseEvent, state: ScetchCanvasState): void {}
  public onMouseClick(e: MouseEvent, state: ScetchCanvasState): void {}

  private place(e: MouseEvent, state: ScetchCanvasState): void {
    this.circle.position = mouseEventToCanvasPosition(e, state);

    state.root.children.push(this.circle);
    this.isPlaced = true;
  }

  private finish(e: MouseEvent, state: ScetchCanvasState): void {
    state.handState = new DefaultHandState();
  }
}
