import { Base, BaseStatic } from '../base.js';
import { Point, PointJSON } from '../point.js';
import { Shape } from '../shape.js';
import { registerType } from '../registry.js';

interface LineShapeJSON {
  type: string;
  name: string;
  origin: PointJSON;
  vector: PointJSON;
  color: string;
  isHidden: boolean;
}

export class LineShape extends Base implements Shape {
  static readonly type = 'LineShape';

  constructor(
    public name: string,
    public origin: Point,
    public vector: Point,
    public color: string,
    isHidden: boolean = false,
  ) {
    super(isHidden);
  }

  /** The line's endpoint: origin + vector. */
  get endpoint(): Point {
    return new Point(
      this.origin.x + this.vector.x,
      this.origin.y + this.vector.y,
    );
  }

  draw(ctx: CanvasRenderingContext2D): void {
    if (this.isHidden) {
      return;
    }
    const end = this.endpoint;
    ctx.beginPath();
    ctx.moveTo(this.origin.x, this.origin.y);
    ctx.lineTo(end.x, end.y);
    ctx.strokeStyle = this.color;
    ctx.stroke();
  }

  toString(): string {
    const json: LineShapeJSON = {
      type: LineShape.type,
      name: this.name,
      origin: this.origin.toJSON(),
      vector: this.vector.toJSON(),
      color: this.color,
      isHidden: this.isHidden,
    };
    return JSON.stringify(json);
  }

  static fromString(str: string): LineShape {
    const json = JSON.parse(str) as LineShapeJSON;
    return new LineShape(
      json.name,
      Point.fromJSON(json.origin),
      Point.fromJSON(json.vector),
      json.color,
      json.isHidden ?? false,
    );
  }
}

LineShape satisfies BaseStatic<LineShape>;
registerType(LineShape);
