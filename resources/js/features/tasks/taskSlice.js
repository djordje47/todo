import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  selectedTask: null,
  taskSidebarToggled: false
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
    },
    setSelectedTask: (state, {payload}) => {
      state.selectedTask = payload;
    },
    toggleTaskSidebar: (state) => {
      state.taskSidebarToggled = !state.taskSidebarToggled;
    }
  }
});

export const {setTasks, removeTask, toggleTaskSidebar, setSelectedTask} = taskSlice.actions;

export default taskSlice.reducer;