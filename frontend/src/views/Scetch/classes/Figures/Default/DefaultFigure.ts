import { CanvasPosition } from '../../CanvasPosition';
import { BaseFigure } from '../Base/BaseFigure';
import { DefaultFigureComponent } from './DefaultFigureComponent';

export class DefaultFigure implements BaseFigure {
  public name = 'New DefaultFigure';
  public type = 'DefaultFigure';
  public hidden = false;
  public isVisible = () => false;
  public draw = () => null;
  public getOutlineFigure = () => this;
  public position = new CanvasPosition();
  public toJSON = () => '';
  public fromJSON = () => new DefaultFigure();
  public component = DefaultFigureComponent;
  isPositionInside = () => false;

  constructor() {}
}
