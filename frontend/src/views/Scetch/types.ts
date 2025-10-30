import { BaseShape } from './utils/ScetchShapes/BaseShape';

export type ElementsLayout = Array<number | ElementsLayout>;

/** [x, y] */
export type CanvasPosition = [number, number];

export type ScetchCanvasState = {
  position: CanvasPosition;
  windowSize: CanvasPosition;
  layout: ElementsLayout;
  shapes: Map<number, BaseShape>;
};

export type ScetchCanvasOptions = {
  debug?: boolean;
};
