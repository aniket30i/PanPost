import { configureStore } from "@reduxjs/toolkit";
import panReducer from "./UserSlice";
import postalReducer from "./PostalSlice";

export const store = configureStore({
  reducer: {
    pan: panReducer,
    postal: postalReducer,
  },
});
