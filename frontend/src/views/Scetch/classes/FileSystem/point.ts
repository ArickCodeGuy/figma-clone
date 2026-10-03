export interface PointJSON {
  x: number;
  y: number;
}

/** A plain 2D point/vector, reused for shape coordinates. */
export class Point {
  constructor(
    public x: number = 0,
    public y: number = 0,
  ) {}

  toJSON(): PointJSON {
    return { x: this.x, y: this.y };
  }

  static fromJSON(obj: PointJSON): Point {
    return new Point(obj.x, obj.y);
  }

  // Returns vector pointing from `p1` to `p2`
  static diff(p1: Point, p2: Point) {
    return new Point(p2.x - p1.x, p2.y - p1.y);
  }
}
