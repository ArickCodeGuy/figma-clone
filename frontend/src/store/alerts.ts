import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { KAlertType } from 'figmaclone-uikit';

export type AlertType = KAlertType;

export type Alert = {
  id: number;
  type: AlertType;
  title: string;
  content: string;
  /** Closes itself after this many ms, `0` stays until closed by hand */
  timeout: number;
};

export type AlertsStore = Alert[];

/** Default `Alert['timeout']` */
export const ALERT_TIMEOUT = 5000;

/** Oldest alerts are dropped beyond this, so a burst of errors can't fill the screen */
const MAX_ALERTS = 5;

let lastId = 0;

const initialState: AlertsStore = [];

export const alertsSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    alertShown: {
      reducer(store, action: PayloadAction<Alert>) {
        store.push(action.payload);
        if (store.length > MAX_ALERTS)
          store.splice(0, store.length - MAX_ALERTS);
      },
      // The id is made here, not in the reducer: reducers must stay pure
      prepare(alert: Omit<Alert, 'id' | 'timeout'> & { timeout?: number }) {
        return {
          payload: {
            ...alert,
            id: ++lastId,
            timeout: alert.timeout ?? ALERT_TIMEOUT,
          },
        };
      },
    },
    alertClosed(store, action: PayloadAction<Alert['id']>) {
      return store.filter((alert) => alert.id !== action.payload);
    },
  },
});

export const { alertShown, alertClosed } = alertsSlice.actions;

export const selectAlerts = (store: { alerts: AlertsStore }) => store.alerts;

export default alertsSlice.reducer;
