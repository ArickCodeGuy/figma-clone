import { CanvasPosition } from '../../CanvasPosition';
import { ScetchCanvasState } from '../../ScetchCanvasState';
import { Circle } from '../../ScetchItems/Circle';
import { clientPositionToCanvasPosition } from '../../utils/clientPositionToCanvasPosition';
import { DefaultHandState } from '../DefaultHandState';
import { HandState } from '../HandState';

export class CircleHandState implements HandState {
  public name = 'CircleHandState';
  private circle = new Circle(0, 0, 0);
  private isCirclePlaced = false;

  constructor() {}

  public onMouseDown(e: MouseEvent, state: ScetchCanvasState): void {
    switch (this.isCirclePlaced) {
      case false:
        this.placeCircle(e, state);
        break;
      case true:
        this.finish(e, state);
        break;
    }
  }

  public onMouseMove(e: MouseEvent, state: ScetchCanvasState): void {
    const x = e.clientX - this.circle.position.x;
    const y = e.clientY - this.circle.position.y;
    const radius = Math.sqrt(x * x + y * y);

    // a ^ 2 + b ^ 2 = c ^ 2;
    this.circle.radius = radius;
  }

  public onMouseUp(e: MouseEvent, state: ScetchCanvasState): void {}
  public onMouseClick(e: MouseEvent, state: ScetchCanvasState): void {}

  private placeCircle(e: MouseEvent, state: ScetchCanvasState): void {
    this.circle.position = clientPositionToCanvasPosition(
      new CanvasPosition(e.clientX, e.clientY),
      state
    );
    this.circle.radius = 0;

    state.root.children.push(this.circle);
    this.isCirclePlaced = true;
  }

  private finish(e: MouseEvent, state: ScetchCanvasState): void {
    state.handState = new DefaultHandState();
  }
}
