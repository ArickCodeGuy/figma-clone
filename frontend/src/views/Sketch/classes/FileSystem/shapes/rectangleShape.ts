import { Base, BaseStatic } from '../base.js';
import { Point, PointJSON } from '../point.js';
import { Shape } from '../shape.js';
import { registerType } from '../registry.js';

interface RectangleShapeJSON {
  type: string;
  name: string;
  position: PointJSON;
  size: PointJSON;
  color: string;
  borderColor: string;
  isHidden: boolean;
}

export class RectangleShape extends Base implements Shape {
  static readonly type = 'RectangleShape';

  constructor(
    public name: string,
    public position: Point,
    public size: Point,
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
    ctx.rect(this.position.x, this.position.y, this.size.x, this.size.y);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.strokeStyle = this.borderColor;
    ctx.stroke();
  }

  toString(): string {
    const json: RectangleShapeJSON = {
      type: RectangleShape.type,
      name: this.name,
      position: this.position.toJSON(),
      size: this.size.toJSON(),
      color: this.color,
      borderColor: this.borderColor,
      isHidden: this.isHidden,
    };
    return JSON.stringify(json);
  }

  static fromString(str: string): RectangleShape {
    const json = JSON.parse(str) as RectangleShapeJSON;
    return new RectangleShape(
      json.name,
      Point.fromJSON(json.position),
      Point.fromJSON(json.size),
      json.color,
      json.borderColor,
      json.isHidden ?? false,
    );
  }
}

RectangleShape satisfies BaseStatic<RectangleShape>;
registerType(RectangleShape);
