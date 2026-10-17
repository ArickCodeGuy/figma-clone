import { configureStore } from '@reduxjs/toolkit';
import canvasReducer, { connectCanvasState, type CanvasStore } from './canvas';
import popupReducer, { type PopupStore } from './popup';

export type StoreState = {
  canvas: CanvasStore;
  popup: PopupStore;
};

/**
 * `canvas.state` is a `SketchCanvasState` instance (canvas element, 2D context, shape classes).
 * It is never serializable and is mutated outside Redux on purpose,
 * so the dev-only checks skip it. Everything else is still checked
 */
const IGNORED_PATHS = ['canvas.state'];

export const store = configureStore({
  reducer: {
    canvas: canvasReducer,
    popup: popupReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: { ignoredPaths: IGNORED_PATHS },
      immutableCheck: { ignoredPaths: IGNORED_PATHS },
    }),
});

// Keeps the explicit `StoreState` shape in sync with the reducers above
store.getState() satisfies StoreState;

connectCanvasState(store.dispatch);
