import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  isSidebarToggled: false,
  selectedTask: {
    id: null,
    title: '',
    subtitle: '',
    notes: ''
  },
}

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setTasks: (state, {payload}) => {
      state.tasks = payload;
    },
    removeTask: (state, {payload}) => {
      state.tasks.data = state.tasks.data.filter((task, index) => (task.id !== payload))
    },
    updateTask: (state, {payload}) => {
      const index = state.tasks.data.findIndex(task => task.id === payload.id); //finding index of the item
      const newArray = [...state.tasks.data]; //making a new array
      newArray[index] = payload;//changing value in the new array
      state.tasks.data = newArray;
    },
    setSelectedTask: (state, {payload}) => {
      state.selectedTask = payload;
    },
    toggleFavorite: (state, {payload}) => {
      const index = state.tasks.data.findIndex(task => task.id === payload); //finding index of the item
      const newArray = [...state.tasks.data]; //making a new array
      newArray[index].is_favorite = !newArray[index].is_favorite; //changing value in the new array
      state.tasks.data = newArray;
    },
    toggleCompleted: (state, {payload}) => {
      const index = state.tasks.data.findIndex(task => task.id === payload); //finding index of the item
      const newArray = [...state.tasks.data]; //making a new array
      newArray[index].is_completed = !newArray[index].is_completed; //changing value in the new array
      state.tasks.data = newArray;
    },
    setTaskTitle: (state, {payload}) => {
      state.selectedTask.title = payload === null ? '' : payload;
    },
    setTaskSubtitle: (state, {payload}) => {
      state.selectedTask.subtitle = payload === null ? '' : payload;
    },
    setTaskNotes: (state, {payload}) => {
      state.selectedTask.notes = payload === null ? '' : payload;
    },
    toggleSidebar: (state, {payload}) => {
      state.isSidebarToggled = payload;
    }
  }
});

export const {
  setTasks,
  removeTask,
  updateTask,
  setSelectedTask,
  setTaskTitle,
  setTaskNotes,
  setTaskSubtitle,
  toggleSidebar,
  toggleFavorite,
  toggleCompleted
} = taskSlice.actions;

export default taskSlice.reducer;