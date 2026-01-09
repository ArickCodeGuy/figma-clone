import { ScetchCanvasState } from '../ScetchCanvasState';
import { Circle } from '../ScetchItems/Circle';
import { HandState } from './HandState';

export class DefaultHandState implements HandState {
  public name = 'DefaultHandState';

  constructor() {}

  public onMouseDown(e: MouseEvent, state: ScetchCanvasState): void {}
  public onMouseMove(e: MouseEvent, state: ScetchCanvasState): void {}
  public onMouseUp(e: MouseEvent, state: ScetchCanvasState): void {}
  public onMouseClick(e: MouseEvent, state: ScetchCanvasState): void {}
}
