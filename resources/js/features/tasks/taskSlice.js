import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
}

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setTasks: (state, {payload}) => {
      state.tasks = payload;
    }
    // removeAlert: (state, {payload}) => {
    //   state.alerts = state.alerts.filter((alert, index) => (index !== payload))
    // }
  }
});

export const {setTasks} = taskSlice.actions;

export default taskSlice.reducer;