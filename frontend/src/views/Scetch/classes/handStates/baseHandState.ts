import { Folder, Point } from '../FileSystem';
import { getShapeOrigin } from '../FileSystem/getShapeOrigin';
import { moveShape } from '../FileSystem/moveShape';
import { ScetchCanvasState } from '../ScetchCanvasState';
import { clientPositionToPoint } from '../utils/clientPositionToPoint';
import { getClickableFigures } from '../utils/getClickableFigures';
import { isClickInsideOutline } from '../utils/isClickInsideOutline';
import { mouseEventToCanvasPosition } from '../utils/mouseEventToCanvasPosition';

/**
 * Base class for specifying hand behavior.
 *
 * Used for applying translate, zoom to `ctx`
 * Other implementation may specify behavior of adding new shapes
 */
export class BaseHandState {
  readonly type = 'BaseHandState';

  // abstract onMouseDown(e: MouseEvent, state: ScetchCanvasState): void;
  // abstract onMouseMove(e: MouseEvent, state: ScetchCanvasState): void;
  // abstract onMouseUp(e: MouseEvent, state: ScetchCanvasState): void;
  // abstract onMouseClick(e: MouseEvent, state: ScetchCanvasState): void;
  // abstract onWheel(e: WheelEvent, state: ScetchCanvasState): void;

  private isMouseDown = false;
  private isMouseDownOnSelectFigure = false;
  // When we do mousedown
  // We need to know position where we clicked on page
  // And where figure position was
  private mouseDownFigurePosition = new Point();
  private mouseDownPosition = new Point();
  private originalTranslate = new Point();

  public onWheel(e: WheelEvent, state: ScetchCanvasState): void {
    if (this.isMouseDown) return;

    const center = clientPositionToPoint(
      new Point(state.windowSize.x / 2, state.windowSize.y / 2),
      state,
    );

    const factor = 0.01;
    const isScrollDown = e.deltaY < 0;
    const diff = 1 + factor * (isScrollDown ? 1 : -1);

    state.ctxState.zoom *= diff;
    state.ctxState.translate.x =
      center.x - (center.x - state.ctxState.translate.x) * diff;
    state.ctxState.translate.y =
      center.y - (center.y - state.ctxState.translate.y) * diff;
  }

  public onMouseDown(e: MouseEvent, state: ScetchCanvasState): void {
    this.isMouseDown = true;
    this.isMouseDownOnSelectFigure = false;

    this.originalTranslate = new Point(
      state.ctxState.translate.x,
      state.ctxState.translate.y,
    );
    this.mouseDownPosition = new Point(e.clientX, e.clientY);
    if (
      state.selectedFigure &&
      isClickInsideOutline(state.selectedFigure, this.mouseDownPosition)
    ) {
      this.isMouseDownOnSelectFigure = true;
      this.mouseDownFigurePosition = getShapeOrigin(state.selectedFigure);
    }
  }

  public onMouseMove(e: MouseEvent, state: ScetchCanvasState): void {
    if (!this.isMouseDown) return;

    const curr = new Point(e.clientX, e.clientY);
    const diff = Point.diff(this.mouseDownPosition, curr);

    if (this.isMouseDownOnSelectFigure && state.selectedFigure) {
      moveShape(
        state.selectedFigure,
        new Point(
          this.mouseDownFigurePosition.x + diff.x,
          this.mouseDownFigurePosition.y + diff.y,
        ),
      );
    } else {
      state.ctxState.translate.x = this.originalTranslate.x + diff.x;
      state.ctxState.translate.y = this.originalTranslate.y + diff.y;
    }
  }
  public onMouseUp(e: MouseEvent, state: ScetchCanvasState): void {
    this.isMouseDown = false;
  }
  public onMouseClick(e: MouseEvent, state: ScetchCanvasState): void {
    const position = mouseEventToCanvasPosition(e, state);
    for (const figure of getClickableFigures(state.scetch)) {
      // Can't select folders
      if (figure instanceof Folder) continue;

      if (!isClickInsideOutline(figure, position)) continue;
      state.setSelectedFigure(figure);

      return;
    }
    state.setSelectedFigure();
  }
}

export interface BaseHandStateStatic<T extends BaseHandState = BaseHandState> {
  readonly type: string;
}
