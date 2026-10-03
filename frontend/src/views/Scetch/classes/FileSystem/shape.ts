import { Base } from "./base.js";

/**
 * Generic contract for anything that can appear as a drawable shape in a
 * sketch. Concrete shapes: CircleShape, RectangleShape, LineShape.
 *
 * Purely a nominal grouping — outlining is not a method a shape implements
 * on itself; see ShapeOutliner (src/shapeOutliner/shapeOutliner.ts) for
 * that.
 */
export interface Shape extends Base {}
