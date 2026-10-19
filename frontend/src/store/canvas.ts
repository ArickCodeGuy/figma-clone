import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
  type ThunkDispatch,
  type UnknownAction,
} from '@reduxjs/toolkit';
import { SketchCanvasState } from '../views/Sketch/classes/SketchCanvasState';
import { Folder } from '../views/Sketch/classes/FileSystem';
import { localSketchSaved, selectLocalSketch } from './localSketches';
import {
  createSketchItemFull,
  sketchesController,
  SketchRequestError,
  type SketchItemFull,
} from '../api/sketchesController';
import { isLocalSketchId } from '../api/localSketches';
import type { StoreState } from './store';

/** `idle` before the first `openSketch` */
export type SketchLoadStatus = 'idle' | 'loading' | 'loaded' | 'error';
export type SketchSaveStatus = 'idle' | 'saving' | 'saved' | 'error';

export type CanvasStore = {
  state: SketchCanvasState;
  /**
   * Opened sketch: title, description and the id `saveSketch` writes to.
   * `content` is the last loaded or saved value, `state.sketch.root` holds the live one
   */
  sketchItem: SketchItemFull;
  loadStatus: SketchLoadStatus;
  /** Message for the user when `loadStatus` is `error` */
  loadError: string | undefined;
  saveStatus: SketchSaveStatus;
  /** `requestId` of the latest `openSketch`. Older requests that finish later are ignored */
  openRequestId: string | undefined;
  /**
   * `state` is mutated outside Redux, so selectors would never re-run on its own changes.
   * Bumped on every "select" and "selectedFigureMove" event to notify subscribers (e.g. `SketchSideMenu`)
   */
  selectedFigureVersion: number;
};

type ThunkConfig = { state: StoreState };

const sketchCanvasState = new SketchCanvasState({
  // debug: true,
});

const initialState: CanvasStore = {
  state: sketchCanvasState,
  sketchItem: createSketchItemFull(),
  loadStatus: 'idle',
  loadError: undefined,
  saveStatus: 'idle',
  openRequestId: undefined,
  selectedFigureVersion: 0,
};

/** `content` of a sketch as a root folder. Empty for new sketches and broken values */
function parseRoot(content: string | undefined): Folder {
  if (!content) return new Folder('root');

  try {
    return Folder.fromString(content);
  } catch (e) {
    console.error('canvas: saved sketch is invalid, ignoring it', e);
    return new Folder('root');
  }
}

function errorMessage(err: unknown): string {
  return err instanceof SketchRequestError
    ? err.message
    : 'Could not reach the server';
}

/**
 * Loads sketch `id` into `sketchItem` and the canvas:
 * the local one from `localSketches`, any other from the backend
 */
export const openSketch = createAsyncThunk<SketchItemFull, number, ThunkConfig>(
  'canvas/openSketch',
  async (id, { getState, requestId, rejectWithValue }) => {
    // Don't keep showing the previous sketch while the next one loads
    sketchCanvasState.sketch.root = new Folder('root');
    sketchCanvasState.setSelectedFigure(undefined);

    let item: SketchItemFull;
    if (isLocalSketchId(id)) {
      item = selectLocalSketch(getState()) ?? createSketchItemFull();
    } else {
      try {
        item = await sketchesController.getSketch(id);
      } catch (err) {
        return rejectWithValue(errorMessage(err));
      }
    }

    // Another sketch was opened while this one loaded, the reducer ignores it too
    if (getState().canvas.openRequestId === requestId) {
      sketchCanvasState.sketch.root = parseRoot(item.content);
    }
    return item;
  },
);

/**
 * Saves `state.sketch.root` as the opened sketch's `content`:
 * to `localSketches` (and so localStorage) for the local one, to the backend for others
 */
export const saveSketch = createAsyncThunk<SketchItemFull, void, ThunkConfig>(
  'canvas/saveSketch',
  async (_, { getState, dispatch, rejectWithValue }) => {
    const { sketchItem, loadStatus } = getState().canvas;
    // Saving now would overwrite the sketch with an empty or half loaded canvas
    if (loadStatus !== 'loaded') return rejectWithValue('Sketch is not loaded');

    const item: SketchItemFull = {
      ...sketchItem,
      content: sketchCanvasState.sketch.root.toString(),
    };

    if (isLocalSketchId(item.id)) {
      dispatch(localSketchSaved(item));
      return item;
    }

    try {
      return await sketchesController.updateSketch(item);
    } catch (err) {
      console.error('canvas: could not save the sketch', err);
      return rejectWithValue(errorMessage(err));
    }
  },
);

export const canvasSlice = createSlice({
  name: 'canvas',
  initialState,
  reducers: {
    selectedFigureChanged(store) {
      store.selectedFigureVersion++;
    },
    /** Title or description changed elsewhere (e.g. `SketchPopup`) */
    sketchItemChanged(store, action: PayloadAction<Partial<SketchItemFull>>) {
      store.sketchItem = { ...store.sketchItem, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(openSketch.pending, (store, action) => {
        store.openRequestId = action.meta.requestId;
        store.sketchItem = { ...createSketchItemFull(), id: action.meta.arg };
        store.loadStatus = 'loading';
        store.loadError = undefined;
        store.saveStatus = 'idle';
      })
      .addCase(openSketch.fulfilled, (store, action) => {
        if (store.openRequestId !== action.meta.requestId) return;
        store.sketchItem = action.payload;
        store.loadStatus = 'loaded';
      })
      .addCase(openSketch.rejected, (store, action) => {
        if (store.openRequestId !== action.meta.requestId) return;
        store.loadStatus = 'error';
        store.loadError = action.payload as string | undefined;
      })
      .addCase(saveSketch.pending, (store) => {
        store.saveStatus = 'saving';
      })
      .addCase(saveSketch.fulfilled, (store, action) => {
        // Another sketch was opened while saving
        if (store.sketchItem.id !== action.payload.id) return;
        store.sketchItem = action.payload;
        store.saveStatus = 'saved';
      })
      .addCase(saveSketch.rejected, (store) => {
        store.saveStatus = 'error';
      });
  },
});

export const { selectedFigureChanged, sketchItemChanged } = canvasSlice.actions;

export const selectSelectedFigure = (store: { canvas: CanvasStore }) =>
  store.canvas.state.selectedFigure;

/**
 * Changes whenever the selected figure is replaced or mutated.
 * `selectSelectedFigure` returns the same object while a figure is dragged,
 * so subscribe to this too to re-render with its new values
 */
export const selectSelectedFigureVersion = (store: { canvas: CanvasStore }) =>
  store.canvas.selectedFigureVersion;

export const selectSketchItem = (store: { canvas: CanvasStore }) =>
  store.canvas.sketchItem;

export const selectSketchLoadStatus = (store: { canvas: CanvasStore }) =>
  store.canvas.loadStatus;

export const selectSketchLoadError = (store: { canvas: CanvasStore }) =>
  store.canvas.loadError;

export const selectSketchSaveStatus = (store: { canvas: CanvasStore }) =>
  store.canvas.saveStatus;

/** Forwards `SketchCanvasState` events to Redux. Called once in `store.ts`, after the store is created */
export function connectCanvasState(
  dispatch: ThunkDispatch<StoreState, unknown, UnknownAction>,
) {
  sketchCanvasState.subscribe((eventName) => {
    if (eventName === 'select' || eventName === 'selectedFigureMove')
      dispatch(selectedFigureChanged());

    if (eventName === 'save') dispatch(saveSketch());
  });
}

export default canvasSlice.reducer;
