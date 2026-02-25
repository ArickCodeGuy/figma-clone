import { addListeners } from './utils/addListeners';
import { CanvasPosition } from './CanvasPosition';
import { DefaultHandState } from './HandState/DefaultHandState';
import { HandState } from './HandState/HandState';
import { Folder } from './ScetchItems/Folder';
import { Matrix } from '../../../classes/Matrix';
import { Line } from './ScetchItems/Line';

const CANVAS_BACKGROUND_COLOR = '#FFFFFF';

export type ScetchCanvasStateOptions = {
  debug: boolean;
};

export class ScetchCanvasState {
  public translate = new CanvasPosition();
  public zoom = 1;
  public windowSize = new CanvasPosition();
  public root = new Folder();
  public handState: HandState = new DefaultHandState();
  public canvas: HTMLCanvasElement = document.createElement('canvas');
  public ctx: CanvasRenderingContext2D = this.canvas.getContext('2d')!;

  private options: ScetchCanvasStateOptions = {
    debug: false,
  };
  private removeListeners: ReturnType<typeof addListeners> = () => null;
  private intervalId: number = -1;

  constructor(options: Partial<ScetchCanvasStateOptions> = {}) {
    this.options = {
      ...this.options,
      ...options,
    };
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
    const GAP = 100;

    const xAxis = new Line(this.windowSize.x / 2, 0, 0, this.windowSize.y);
    const yAxis = new Line(0, this.windowSize.y / 2, this.windowSize.x, 0);

    xAxis.draw(this.ctx, this);
    yAxis.draw(this.ctx, this);
    // @@TODO
    // let horizontal = Math.ceil(this.position.x / GAP) * GAP;
    // let vertical = Math.ceil(this.position.y / GAP) * GAP;

    // draw horizontal lines

    // draw vertical lines
  }

  public draw() {
    this.options.debug && console.log('ScetchCanvasState: draw');

    this.ctx.setTransform(
      this.zoom,
      0,
      0,
      this.zoom,
      this.translate.x,
      this.translate.y,
    );

    this.clear();
    this.drawAligners();
    this.root.draw(this.ctx, this);
  }

  public init() {
    this.options.debug && console.log('ScetchCanvasState: init');
    this.destroy();

    this.canvas.style.backgroundColor = CANVAS_BACKGROUND_COLOR;
    this.windowSize.x = window.innerWidth;
    this.windowSize.y = window.innerHeight;

    this.canvas.style.width = this.windowSize.x + 'px';
    this.canvas.style.height = this.windowSize.y + 'px';
    this.canvas.width = this.windowSize.x;
    this.canvas.height = this.windowSize.y;

    this.removeListeners = addListeners(this);

    // @@TODO unmount and more optimal render
    this.intervalId = setInterval(() => {
      this.draw();
    }, 1000 / 60);
  }

  public destroy() {
    clearInterval(this.intervalId);
    this.removeListeners();
  }
}
