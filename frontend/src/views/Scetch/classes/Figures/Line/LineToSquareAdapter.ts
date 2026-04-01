import { SquareFigure } from '../Square/SquareFigure';
import { SquareToOutlineSquareAdapter } from '../Square/SquareToOutlineSquareAdapter';
import { LineFigure } from './LineFigure';

export function LineToSquareAdapter(line: LineFigure): SquareFigure {
  const square = new SquareFigure();
  square.position.x = line.position.x;
  square.position.y = line.position.y;
  square.size.x = line.position.x + line.vector.x;
  square.size.y = line.position.y + line.vector.y;

  return SquareToOutlineSquareAdapter(square);
}
