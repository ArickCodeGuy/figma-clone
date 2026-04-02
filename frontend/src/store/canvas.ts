import { createSlice } from '@reduxjs/toolkit';
import { ScetchCanvasState } from '../views/Scetch/classes/ScetchCanvasState';

// @@TODO figure this out
// We need to be able so select figure
// Update it's props

export type CanvasStore = {
  state: ScetchCanvasState;
};

const scetchCanvasState = new ScetchCanvasState({
  debug: true,
});

export const canvasSlice = createSlice({
  name: 'canvas',
  initialState: {
    state: scetchCanvasState,
    chosenFigureName: '',
    chosenFigureProps: {},
  },
  reducers: {},
});

scetchCanvasState.subscribe((eventName) => {
  console.log(eventName);
});

export default canvasSlice.reducer;
