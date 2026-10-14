import { Point } from '../point';
import { RectangleShape } from '../shapes/rectangleShape';

/**
 * The rectangle every outline() call (on any Shape, or on Folder) returns:
 * a fixed-style, unfilled rectangle spanning two corner points.
 */
export class OutlineRectangleImpl extends RectangleShape {
  static readonly OUTLINE_BORDER_COLOR = 'lightblue';

  constructor(p1: Point, p2: Point) {
    super(
      'OutlinedRectangleShape',
      p1,
      p2,
      'transparent',
      OutlineRectangleImpl.OUTLINE_BORDER_COLOR,
    );
  }
}
