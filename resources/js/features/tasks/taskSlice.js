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
    },
    removeTask: (state, {payload}) => {
      state.tasks = state.tasks.filter((alert, index) => (index !== payload))
    }
  }
});

export const {setTasks, removeTask} = taskSlice.actions;

export default taskSlice.reducer;