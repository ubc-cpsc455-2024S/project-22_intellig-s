// src/redux/itinerarySlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialItineraries = [
  {
    id: 1,
    name: "Trip to Paris",
    dates: "June 12 - June 13, 2024",
    imageUrl:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=3273&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    name: "Explore Tokyo",
    dates: "August 15 - August 25, 2024",
    imageUrl:
      "https://images.unsplash.com/photo-1544885935-98dd03b09034?q=80&w=3059&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    name: "New York Adventure",
    dates: "September 5 - September 15, 2024",
    imageUrl:
      "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const itinerarySlice = createSlice({
  name: "itineraries",
  initialState: initialItineraries,
  reducers: {
    addItinerary: (state, action) => {
      state.push(action.payload);
    },
    deleteItinerary: (state, action) => {
      return state.filter(itinerary => itinerary.id !== action.payload);
    }
  },
});

export const { addItinerary, deleteItinerary } = itinerarySlice.actions;
export default itinerarySlice.reducer;
