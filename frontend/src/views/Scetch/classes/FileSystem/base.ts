import { Point } from './point';

/**
 * Instance-side contract every element of the sketch tree (shapes, folders,
 * the sketch itself) must satisfy.
 */
export abstract class Base {
  /** Display name. Mutable and independent per instance. */
  abstract name: string;

  constructor(
    /**
     * When true, this element is skipped by `draw()`. For a container
     * (Folder/Sketch), hiding it also hides everything inside it, since its
     * `draw()` never reaches its children's `draw()` calls.
     */
    public isHidden: boolean = false,
  ) {
    this.isHidden = isHidden;
  }

  /** Render this element onto a canvas context. No-op when `isHidden` is true. */
  abstract draw(ctx: CanvasRenderingContext2D): void;

  /** Serialize this element (and everything it contains) to a JSON string. */
  abstract toString(): string;
}

/**
 * Static-side contract for a concrete `Base` implementation.
 *
 * TypeScript interfaces/abstract classes cannot require static members on
 * implementers, so the "static final type" and "fromString" requirements
 * from the spec are expressed as a separate constructor-shaped interface.
 * Each concrete class is checked against it with `satisfies` where it is
 * declared (see e.g. circleShape.ts).
 */
export interface BaseStatic<T extends Base = Base> {
  /** Discriminator used for (de)serialization. Constant per class. */
  readonly type: string;
  /** Reconstruct an instance of T from a string previously produced by T#toString(). */
  fromString(str: string): T;
}
