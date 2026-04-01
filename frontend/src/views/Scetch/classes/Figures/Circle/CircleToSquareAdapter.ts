import { CircleFigure } from './CircleFigure';
import { SquareFigure } from '../Square/SquareFigure';
import { CanvasPosition } from '../../CanvasPosition';
import { SquareToOutlineSquareAdapter } from '../Square/SquareToOutlineSquareAdapter';

export function CircleToSquareAdapter(circle: CircleFigure): SquareFigure {
  const square = new SquareFigure();
  square.position.x = circle.position.x - circle.radius;
  square.position.y = circle.position.y - circle.radius;
  square.size.x = circle.radius * 2;
  square.size.y = circle.radius * 2;

  return SquareToOutlineSquareAdapter(square);
}
