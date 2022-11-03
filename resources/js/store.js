import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import alertReducer from "./features/layouts/alertSlice";
import taskListReducer from "./features/taskList/taskListSlice";
import taskReducer from "./features/tasks/taskSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    alert: alertReducer,
    taskList: taskListReducer,
    task: taskReducer
  },
});