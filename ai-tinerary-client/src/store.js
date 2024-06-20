import { configureStore } from "@reduxjs/toolkit";
import itinerariesReducer from "./itinerarySlice";
import daysReducer from "./daySlice";
import activitiesReducer from "./activitiesSlice";

const store = configureStore({
  reducer: {
    itineraries: itinerariesReducer,
    days: daysReducer,
    activities: activitiesReducer,
  },
});

export default store;
