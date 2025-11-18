import { FileSystem } from '../../utils/Layout/FileSystem';
import { BaseShape } from './utils/ScetchShapes/BaseShape';

/** [x, y] */
export type CanvasPosition = [number, number];

export type ScetchCanvasState = {
  position: CanvasPosition;
  windowSize: CanvasPosition;
  layout: FileSystem;
  shapes: Map<number, BaseShape>;
};

export type ScetchCanvasOptions = {
  debug?: boolean;
};
