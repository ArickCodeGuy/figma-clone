import { configureStore } from '@reduxjs/toolkit';
import counterReducer, { type CounterStore } from './counter';
import canvasReducer, { type CanvasStore } from './canvas';

export type StoreState = {
  counter: CounterStore;
  canvas: CanvasStore;
};

export const store = configureStore<StoreState>({
  reducer: {
    counter: counterReducer,
    canvas: canvasReducer,
  },
});
