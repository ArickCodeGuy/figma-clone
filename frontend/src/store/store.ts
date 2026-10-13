import { configureStore } from '@reduxjs/toolkit';
import counterReducer, { type CounterStore } from './counter';
import canvasReducer, { connectCanvasState, type CanvasStore } from './canvas';

export type StoreState = {
  counter: CounterStore;
  canvas: CanvasStore;
};

/**
 * `canvas.state` is a `ScetchCanvasState` instance (canvas element, 2D context, shape classes).
 * It is never serializable and is mutated outside Redux on purpose,
 * so the dev-only checks skip it. Everything else is still checked
 */
const IGNORED_PATHS = ['canvas.state'];

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    canvas: canvasReducer,
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
