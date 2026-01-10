import { createSlice } from '@reduxjs/toolkit';
import { ScetchCanvasState } from '../views/Scetch/classes/ScetchCanvasState';

export type CanvasStore = {
  state: ScetchCanvasState;
};

export const canvasReducer = createSlice({
  name: 'canvas',
  initialState: {
    state: new ScetchCanvasState({
      debug: true,
    }),
  },
  reducers: {},
});

export default canvasReducer.reducer;
