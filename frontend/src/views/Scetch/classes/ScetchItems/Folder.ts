import { ScetchCanvasState } from '../ScetchCanvasState';
import { BaseScetchItem } from './BaseScetchItem';

export class Folder implements BaseScetchItem {
  type: string = 'Folder';
  hidden = false;
  public children: BaseScetchItem[] = new Array();

  constructor(children?: BaseScetchItem[]) {
    if (children) this.children = children;
  }

  isVisible(state: ScetchCanvasState) {
    return !this.hidden;
  }

  draw(ctx: CanvasRenderingContext2D, state: ScetchCanvasState) {
    if (!this.isVisible(state)) return;

    for (const child of this.children) {
      child.draw(ctx, state);
    }
  }

  toJSON() {
    return '';
  }

  fromJSON(str: string) {
    return new Folder();
  }
}
