import { addListeners } from '../addListeners';
import { CanvasPosition } from './CanvasPosition';
import { DefaultHandState } from './HandState/DefaultHandState';
import { HandState } from './HandState/HandState';
import { Folder } from './ScetchItems/Folder';

const CANVAS_BACKGROUND_COLOR = '#FFFFFF';

export type ScetchCanvasStateOptions = {
  debug: boolean;
};

export class ScetchCanvasState {
  public position = new CanvasPosition();
  public windowSize = new CanvasPosition();
  public root = new Folder();
  public handState: HandState = new DefaultHandState();

  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private options: ScetchCanvasStateOptions = {
    debug: false,
  };

  constructor(
    canvas: HTMLCanvasElement,
    options: Partial<ScetchCanvasStateOptions> = {}
  ) {
    this.options = {
      ...this.options,
      ...options,
    };

    this.canvas = canvas;
    this.canvas.style.backgroundColor = CANVAS_BACKGROUND_COLOR;
    this.ctx = canvas.getContext('2d')!;
    this.windowSize.x = window.innerWidth;
    this.windowSize.y = window.innerHeight;

    this.init();
  }

  public clear() {
    this.ctx.clearRect(0, 0, this.windowSize.x, this.windowSize.y);
  }

  public drawAligners() {
    const GAP = 100;
    let horizontal = Math.ceil(this.position.x / GAP) * GAP;
    let vertical = Math.ceil(this.position.y / GAP) * GAP;

    // draw horizontal lines

    // draw vertical lines
  }

  public draw() {
    this.options.debug && console.log('ScetchCanvasState: draw');

    this.clear();
    this.drawAligners();
    this.root.draw(this.ctx, this);
  }

  public init() {
    this.options.debug && console.log('ScetchCanvasState: init');

    addListeners(this.canvas, this);

    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.draw();
  }
}
