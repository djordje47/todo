import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  taskLists: [],
  activeTaskList: null
}
export const taskListSlice = createSlice({
  name: 'taskList',
  initialState,
  reducers: {
    setTaskLists: (state, {payload}) => {
      state.taskLists = payload;
    },
    setActiveTaskList: (state, {payload}) => {
      console.log(payload)
      state.activeTaskList = payload;
    }
  }
});

export const {setTaskLists, setActiveTaskList} = taskListSlice.actions;
export default taskListSlice.reducer;