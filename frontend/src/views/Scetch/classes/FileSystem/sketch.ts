import { Base, BaseStatic } from './base.js';
import { registerType } from './registry.js';
import { Folder } from './folder.js';

interface SketchJSON {
  type: string;
  name: string;
  root: unknown;
  isHidden: boolean;
}

/** The file system / document root: a name plus a root Folder. */
export class Sketch extends Base {
  static readonly type = 'Sketch';

  constructor(
    public name: string,
    public root: Folder = new Folder('root'),
    isHidden: boolean = false,
  ) {
    super(isHidden);
  }

  draw(ctx: CanvasRenderingContext2D): void {
    if (this.isHidden) {
      return;
    }
    this.root.draw(ctx);
  }

  toString(): string {
    const json: SketchJSON = {
      type: Sketch.type,
      name: this.name,
      root: JSON.parse(this.root.toString()),
      isHidden: this.isHidden,
    };
    return JSON.stringify(json);
  }

  static fromString(str: string): Sketch {
    const json = JSON.parse(str) as SketchJSON;
    const root = Folder.fromString(JSON.stringify(json.root));
    return new Sketch(json.name, root, json.isHidden ?? false);
  }
}

Sketch satisfies BaseStatic<Sketch>;
registerType(Sketch);
