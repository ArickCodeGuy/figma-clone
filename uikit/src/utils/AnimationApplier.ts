/* eslint-disable no-async-promise-executor */

import { ActionQueue } from './ActionStack';
import { sleep } from './sleep';

type Timeline = 'START' | 'GOING' | 'END';

function getAnimationName(
  animationName: string,
  isInAnimation: boolean,
  timeline: Timeline
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
 * ${animationName}_${type}_END - When animation ends until next animation
 *
 * The first `animate(false)` hides the element right away (`*_OUT_END`) instead of animating it out,
 * so an element created hidden never shows. Calling `animate` with the current value does nothing.
 */
export class AnimationApplier {
  private delay: number;
  private queue: ActionQueue;
  private el: HTMLElement;
  private animationName: string;
  /** Last requested value. `undefined` until the first `animate` */
  private value: boolean | undefined;

  constructor(delay: number, el: HTMLElement, animationName = 'ANIMATION') {
    this.queue = new ActionQueue();

    this.delay = delay;
    this.el = el;
    this.animationName = animationName;
  }

  public animate(value: boolean): void {
    if (value === this.value) return;

    const isFirst = this.value === undefined;
    this.value = value;

    if (isFirst && !value) {
      this.queue.push(async () => this.setEnd(false));
      return;
    }

    const p = () =>
      new Promise<void>(async (res) => {
        this.el.classList.remove(
          this.name(false, 'END'),
          this.name(true, 'END')
        );

        this.el.classList.add(this.name(value, 'START'));
        // Make the browser apply the START styles now. Without it START and GOING can land
        // in the same style recalculation (e.g. coming from `display: none`), and the
        // element jumps to the end state with no transition
        this.el.getBoundingClientRect();
        this.el.classList.add(this.name(value, 'GOING'));

        await sleep(this.delay);
        this.setEnd(value);

        res();
      });

    this.queue.push(p);
  }

  private setEnd(value: boolean): void {
    this.el.classList.remove(
      this.name(value, 'START'),
      this.name(value, 'GOING'),
      this.name(!value, 'END')
    );
    this.el.classList.add(this.name(value, 'END'));
  }

  private name(isInAnimation: boolean, timeline: Timeline): string {
    return getAnimationName(this.animationName, isInAnimation, timeline);
  }
}
