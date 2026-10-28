import { CircleShape, Point } from '../FileSystem';
import { SketchCanvasState } from '../SketchCanvasState';
import { mouseEventToCanvasPosition } from '../utils/mouseEventToCanvasPosition';
import { BaseHandState, BaseHandStateStatic } from './baseHandState';

export class CirclePlacerHandState extends BaseHandState {
  static readonly type = 'CirclePlacerHandState';
  private circle = new CircleShape(
    'New Circle',
    new Point(),
    0,
    '#000000',
    '#000000',
  );
  private isPlaced = false;

  constructor() {
    super();
  }

  public onWheel(e: WheelEvent, state: SketchCanvasState): void {
    this.onWheel(e, state);
  }

  public onMouseDown(e: MouseEvent, state: SketchCanvasState): void {
    switch (this.isPlaced) {
      case false:
        this.place(e, state);
        break;
      case true:
        this.finish(e, state);
        break;
    }
  }

  public onMouseMove(e: MouseEvent, state: SketchCanvasState): void {
    if (!this.isPlaced) return;
    const position = mouseEventToCanvasPosition(e, state);

    const x = position.x - this.circle.position.x;
    const y = position.y - this.circle.position.y;
    const radius = Math.sqrt(x * x + y * y);

    // a ^ 2 + b ^ 2 = c ^ 2;
    this.circle.radius = radius;
  }

  // public onMouseUp(e: MouseEvent, state: SketchCanvasState): void {}
  // public onMouseClick(e: MouseEvent, state: SketchCanvasState): void {}

  private place(e: MouseEvent, state: SketchCanvasState): void {
    this.circle.position = mouseEventToCanvasPosition(e, state);

    state.sketch.root.children.push(this.circle);
    this.isPlaced = true;
  }

  private finish(e: MouseEvent, state: SketchCanvasState): void {
    state.handState = new BaseHandState();
  }
}

CirclePlacerHandState satisfies BaseHandStateStatic<CirclePlacerHandState>;
