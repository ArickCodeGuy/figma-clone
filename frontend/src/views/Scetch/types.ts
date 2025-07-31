export type ElementsLayout = Array<number | ElementsLayout>;

export type CanvasObjectSquare = {
  type: 'Square';
};

export type CanvasObjectCircle = {
  type: 'Circle';
};

export type CanvasObjectLine = {
  type: 'Line';
};

export type CanvasObject =
  | CanvasObjectSquare
  | CanvasObjectCircle
  | CanvasObjectLine;

export type ScetchCanvasState = {
  pos: [number, number];
  layout: ElementsLayout;
  objects: Map<number, CanvasObject>;
};
