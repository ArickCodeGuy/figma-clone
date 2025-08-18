/* eslint-disable no-async-promise-executor */

import { ActionQueue } from './ActionStack';
import { sleep } from './sleep';

type AnimationName =
  | 'ANIMATION_IN_START'
  | 'ANIMATION_IN_GOING'
  | 'ANIMATION_IN_END'
  | 'ANIMATION_OUT_START'
  | 'ANIMATION_OUT_GOING'
  | 'ANIMATION_OUT_END';

const ANIMATION_NAMES_MAP = {
  START: {
    1: 'ANIMATION_IN_START',
    0: 'ANIMATION_OUT_START',
  },
  GOING: {
    1: 'ANIMATION_IN_GOING',
    0: 'ANIMATION_OUT_GOING',
  },
  END: {
    1: 'ANIMATION_IN_END',
    0: 'ANIMATION_OUT_END',
  },
} as const;

export class AnimationDuration {
  private delay: number;
  private queue: ActionQueue;
  private el: HTMLElement;

  constructor(delay: number, el: HTMLElement) {
    this.queue = new ActionQueue();

    this.delay = delay;
    this.el = el;
  }

  public setValue(value: boolean): void {
    const v = value ? 1 : 0;

    const p = () =>
      new Promise<void>(async (res) => {
        this.el.classList.remove(
          ANIMATION_NAMES_MAP.END[0],
          ANIMATION_NAMES_MAP.END[1]
        );

        this.el.classList.add(ANIMATION_NAMES_MAP.START[v]);
        await sleep(1);
        this.el.classList.add(ANIMATION_NAMES_MAP.GOING[v]);

        await sleep(this.delay - 2);
        this.el.classList.remove(ANIMATION_NAMES_MAP.START[v]);
        this.el.classList.remove(ANIMATION_NAMES_MAP.GOING[v]);
        this.el.classList.add(ANIMATION_NAMES_MAP.END[v]);

        res();
      });

    this.queue.push(p);
  }
}
