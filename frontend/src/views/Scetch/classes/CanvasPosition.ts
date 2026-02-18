export class CanvasPosition {
  public x: number = 0;
  public y: number = 0;

  constructor(x?: number, y?: number) {
    if (x) this.x = x;
    if (y) this.y = y;
  }

  public static diff(p1: CanvasPosition, p2: CanvasPosition): CanvasPosition {
    return new CanvasPosition(p2.x - p1.x, p2.y - p1.y);
  }
}
