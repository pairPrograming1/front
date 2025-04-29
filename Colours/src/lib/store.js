import { configureStore } from "@reduxjs/toolkit";
import ticketsReducer from "./slices/ticketsSlice";
import profileReducer from "./slices/profileSlice";

export const store = configureStore({
  reducer: {
    tickets: ticketsReducer,
    profile: profileReducer,
  },
});
