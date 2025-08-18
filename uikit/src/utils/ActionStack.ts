/* eslint-disable @typescript-eslint/no-unsafe-function-type */

/** Makes sure that pushed functions would run synchronously */
export class ActionQueue {
  private queue: Function[];
  private busy: boolean;

  constructor() {
    this.queue = [];
    this.busy = false;
  }

  public push(fn: Function): void {
    const element = async () => {
      this.busy = true;
      await fn();
      if (this.queue.length) {
        const next = this.queue.shift();
        await next!();
      }
      this.busy = false;
    };

    this.queue.push(element);
    this.run();
  }

  private run(): void {
    if (this.busy || !this.queue.length) return;

    const fn = this.queue.shift();
    fn!();
  }
}
