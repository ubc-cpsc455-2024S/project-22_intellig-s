import { configureStore } from "@reduxjs/toolkit";
import itineraryReducer from "./itinerarySlice";
import daysReducer from "./daySlice";

const store = configureStore({
  reducer: {
    itineraries: itineraryReducer,
    days: daysReducer,
  },
});

export default store;
