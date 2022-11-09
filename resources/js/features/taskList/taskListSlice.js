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
    },
    deleteTaskList: (state, {payload}) => {
      state.taskLists = state.taskLists.filter((list, index) => list.id !== payload);
    }
  }
});

export const {setTaskLists, setActiveTaskList, createTaskList, deleteTaskList} = taskListSlice.actions;
export default taskListSlice.reducer;