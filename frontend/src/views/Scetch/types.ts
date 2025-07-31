export type ElementsLayout = Array<number | ElementsLayout>;

/** [x, y] */
export type CanvasPosition = [number, number];

export type CanvasShapeSquare = {
  type: 'Square';
  position: CanvasPosition;
  size: {
    width: number;
    height: number;
  };
  fillColor: string;
};

export type CanvasShapeCircle = {
  type: 'Circle';
  position: CanvasPosition;
  size: {
    radius: number;
  };
  fillColor: string;
};

export type CanvasShapeLine = {
  type: 'Line';
  position: CanvasPosition;
  vector: CanvasPosition;
  fillColor: string;
};

export type CanvasShape =
  | CanvasShapeSquare
  | CanvasShapeCircle
  | CanvasShapeLine;

export type ScetchCanvasState = {
  position: CanvasPosition;
  windowSize: CanvasPosition;
  layout: ElementsLayout;
  shapes: Map<number, CanvasShape>;
};
