import { ScetchCanvasState } from '../../ScetchCanvasState';
import { BaseFigure } from '../Base/BaseFigure';
import { FolderFigureComponent } from './FolderFigureComponent';
import { DefaultFigure } from '../Default/DefaultFigure';
import { FolderHandState } from './FolderHandState';

export class FolderFigure implements BaseFigure {
  public type = 'FolderFigure';
  public name = 'New Folder';
  public hidden = false;
  public children: BaseFigure[] = new Array();

  constructor(children?: BaseFigure[]) {
    if (children) this.children = children;
  }

  getOutlineFigure = () => new DefaultFigure();
  component = FolderFigureComponent;
  handState = new FolderHandState();

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
    return new FolderFigure();
  }
}
