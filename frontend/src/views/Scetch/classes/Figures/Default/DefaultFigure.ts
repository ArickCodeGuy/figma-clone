import { ScetchCanvasState } from '../../ScetchCanvasState';
import { BaseFigure } from '../Base/BaseFigure';
import { DefaultHandState } from './DefaultHandState';
import { DefaultFigureComponent } from './DefaultFigureComponent';

export class DefaultFigure implements BaseFigure {
  public name = 'New DefaultFigure';
  public type = 'DefaultFigure';
  public hidden = false;
  public isVisible = (state: ScetchCanvasState) => false;
  public draw = (ctx: CanvasRenderingContext2D, state: ScetchCanvasState) =>
    null;
  public getOutlineFigure = () => this;
  public toJSON = () => '';
  public fromJSON = (str: string): BaseFigure => new DefaultFigure();
  public component = DefaultFigureComponent;
  public handState = new DefaultHandState();

  constructor() {}
}
