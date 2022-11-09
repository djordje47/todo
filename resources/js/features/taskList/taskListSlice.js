import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  taskLists: [],
  activeTaskList: null,
  listOffset: null
}
export const taskListSlice = createSlice({
  name: 'taskList',
  initialState,
  reducers: {
    setTaskLists: (state, {payload}) => {
      state.taskLists = payload;
    },
    setActiveTaskList: (state, {payload}) => {
      state.activeTaskList = payload;
    },
    createTaskList: (state, {payload}) => {
      state.taskLists = payload;
    }
  }
});

export const {setTaskLists, setActiveTaskList, createTaskList} = taskListSlice.actions;
export default taskListSlice.reducer;