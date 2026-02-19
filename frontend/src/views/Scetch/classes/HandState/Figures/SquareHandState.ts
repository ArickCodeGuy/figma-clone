import { ScetchCanvasState } from '../../ScetchCanvasState';
import { Square } from '../../ScetchItems/Square';
import { DefaultHandState } from '../DefaultHandState';
import { HandState } from '../HandState';
import { mouseEventToCanvasPosition } from '../../utils/mouseEventToCanvasPosition';

export class SquareHandState implements HandState {
  public name = 'SquareHandState';
  private square = new Square();
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

    this.square.size.x = position.x - this.square.position.x;
    this.square.size.y = position.y - this.square.position.y;
  }

  public onMouseUp(e: MouseEvent, state: ScetchCanvasState): void {}
  public onMouseClick(e: MouseEvent, state: ScetchCanvasState): void {}

  private place(e: MouseEvent, state: ScetchCanvasState): void {
    this.square.position = mouseEventToCanvasPosition(e, state);
    this.square.size.x = 0;

    state.root.children.push(this.square);
    this.isPlaced = true;
  }

  private finish(e: MouseEvent, state: ScetchCanvasState): void {
    state.handState = new DefaultHandState();
  }
}
