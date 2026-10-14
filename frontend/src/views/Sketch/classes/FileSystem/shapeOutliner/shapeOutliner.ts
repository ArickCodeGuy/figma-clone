import { Base, BaseStatic } from '../base.js';
import { Point } from '../point.js';
import { CircleShape } from '../shapes/circleShape.js';
import { RectangleShape } from '../shapes/rectangleShape.js';
import { LineShape } from '../shapes/lineShape.js';
import { Folder } from '../folder.js';
import { OutlineRectangleImpl } from './outlineRectangleImpl.js';
import { unionBoundingBoxes } from './unionBoundingBoxes';

/**
 * Owns every outline computation in the codebase: none of CircleShape,
 * RectangleShape, LineShape or Folder know how to outline themselves — call
 * ShapeOutliner.outline(element), or the shape-specific method directly,
 * instead of a method on the element itself.
 *
 * Because outlining is no longer a method any of those classes implement,
 * this file can safely import all of them as runtime values (needed for
 * `OutlineRectangleImpl extends RectangleShape` and for the `instanceof`
 * checks in `outline()` below) without creating an import cycle: none of
 * them import this file back.
 */
export class ShapeOutliner {
  /** Dispatches to the right outline<Kind> method based on the element's runtime type. */
  static outline(element: Base): RectangleShape {
    if (element instanceof Folder) {
      return ShapeOutliner.outlineFolder(element);
    }
    if (element instanceof CircleShape) {
      return ShapeOutliner.outlineCircle(element);
    }
    if (element instanceof RectangleShape) {
      return ShapeOutliner.outlineRectangle(element);
    }
    if (element instanceof LineShape) {
      return ShapeOutliner.outlineLine(element);
    }
    throw new Error(
      `ShapeOutliner: no outline implementation for ${element.constructor.name}`,
    );
  }

  static outlineCircle(circle: CircleShape): RectangleShape {
    const bottomLeft = new Point(
      circle.position.x - circle.radius,
      circle.position.y - circle.radius,
    );
    const topRight = new Point(
      circle.position.x + circle.radius,
      circle.position.y + circle.radius,
    );
    return new OutlineRectangleImpl(
      bottomLeft,
      Point.diff(bottomLeft, topRight),
    );
  }

  static outlineRectangle(rectangle: RectangleShape): RectangleShape {
    return new OutlineRectangleImpl(
      new Point(rectangle.position.x, rectangle.position.y),
      new Point(rectangle.size.x, rectangle.size.y),
    );
  }

  static outlineLine(line: LineShape): RectangleShape {
    return new OutlineRectangleImpl(line.position, line.vector);
  }

  /**
   * Outlines all contained figures: the smallest rectangle bounding every
   * shape (and nested folder) inside the given folder, recursively (via
   * `outline()`, so an unrecognized child throws instead of being silently
   * skipped). Empty when the folder (and its descendants) contain no
   * figures.
   */
  static outlineFolder(folder: Folder): RectangleShape {
    const childBoxes = folder.children.map((child) => {
      const rect = ShapeOutliner.outline(child);

      const x1 = rect.position.x;
      const x2 = rect.position.x + rect.size.x;
      const y1 = rect.position.y;
      const y2 = rect.position.y + rect.size.y;

      const bottomLeft = new Point(Math.min(x1, x2), Math.min(y1, y2));
      const topRight = new Point(Math.max(x1, x2), Math.max(y1, y2));

      return { bottomLeft, topRight };
    });

    const box = unionBoundingBoxes(childBoxes) ?? {
      bottomLeft: new Point(0, 0),
      topRight: new Point(0, 0),
    };

    return new OutlineRectangleImpl(
      box.bottomLeft,
      Point.diff(box.bottomLeft, box.topRight),
    );
  }
}
