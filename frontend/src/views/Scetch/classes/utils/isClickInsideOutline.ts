import { isClickInsideRectangle } from './isClickInsideRectangle';
import { Base } from '../FileSystem/base';
import { Point } from '../FileSystem/point';
import { ShapeOutliner } from '../FileSystem/shapeOutliner/shapeOutliner';

export function isClickInsideOutline(figure: Base, point: Point): boolean {
  const outline = ShapeOutliner.outline(figure);

  return isClickInsideRectangle(outline, point);
}
