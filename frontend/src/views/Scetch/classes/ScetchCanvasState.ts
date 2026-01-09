import { addListeners } from './utils/addListeners';
import { CanvasPosition } from './CanvasPosition';
import { DefaultHandState } from './HandState/DefaultHandState';
import { CircleHandState } from './HandState/Figures/CirCleHandState';
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
  public handState: HandState = new CircleHandState();

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

    this.ctx = canvas.getContext('2d')!;

    this.canvas = canvas;
    this.canvas.style.backgroundColor = CANVAS_BACKGROUND_COLOR;
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

    this.canvas.style.width = this.windowSize.x + 'px';
    this.canvas.style.height = this.windowSize.y + 'px';
    this.canvas.width = this.windowSize.x;
    this.canvas.height = this.windowSize.y;

    this.clear();
    this.drawAligners();
    this.root.draw(this.ctx, this);
  }

  public init() {
    this.options.debug && console.log('ScetchCanvasState: init');

    const removeListeners = addListeners(this.canvas, this);

    // @@TODO unmount and more optimal render
    setInterval(() => {
      this.draw();
    }, 1000 / 60);
  }
}
