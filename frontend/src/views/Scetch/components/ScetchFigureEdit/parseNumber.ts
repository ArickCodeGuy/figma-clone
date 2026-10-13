/**
 * Number from input text, or `undefined` while it isn't one yet
 * (empty, `-`, `1e`), so half-typed values don't reach the figure
 */
export function parseNumber(text: string): number | undefined {
  if (text.trim() === '') return undefined;

  const n = Number(text);
  return Number.isFinite(n) ? n : undefined;
}
