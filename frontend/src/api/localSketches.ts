import type { SketchItemFull } from './sketchesController';

/** localStorage key for sketches made without an account. Value is `SketchItemFull[]` */
export const LOCAL_SKETCHES_STORAGE_KEY = 'LOCAL_SKETCHES';

/** Id of the local sketch in routes (`/sketch/-1`). Backend ids are always positive */
export const LOCAL_SKETCH_ID = -1;

export function isLocalSketchId(id: number | undefined): boolean {
  return id === LOCAL_SKETCH_ID;
}

/**
 * Locally saved sketches. Empty when there are none or the stored value is broken.
 * Read once for the initial `localSketches` Redux state, use the store after that
 */
export function readLocalSketches(): SketchItemFull[] {
  let json: string | null;
  try {
    json = localStorage.getItem(LOCAL_SKETCHES_STORAGE_KEY);
  } catch {
    return []; // Storage is unavailable (e.g. blocked by the browser)
  }
  if (!json) return [];

  try {
    const sketches: unknown = JSON.parse(json);
    return Array.isArray(sketches) ? (sketches as SketchItemFull[]) : [];
  } catch {
    console.error('localSketches: stored sketches are invalid, ignoring them');
    return [];
  }
}

/** Called by the store whenever `localSketches` changes */
export function writeLocalSketches(sketches: SketchItemFull[]): void {
  localStorage.setItem(LOCAL_SKETCHES_STORAGE_KEY, JSON.stringify(sketches));
}
