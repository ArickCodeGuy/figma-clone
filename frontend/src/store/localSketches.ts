import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { SketchItemFull } from '../api/sketchesController';
import { LOCAL_SKETCH_ID, readLocalSketches } from '../api/localSketches';

/** Sketches stored in localStorage. Written back by the listener in `store.ts` */
export type LocalSketchesStore = {
  /** Only one is supported for now, it is always at index 0 */
  sketches: SketchItemFull[];
};

const initialState: LocalSketchesStore = {
  sketches: readLocalSketches(),
};

export const localSketchesSlice = createSlice({
  name: 'localSketches',
  initialState,
  reducers: {
    /** Saves `payload` as the local sketch (index 0) */
    localSketchSaved(store, action: PayloadAction<SketchItemFull>) {
      store.sketches[0] = { ...action.payload, id: LOCAL_SKETCH_ID };
    },
    /** Removes the local sketch with id `payload` */
    localSketchDeleted(store, action: PayloadAction<number>) {
      store.sketches = store.sketches.filter((s) => s.id !== action.payload);
    },
    clearLocalSketches(store) {
      localStorage.removeItem('LOCAL_SKETCHES');
      store.sketches = readLocalSketches();
    },
  },
});

export const { localSketchSaved, localSketchDeleted, clearLocalSketches } =
  localSketchesSlice.actions;

export const selectLocalSketches = (store: {
  localSketches: LocalSketchesStore;
}) => store.localSketches.sketches;

/** The local sketch, `undefined` when nothing is saved yet */
export const selectLocalSketch = (store: {
  localSketches: LocalSketchesStore;
}): SketchItemFull | undefined => store.localSketches.sketches[0];

export default localSketchesSlice.reducer;
