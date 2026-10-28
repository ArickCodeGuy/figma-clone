let ctx: CanvasRenderingContext2D | null | undefined;

/**
 * Any CSS color (`black`, `rgb(0, 0, 0)`, `#000`) as `#rrggbb`, the format of `KInputColor`.
 * Shapes are created with named colors, the canvas normalizes them for us.
 * Colors with transparency come back as `rgba(...)`, those are returned as they are
 */
export function toHexColor(color: string): string {
  ctx ??= document.createElement('canvas').getContext('2d');
  if (!ctx) return color;

  // An invalid value is ignored and the previous one stays, so reset first
  ctx.fillStyle = '#000000';
  ctx.fillStyle = color;

  return ctx.fillStyle;
}
