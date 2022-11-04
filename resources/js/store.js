import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import alertReducer from "./features/layouts/alertSlice";
import taskListReducer from "./features/taskList/taskListSlice";
import taskReducer from "./features/tasks/taskSlice";
import storage from 'redux-persist/lib/storage';
import {persistReducer, persistStore} from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage,
}


const rootReducer = combineReducers({
  user: userReducer,
  alert: alertReducer,
  taskList: taskListReducer,
  task: taskReducer
})
const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
});
export const persistor = persistStore(store)