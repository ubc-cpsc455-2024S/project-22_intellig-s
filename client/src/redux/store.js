import { configureStore } from "@reduxjs/toolkit";
import itineraryReducer from "./itinerarySlice";
import daysReducer from "./daySlice";
import authReducer from "./authSlice";
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    itineraries: itineraryReducer,
    days: daysReducer,
    auth: authReducer,
    user: userReducer,
  },
});

export default store;
