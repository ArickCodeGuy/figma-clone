import { CircleFigure } from './CircleFigure';
import { SquareFigure } from '../Square/SquareFigure';
import { CanvasPosition } from '../../CanvasPosition';

export function CircleToSquareAdapter(circle: CircleFigure): SquareFigure {
  const square = new SquareFigure();
  square.position = new CanvasPosition(
    circle.position.x - circle.radius,
    circle.position.y - circle.radius,
  );
  square.size = new CanvasPosition(circle.radius * 2, circle.radius * 2);

  return square;
}
