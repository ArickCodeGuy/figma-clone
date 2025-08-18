import { configureStore } from '@reduxjs/toolkit';
import counterReducer, { type CounterStore } from './counter';

export type StoreState = {
  counter: CounterStore;
};

export const store = configureStore<StoreState>({
  reducer: {
    counter: counterReducer,
  },
});
