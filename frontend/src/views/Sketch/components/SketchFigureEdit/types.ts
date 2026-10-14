import { Base } from '../../classes/FileSystem';

export type ValueEditProps<T> = {
  value: T;
  onUpdate: (newVal: T) => void;
};

export type SketchFigureEditProps<T extends Base = Base> = {
  figure?: T;
  update?: (newVal: T) => void;
};
