export class CanvasPosition {
  public x: number = 0;
  public y: number = 0;

  constructor(x?: number, y?: number) {
    if (x) this.x = x;
    if (y) this.y = y;
  }
}
