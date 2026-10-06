import { Point, RectangleShape } from '../FileSystem';
import { ScetchCanvasState } from '../ScetchCanvasState';
import { mouseEventToCanvasPosition } from '../utils/mouseEventToCanvasPosition';
import { BaseHandState, BaseHandStateStatic } from './BaseHandState';

export class RectanglePlacerHandState extends BaseHandState {
  public static type = 'SquarePlacerHandState';
  private square = new RectangleShape(
    'New Rectangle',
    new Point(),
    new Point(),
    'black',
    'black',
  );
  private isPlaced = false;

  constructor() {
    super();
  }

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

  private place(e: MouseEvent, state: ScetchCanvasState): void {
    this.square.position = mouseEventToCanvasPosition(e, state);
    this.square.size.x = 0;

    state.scetch.root.children.push(this.square);
    this.isPlaced = true;
  }

  private finish(e: MouseEvent, state: ScetchCanvasState): void {
    state.handState = new BaseHandState();
  }
}

RectanglePlacerHandState satisfies BaseHandStateStatic<RectanglePlacerHandState>;
