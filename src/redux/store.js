import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import groupsReducer from './slice/groupsSlice'
export const store = configureStore({
  reducer: {
    user: userReducer,
    groups: groupsReducer,
  },
});