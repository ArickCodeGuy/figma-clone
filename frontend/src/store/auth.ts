import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { readToken } from '../api/authController';

export type AuthStore = {
  /** JWT token, `null` when logged out. Written to localStorage by the listener in `store.ts` */
  token: string | null;
};

const initialState: AuthStore = {
  token: readToken(),
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loggedIn(store, action: PayloadAction<string>) {
      store.token = action.payload;
    },
    loggedOut(store) {
      store.token = null;
    },
  },
});

export const { loggedIn, loggedOut } = authSlice.actions;

export const selectAuthToken = (store: { auth: AuthStore }) => store.auth.token;

export const selectIsLoggedIn = (store: { auth: AuthStore }) =>
  store.auth.token !== null;

export default authSlice.reducer;
