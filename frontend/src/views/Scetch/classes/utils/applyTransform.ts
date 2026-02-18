import { Matrix } from '../../../../classes/Matrix';
import { CanvasPosition } from '../CanvasPosition';

export function applyTransform(
  position: CanvasPosition,
  transform: Matrix,
): CanvasPosition {
  const res = Matrix.multiply(
    transform,
    new Matrix(3, 1, [[position.x], [position.y], [1]]),
  );

  return new CanvasPosition(res.state[0][0], res.state[1][0]);
}
