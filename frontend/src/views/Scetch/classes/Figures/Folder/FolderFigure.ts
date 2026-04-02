import { ScetchCanvasState } from '../../ScetchCanvasState';
import { BaseFigure } from '../Base/BaseFigure';
import { FolderFigureComponent } from './FolderFigureComponent';
import { DefaultFigure } from '../Default/DefaultFigure';
import { CanvasPosition } from '../../CanvasPosition';

export class FolderFigure implements BaseFigure {
  public type = 'FolderFigure';
  public name = 'New Folder';
  public hidden = false;
  public children: BaseFigure[] = new Array();
  public getOutlineFigure = () => new DefaultFigure();
  public position = new CanvasPosition();
  public component = FolderFigureComponent;

  constructor(children?: BaseFigure[]) {
    if (children) this.children = children;
  }

  public isVisible = (state: ScetchCanvasState) => !this.hidden;

  public draw(ctx: CanvasRenderingContext2D, state: ScetchCanvasState) {
    if (!this.isVisible(state)) return;

    for (const child of this.children) {
      child.draw(ctx, state);
    }
  }

  public toJSON = () => '';
  public fromJSON = (str: string) => new FolderFigure();
  public isPositionInside = () => false;
}
