import { configureStore } from "@reduxjs/toolkit";
import itineraryReducer from "./itinerarySlice";
import daysReducer from "./daySlice";
import authReducer from "./authSlice";

const store = configureStore({
  reducer: {
    itineraries: itineraryReducer,
    days: daysReducer,
    auth: authReducer,
  },
});

export default store;
