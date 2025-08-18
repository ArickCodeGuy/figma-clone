/* eslint-disable no-async-promise-executor */

import { ActionQueue } from './ActionStack';
import { sleep } from './sleep';

function getAnimationName(
  animationName: string,
  isInAnimation: boolean,
  timeline: 'START' | 'GOING' | 'END'
) {
  const prefix = isInAnimation ? 'IN' : 'OUT';
  const suffix = timeline;

  return `${animationName}_${prefix}_${suffix}`;
}

/**
 * Applies classes for in or out animations. Applied animations are executed with `ActionQueue`
 *
 * ${animationName}_${type}_START - When animation starts until end
 *
 * ${animationName}_${type}_GOING - Frame after animation start until end
 *
 * ${animationName}_${type}_GOING - When animatinon ends until next animation
 */
export class AnimationApplier {
  private delay: number;
  private queue: ActionQueue;
  private el: HTMLElement;
  private animationName: string;

  constructor(delay: number, el: HTMLElement, animationName = 'ANIMATION') {
    this.queue = new ActionQueue();

    this.delay = delay;
    this.el = el;
    this.animationName = animationName;
  }

  public animate(value: boolean): void {
    const p = () =>
      new Promise<void>(async (res) => {
        this.el.classList.remove(
          getAnimationName(this.animationName, false, 'END'),
          getAnimationName(this.animationName, true, 'END')
        );

        this.el.classList.add(
          getAnimationName(this.animationName, value, 'START')
        );
        await sleep(1);
        this.el.classList.add(
          getAnimationName(this.animationName, value, 'GOING')
        );

        await sleep(this.delay - 2);
        this.el.classList.remove(
          getAnimationName(this.animationName, value, 'START'),
          getAnimationName(this.animationName, value, 'GOING')
        );
        this.el.classList.add(
          getAnimationName(this.animationName, value, 'END')
        );

        res();
      });

    this.queue.push(p);
  }
}
