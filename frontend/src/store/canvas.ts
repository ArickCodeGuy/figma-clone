import { createSlice, type Dispatch } from '@reduxjs/toolkit';
import { SketchCanvasState } from '../views/Sketch/classes/SketchCanvasState';

export type CanvasStore = {
  state: SketchCanvasState;
  /**
   * `state` is mutated outside Redux, so selectors would never re-run on its own changes.
   * Bumped on every "select" and "selectedFigureMove" event to notify subscribers (e.g. `SketchSideMenu`)
   */
  selectedFigureVersion: number;
};

const sketchCanvasState = new SketchCanvasState({
  // debug: true,
});

const initialState: CanvasStore = {
  state: sketchCanvasState,
  selectedFigureVersion: 0,
};

export const canvasSlice = createSlice({
  name: 'canvas',
  initialState,
  reducers: {
    selectedFigureChanged(store) {
      store.selectedFigureVersion++;
    },
  },
});

export const { selectedFigureChanged } = canvasSlice.actions;

export const selectSelectedFigure = (store: { canvas: CanvasStore }) =>
  store.canvas.state.selectedFigure;

/**
 * Changes whenever the selected figure is replaced or mutated.
 * `selectSelectedFigure` returns the same object while a figure is dragged,
 * so subscribe to this too to re-render with its new values
 */
export const selectSelectedFigureVersion = (store: { canvas: CanvasStore }) =>
  store.canvas.selectedFigureVersion;

/** Forwards `SketchCanvasState` events to Redux. Called once in `store.ts`, after the store is created */
export function connectCanvasState(dispatch: Dispatch) {
  sketchCanvasState.subscribe((eventName) => {
    if (eventName === 'select' || eventName === 'selectedFigureMove')
      dispatch(selectedFigureChanged());
  });
}

export default canvasSlice.reducer;
