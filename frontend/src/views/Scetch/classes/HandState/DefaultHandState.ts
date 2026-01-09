import { ScetchCanvasState } from '../ScetchCanvasState';
import { Circle } from '../ScetchItems/Circle';
import { HandState } from './HandState';

export class DefaultHandState implements HandState {
  public name = 'DefaultHandState';
  private isMouseDown = false;

  constructor() {}

  public onMouseDown(e: MouseEvent, state: ScetchCanvasState): void {
    this.isMouseDown = true;

    // @@TODO remove
    state.root.children.push(
      new Circle(Math.random() * 1024, Math.random() * 1024, 10)
    );
    state.draw();
  }
  public onMouseMove(e: MouseEvent, state: ScetchCanvasState): void {
    if (this.isMouseDown === false) return;
  }
  public onMouseUp(e: MouseEvent, state: ScetchCanvasState): void {
    this.isMouseDown = false;
  }
  public onMouseClick(e: MouseEvent, state: ScetchCanvasState): void {}
}
