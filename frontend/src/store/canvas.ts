import { createSlice, type Dispatch } from '@reduxjs/toolkit';
import { ScetchCanvasState } from '../views/Scetch/classes/ScetchCanvasState';

export type CanvasStore = {
  state: ScetchCanvasState;
  /**
   * `state` is mutated outside Redux, so selectors would never re-run on its own changes.
   * Bumped on every "select" and "selectedFigureMove" event to notify subscribers (e.g. `ScetchSideMenu`)
   */
  selectedFigureVersion: number;
};

const scetchCanvasState = new ScetchCanvasState({
  // debug: true,
});

const initialState: CanvasStore = {
  state: scetchCanvasState,
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

/** Forwards `ScetchCanvasState` events to Redux. Called once in `store.ts`, after the store is created */
export function connectCanvasState(dispatch: Dispatch) {
  scetchCanvasState.subscribe((eventName) => {
    if (eventName === 'select' || eventName === 'selectedFigureMove')
      dispatch(selectedFigureChanged());
  });
}

export default canvasSlice.reducer;
