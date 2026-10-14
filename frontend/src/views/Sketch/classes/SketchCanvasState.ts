import { addListeners } from './utils/addListeners';
import {
  Sketch,
  Base,
  Folder,
  Point,
  ShapeOutliner,
  LineShape,
} from './FileSystem';
import { BaseHandState } from './handStates/baseHandState';

export type SketchCanvasStateOptions = {
  debug: boolean;
};

/** For rendering purposes */
type CtxState = {
  zoom: number;
  translate: Point;
};

type ObserverCallback = (eventName: string, ...args: string[]) => void;

/** localStorage key for `sketch.root`, written by `save` (Ctrl + S) */
export const SKETCH_ROOT_STORAGE_KEY = 'figma-clone:sketch-root';

export class SketchCanvasState {
  public name: string = 'new_sketch';
  private CANVAS_BACKGROUND_COLOR = '#FFFFFF';

  public windowSize = new Point(innerWidth, innerHeight);
  public sketch = new Sketch('root');
  /** For moving and creating new shapes */
  public handState: BaseHandState = new BaseHandState();
  public selectedFigure: Base | undefined;
  public canvas: HTMLCanvasElement = document.createElement('canvas');
  public ctx: CanvasRenderingContext2D = this.canvas.getContext('2d')!;
  public ctxState: CtxState = {
    zoom: 1,
    translate: new Point(),
  };
  /**
   * Some parts of program need to know about specific events that happen in sketch
   * e.g. selecting a figure should be followed by loading a component
   * that will be able to edit selected figure
   */
  private observers: ObserverCallback[] = new Array();
  private removeListeners: ReturnType<typeof addListeners> = () => null;

  /** For removing render interval on `destroy` */
  private intervalId: number = -1;

  constructor(
    private options: Partial<SketchCanvasStateOptions> = {
      debug: false,
    },
  ) {
    // Once per page load. Not in `init`, which runs on every `SketchView` render
    this.loadFromStorage();
  }

  public clear() {
    // Save current transform state
    this.ctx.save();
    // Reset transform to identity matrix
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    // Clear entire canvas
    this.ctx.clearRect(0, 0, this.windowSize.x, this.windowSize.y);
    // Restore previous transform
    this.ctx.restore();
  }

  public drawAligners() {
    const xAxis = new LineShape(
      'xAxis',
      new Point(this.windowSize.x / 2, 0),
      new Point(0, this.windowSize.y),
      'black',
    );
    const yAxis = new LineShape(
      'yAxis',
      new Point(0, this.windowSize.y / 2),
      new Point(this.windowSize.x, 0),
      'black',
    );

    xAxis.draw(this.ctx);
    yAxis.draw(this.ctx);
  }

  public draw() {
    this.loggerLog('draw');

    this.ctx.setTransform(
      this.ctxState.zoom,
      0,
      0,
      this.ctxState.zoom,
      this.ctxState.translate.x,
      this.ctxState.translate.y,
    );

    this.clear();
    this.drawAligners();
    this.sketch.draw(this.ctx);

    if (this.selectedFigure) {
      ShapeOutliner.outline(this.selectedFigure).draw(this.ctx);
    }
  }

  public init() {
    this.loggerLog('init', this);
    this.destroy();

    this.canvas.style.backgroundColor = this.CANVAS_BACKGROUND_COLOR;

    this.canvas.style.width = this.windowSize.x + 'px';
    this.canvas.style.height = this.windowSize.y + 'px';
    this.canvas.width = this.windowSize.x;
    this.canvas.height = this.windowSize.y;

    this.removeListeners = addListeners(this);

    // @@TODO more optimal render?
    this.intervalId = setInterval(() => {
      this.draw();
    }, 1000 / 60);
  }

  public destroy() {
    clearInterval(this.intervalId);
    this.removeListeners();
  }

  public subscribe(cb: ObserverCallback) {
    this.observers.push(cb);
  }

  public setSelectedFigure(figure?: Base): void {
    if (this.selectedFigure == figure) return;
    this.selectedFigure = figure;

    this.notifyObservers('select');
  }

  /** Removes the selected figure from the sketch and clears the selection */
  public deleteSelectedFigure(): void {
    if (!this.selectedFigure) return;

    this.sketch.root.remove(this.selectedFigure);
    this.setSelectedFigure(undefined);
  }

  /** Saves `sketch.root` as JSON in localStorage */
  public save(): void {
    try {
      localStorage.setItem(
        SKETCH_ROOT_STORAGE_KEY + ':' + this.name,
        this.sketch.root.toString(),
      );
    } catch (e) {
      console.error('SketchCanvasState: could not save the sketch', e);
    }
  }

  /** Replaces `sketch.root` with the one stored by `save`, if there is one */
  public loadFromStorage(): void {
    let json: string | null;
    try {
      json = localStorage.getItem(SKETCH_ROOT_STORAGE_KEY);
    } catch {
      return; // Storage is unavailable (e.g. blocked by the browser)
    }
    if (!json) return;

    try {
      this.sketch.root = Folder.fromString(json);
    } catch (e) {
      console.error(
        'SketchCanvasState: saved sketch is invalid, ignoring it',
        e,
      );
    }
  }

  public notifyObservers(eventName: string) {
    for (const cb of this.observers) cb(eventName);
  }

  private loggerLog(...args: any): void {
    if (this.options.debug) {
      console.log('SketchCanvasState debugger', this);
      console.log(...args);
    }
  }
}
