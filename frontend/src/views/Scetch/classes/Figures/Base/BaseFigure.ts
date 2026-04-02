// Every object that can be placed needs to have:

import { CanvasPosition } from '../../CanvasPosition';
import { ScetchCanvasState } from '../../ScetchCanvasState';

// 1. Renderer
// 2. Hand state
// 3. Edit fields
// 4. Outliner (Adapter to Square)
// 5. toJSON, fromJSON (for saving)
export interface BaseFigure {
  name: string;
  type: string;
  hidden: boolean;
  position: CanvasPosition;

  isVisible: (state: ScetchCanvasState) => boolean;
  draw: (ctx: CanvasRenderingContext2D, state: ScetchCanvasState) => void;

  // Every figure can be chosen. Thus we need to outline that
  getOutlineFigure: () => BaseFigure;

  toJSON: () => string;
  fromJSON: (str: string) => BaseFigure;

  /** For rendering edit fields for item, when selected */
  component: () => React.ReactNode;

  isPositionInside: (position: CanvasPosition) => boolean;
}
