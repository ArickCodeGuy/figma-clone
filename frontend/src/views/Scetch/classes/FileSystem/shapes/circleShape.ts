import { Base, BaseStatic } from '../base.js';
import { Point, PointJSON } from '../point.js';
import { Shape } from '../shape.js';
import { registerType } from '../registry.js';

interface CircleShapeJSON {
  type: string;
  name: string;
  center: PointJSON;
  radius: number;
  color: string;
  borderColor: string;
  isHidden: boolean;
}

export class CircleShape extends Base implements Shape {
  static readonly type = 'CircleShape';

  constructor(
    public name: string,
    public center: Point,
    public radius: number,
    public color: string,
    public borderColor: string,
    isHidden: boolean = false,
  ) {
    super(isHidden);
  }

  draw(ctx: CanvasRenderingContext2D): void {
    if (this.isHidden) {
      return;
    }
    ctx.beginPath();
    ctx.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.strokeStyle = this.borderColor;
    ctx.stroke();
  }

  toString(): string {
    const json: CircleShapeJSON = {
      type: CircleShape.type,
      name: this.name,
      center: this.center.toJSON(),
      radius: this.radius,
      color: this.color,
      borderColor: this.borderColor,
      isHidden: this.isHidden,
    };
    return JSON.stringify(json);
  }

  static fromString(str: string): CircleShape {
    const json = JSON.parse(str) as CircleShapeJSON;
    return new CircleShape(
      json.name,
      Point.fromJSON(json.center),
      json.radius,
      json.color,
      json.borderColor,
      json.isHidden ?? false,
    );
  }
}

CircleShape satisfies BaseStatic<CircleShape>;
registerType(CircleShape);
