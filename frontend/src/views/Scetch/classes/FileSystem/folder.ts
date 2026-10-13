import { Base, BaseStatic } from './base.js';
import { registerType, deserialize } from './registry.js';

interface FolderJSON {
  type: string;
  name: string;
  children: unknown[];
  isHidden: boolean;
}

/** A folder that can contain other folders or shapes. */
export class Folder extends Base {
  static readonly type = 'Folder';

  constructor(
    public name: string,
    public children: Base[] = [],
    isHidden: boolean = false,
  ) {
    super(isHidden);
  }

  add(child: Base): void {
    this.children.push(child);
  }

  /** Removes `child` from this folder or any nested folder. Returns `true` when it was found */
  remove(child: Base): boolean {
    const idx = this.children.indexOf(child);
    if (idx !== -1) {
      this.children.splice(idx, 1);
      return true;
    }

    for (const c of this.children) {
      if (c instanceof Folder && c.remove(child)) return true;
    }
    return false;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    if (this.isHidden) {
      return;
    }
    for (const child of this.children) {
      child.draw(ctx);
    }
  }

  toString(): string {
    const json: FolderJSON = {
      type: Folder.type,
      name: this.name,
      children: this.children.map((child) => JSON.parse(child.toString())),
      isHidden: this.isHidden,
    };
    return JSON.stringify(json);
  }

  static fromString(str: string): Folder {
    const json = JSON.parse(str) as FolderJSON;
    const children = json.children.map((childJson) => deserialize(childJson));
    return new Folder(json.name, children, json.isHidden ?? false);
  }
}

Folder satisfies BaseStatic<Folder>;
registerType(Folder);
