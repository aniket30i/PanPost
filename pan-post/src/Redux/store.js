import { configureStore } from "@reduxjs/toolkit";
import panReducer from "./UserSlice";

export const store = configureStore({
  reducer: {
    pan: panReducer,
  },
});
