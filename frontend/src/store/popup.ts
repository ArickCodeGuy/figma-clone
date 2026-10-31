import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { KModalProps } from 'figmaclone-uikit';
import type { SketchItem } from '../api/sketchesController';

/** Popups that can be shown. Each name maps to a component in `components/Popup/popups.ts` */
export type PopupName = 'login' | 'sketch';

/** Props of each popup's content component. Plain data only, it is stored in Redux */
export type PopupContentProps = {
  login: Record<string, never>;
  /**
   * `sketch.id === -1` creates a new sketch.
   * `isLocal` edits the sketch stored in the browser (`localSketches`) instead of the backend
   */
  sketch: { sketch: SketchItem; isLocal?: boolean };
};

/** Serializable part of `KModalProps`. `children` and `close` come from `PopupHost` */
export type PopupModalProps = Pick<KModalProps, 'className' | 'style'>;

export type PopupStore = {
  isShown: boolean;
  /** Kept after closing, so the content stays visible during the close animation */
  name: PopupName | null;
  modalProps: PopupModalProps;
  contentProps: PopupContentProps[PopupName] | null;
  /** Changes on every show, so the content mounts fresh (e.g. an empty form) */
  showId: number;
};

const initialState: PopupStore = {
  isShown: false,
  name: null,
  modalProps: {},
  contentProps: null,
  showId: 0,
};

export const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    popupShown(
      state,
      action: PayloadAction<{
        name: PopupName;
        modalProps?: PopupModalProps;
        contentProps?: PopupContentProps[PopupName];
      }>,
    ) {
      state.isShown = true;
      state.name = action.payload.name;
      state.modalProps = action.payload.modalProps ?? {};
      state.contentProps = action.payload.contentProps ?? null;
      state.showId++;
    },
    popupClosed(state) {
      state.isShown = false;
    },
  },
});

export const { popupShown, popupClosed } = popupSlice.actions;
export default popupSlice.reducer;
