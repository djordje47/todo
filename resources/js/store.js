import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import alertReducer from "./features/layouts/alertSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    alert: alertReducer
  },
});