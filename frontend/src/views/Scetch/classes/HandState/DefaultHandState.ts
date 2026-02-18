import { Matrix } from '../../../../classes/Matrix';
import { CanvasPosition } from '../CanvasPosition';
import { ScetchCanvasState } from '../ScetchCanvasState';
import { HandState } from './HandState';

export class DefaultHandState implements HandState {
  public name = 'DefaultHandState';
  private isMouseDown = false;
  private mouseDownPosition = new CanvasPosition();
  private originalTranslation = new Matrix(3, 3);

  constructor() {}

  public onMouseDown(e: MouseEvent, state: ScetchCanvasState): void {
    this.isMouseDown = true;
    this.mouseDownPosition = new CanvasPosition(e.clientX, e.clientY);
    this.originalTranslation = new Matrix(3, 3, state.transform.state);
  }
  public onMouseMove(e: MouseEvent, state: ScetchCanvasState): void {
    if (!this.isMouseDown) return;

    const curr = new CanvasPosition(e.clientX, e.clientY);
    // @@TODO zoom
    const diff = CanvasPosition.diff(this.mouseDownPosition, curr);

    state.transform.state[0][2] = this.originalTranslation.state[0][2] - diff.x;
    state.transform.state[1][2] = this.originalTranslation.state[1][2] - diff.y;
  }
  public onMouseUp(e: MouseEvent, state: ScetchCanvasState): void {
    this.isMouseDown = false;
  }
  public onMouseClick(e: MouseEvent, state: ScetchCanvasState): void {}
}
