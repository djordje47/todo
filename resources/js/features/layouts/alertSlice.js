import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  alerts: [],
}

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlert: (state, {payload}) => {
      state.alerts = [...payload];
    },
    removeAlert: (state) => {
      state.alerts = [];
    }
  }
});

export const {setAlert, removeAlert, removeAllAlerts} = alertSlice.actions;

export default alertSlice.reducer;