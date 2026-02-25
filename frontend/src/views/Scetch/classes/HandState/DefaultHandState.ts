import { CanvasPosition } from '../CanvasPosition';
import { ScetchCanvasState } from '../ScetchCanvasState';
import { clientPositionToCanvasPosition } from '../utils/clientPositionToCanvasPosition';
import { HandState } from './HandState';

export class DefaultHandState implements HandState {
  public name = 'DefaultHandState';
  private isMouseDown = false;
  private mouseDownPosition = new CanvasPosition();
  private originalTranslate = new CanvasPosition();

  constructor() {}

  public onWheel(e: WheelEvent, state: ScetchCanvasState): void {
    if (this.isMouseDown) return;

    const center = clientPositionToCanvasPosition(
      new CanvasPosition(state.windowSize.x / 2, state.windowSize.y / 2),
      state,
    );

    const factor = 0.01;
    const isScrollDown = e.deltaY < 0;
    const diff = 1 + factor * (isScrollDown ? 1 : -1);

    state.zoom *= diff;
    state.translate.x = center.x - (center.x - state.translate.x) * diff;
    state.translate.y = center.y - (center.y - state.translate.y) * diff;
  }

  public onMouseDown(e: MouseEvent, state: ScetchCanvasState): void {
    this.isMouseDown = true;
    this.originalTranslate = new CanvasPosition(
      state.translate.x,
      state.translate.y,
    );
    this.mouseDownPosition = new CanvasPosition(e.clientX, e.clientY);
  }
  public onMouseMove(e: MouseEvent, state: ScetchCanvasState): void {
    if (!this.isMouseDown) return;

    const curr = new CanvasPosition(e.clientX, e.clientY);
    const diff = CanvasPosition.diff(this.mouseDownPosition, curr);

    state.translate.x = this.originalTranslate.x + diff.x;
    state.translate.y = this.originalTranslate.y + diff.y;
  }
  public onMouseUp(e: MouseEvent, state: ScetchCanvasState): void {
    this.isMouseDown = false;
  }
  public onMouseClick(e: MouseEvent, state: ScetchCanvasState): void {}
}
