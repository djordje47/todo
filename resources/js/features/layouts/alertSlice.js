import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  alerts: [],
}

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlert: (state, {payload}) => {
      state.alerts = [...state.alerts, payload];
    },
    removeAlert: (state, {payload}) => {
      state.alerts = state.alerts.filter((alert, index) => (index !== payload))
    }
  }
});

export const {setAlert, removeAlert, removeAllAlerts} = alertSlice.actions;

export default alertSlice.reducer;