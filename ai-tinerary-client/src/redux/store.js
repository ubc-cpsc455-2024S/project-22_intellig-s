import { configureStore } from "@reduxjs/toolkit";
import itineraryReducer from "./itinerarySlice";

const store = configureStore({
  reducer: {
    itineraries: itineraryReducer,
  },
});

export default store;
