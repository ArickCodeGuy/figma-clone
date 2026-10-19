import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';
import canvasReducer, { connectCanvasState, type CanvasStore } from './canvas';
import popupReducer, { type PopupStore } from './popup';
import authReducer, { type AuthStore } from './auth';
import localSketchesReducer, { type LocalSketchesStore } from './localSketches';
import { setTokenSource, writeToken } from '../api/authController';
import { writeLocalSketches } from '../api/localSketches';

export type StoreState = {
  canvas: CanvasStore;
  popup: PopupStore;
  auth: AuthStore;
  localSketches: LocalSketchesStore;
};

/**
 * `canvas.state` is a `SketchCanvasState` instance (canvas element, 2D context, shape classes).
 * It is never serializable and is mutated outside Redux on purpose,
 * so the dev-only checks skip it. Everything else is still checked
 */
const IGNORED_PATHS = ['canvas.state'];

/** Mirrors `auth.token` and `localSketches` to localStorage */
const persistence = createListenerMiddleware<StoreState>();

persistence.startListening({
  predicate: (_, current, previous) => current.auth.token !== previous.auth.token,
  effect: (_, api) => writeToken(api.getState().auth.token),
});

persistence.startListening({
  predicate: (_, current, previous) =>
    current.localSketches.sketches !== previous.localSketches.sketches,
  effect: (_, api) => writeLocalSketches(api.getState().localSketches.sketches),
});

export const store = configureStore({
  reducer: {
    canvas: canvasReducer,
    popup: popupReducer,
    auth: authReducer,
    localSketches: localSketchesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: { ignoredPaths: IGNORED_PATHS },
      immutableCheck: { ignoredPaths: IGNORED_PATHS },
    }).prepend(persistence.middleware),
});

// Keeps the explicit `StoreState` shape in sync with the reducers above
store.getState() satisfies StoreState;

export type AppDispatch = typeof store.dispatch;

connectCanvasState(store.dispatch);
setTokenSource(() => store.getState().auth.token);
