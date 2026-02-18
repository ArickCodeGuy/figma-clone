import { addListeners } from './utils/addListeners';
import { CanvasPosition } from './CanvasPosition';
import { DefaultHandState } from './HandState/DefaultHandState';
import { HandState } from './HandState/HandState';
import { Folder } from './ScetchItems/Folder';
import { Matrix } from '../../../classes/Matrix';

const CANVAS_BACKGROUND_COLOR = '#FFFFFF';

export type ScetchCanvasStateOptions = {
  debug: boolean;
};

export class ScetchCanvasState {
  public translation = new Matrix(3, 3, [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ]);
  public zoom = new Matrix(3, 3, [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ]);
  public windowSize = new CanvasPosition();
  public root = new Folder();
  public handState: HandState = new DefaultHandState();
  public canvas: HTMLCanvasElement = document.createElement('canvas');

  private ctx: CanvasRenderingContext2D = this.canvas.getContext('2d')!;
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
    this.ctx.clearRect(0, 0, this.windowSize.x, this.windowSize.y);
  }

  public drawAligners() {
    const GAP = 100;
    // let horizontal = Math.ceil(this.position.x / GAP) * GAP;
    // let vertical = Math.ceil(this.position.y / GAP) * GAP;

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
    this.destroy();

    this.canvas.style.backgroundColor = CANVAS_BACKGROUND_COLOR;
    this.windowSize.x = window.innerWidth;
    this.windowSize.y = window.innerHeight;

    this.removeListeners = addListeners(this.canvas, this);

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
