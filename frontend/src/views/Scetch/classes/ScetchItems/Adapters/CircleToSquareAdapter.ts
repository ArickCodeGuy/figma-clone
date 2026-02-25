import { Circle } from '../Circle';
import { Square } from '../Square';

export function CircleToSquareAdapter(circle: Circle): Square {
  return new Square(
    circle.position.x - circle.radius,
    circle.position.y - circle.radius,
    circle.radius * 2,
    circle.radius * 2,
  );
}
