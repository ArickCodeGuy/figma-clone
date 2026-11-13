import { LineShape, Point } from '../FileSystem';
import { SketchCanvasState } from '../SketchCanvasState';
import { mouseEventToCanvasPosition } from '../utils/mouseEventToCanvasPosition';
import { BaseHandState, BaseHandStateStatic } from './baseHandState';

/**
 * Places a new line:
 * first mousedown sets the start, the line follows the mouse, second mousedown sets the end
 */
export class LinePlacerHandState extends BaseHandState {
  static readonly type = 'LinePlacerHandState';
  private line = new LineShape('New Line', new Point(), new Point(), '#000000');
  private isPlaced = false;

  constructor() {
    super();
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

    // `vector` is relative to the start, `endpoint` = position + vector
    this.line.vector = Point.diff(this.line.position, position);
  }

  private place(e: MouseEvent, state: SketchCanvasState): void {
    this.line.position = mouseEventToCanvasPosition(e, state);
    this.line.vector = new Point();

    state.sketch.root.children.push(this.line);
    this.isPlaced = true;
  }

  private finish(e: MouseEvent, state: SketchCanvasState): void {
    // A click without moving leaves a zero length line nobody can see or select
    if (this.line.vector.x === 0 && this.line.vector.y === 0) {
      state.sketch.root.remove(this.line);
    }

    state.handState = new BaseHandState();
  }
}

LinePlacerHandState satisfies BaseHandStateStatic<LinePlacerHandState>;
