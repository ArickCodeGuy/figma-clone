import { Folder, Point, RectangleShape, ShapeOutliner } from '../../FileSystem';
import { ScetchCanvasState } from '../../ScetchCanvasState';
import { clientPositionToPoint } from '../../utils/clientPositionToPoint';
import { getClickableFigures } from '../../utils/getClickableFigures';
import { isClickInsideRectangle } from '../../utils/isClickInsideRectangle';
import { mouseEventToCanvasPosition } from '../../utils/mouseEventToCanvasPosition';
import type { BaseHandState } from '../Base/BaseHandState';

export class DefaultHandState implements BaseHandState {
  public name = 'DefaultHandState';
  private isMouseDown = false;
  private isMouseDownOnSelectFigure = false;
  // When we do mousedown
  // We need to know position where we clicked on page
  // And where figure position was
  private mouseDownFigurePosition = new Point();
  private mouseDownPosition = new Point();
  private originalTranslate = new Point();

  constructor() {}

  public onWheel(e: WheelEvent, state: ScetchCanvasState): void {
    if (this.isMouseDown) return;

    const center = clientPositionToPoint(
      new Point(state.windowSize.x / 2, state.windowSize.y / 2),
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
    this.isMouseDownOnSelectFigure = false;

    this.originalTranslate = new Point(state.translate.x, state.translate.y);
    this.mouseDownPosition = new Point(e.clientX, e.clientY);
    if (state.selectedFigure) {
      const outline = ShapeOutliner.outline(
        state.selectedFigure,
      ) as RectangleShape;

      // Is click this.mouseDownPosition; within outline
      if (true) {
        this.isMouseDownOnSelectFigure = true;
        this.mouseDownFigurePosition = new Point(
          outline.position.x,
          outline.position.y,
        );
      }
    }
  }

  public onMouseMove(e: MouseEvent, state: ScetchCanvasState): void {
    if (!this.isMouseDown) return;

    const curr = new Point(e.clientX, e.clientY);
    const diff = Point.diff(this.mouseDownPosition, curr);

    if (this.isMouseDownOnSelectFigure && state.selectedFigure) {
      // @@TODO move figure based on type of figure
      // state.selectedFigure.position = new Point(
      //   this.mouseDownFigurePosition.x + diff.x,
      //   this.mouseDownFigurePosition.y + diff.y,
      // );
    } else {
      state.translate.x = this.originalTranslate.x + diff.x;
      state.translate.y = this.originalTranslate.y + diff.y;
    }
  }
  public onMouseUp(e: MouseEvent, state: ScetchCanvasState): void {
    this.isMouseDown = false;
  }
  public onMouseClick(e: MouseEvent, state: ScetchCanvasState): void {
    const position = mouseEventToCanvasPosition(e, state);
    for (const figure of getClickableFigures(state.root)) {
      // Can't select folders
      if (figure instanceof Folder) continue;

      const outline = ShapeOutliner.outline(figure) as RectangleShape;

      if (!isClickInsideRectangle(outline, position)) continue;
      state.setSelectedFigure(figure);

      return;
    }
    state.setSelectedFigure();
  }
}
