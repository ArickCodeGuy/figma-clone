import { SquareFigure } from './SquareFigure';

export function SquareToOutlineSquareAdapter(
  square: SquareFigure,
): SquareFigure {
  const res = new SquareFigure();

  res.position.x = square.position.x;
  res.position.y = square.position.y;
  res.size.x = square.size.x;
  res.size.y = square.size.y;
  res.hollow = true;
  res.fillColor = 'blue';

  return res;
}
