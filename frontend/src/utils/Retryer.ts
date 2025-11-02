type Options = {
  /**
   * ms
   *
   * `default` - 1000
   */
  delay: number;
  /** `default` - 3 */
  retries: number;
  /**
   * Silent errors
   *
   * `default` - false
   */
  debug: boolean;
};

/**
 * Retry function call on error.
 * Could be used to fetch data *more* consistently
 */
export class Retryer<T extends () => any> {
  private fn: T;
  private options: Options;

  constructor(fn: T, options: Partial<Options> = {}) {
    this.fn = fn;
    this.options = {
      delay: 1000,
      retries: 3,
      debug: false,
      ...options,
    };
  }

  public async call(): Promise<T> {
    for (let i = 0; i < this.options.retries; i++) {
      try {
        return await this.fn();
      } catch (e) {
        if (this.options.debug) {
          console.error('Retryer: error during execution.');
          console.error(e);
        }
        // Sleep
        await new Promise((res) => setTimeout(() => res, this.options.delay));
      }
    }

    throw new Error('Retryer: retries limit exceeded.');
  }
}
