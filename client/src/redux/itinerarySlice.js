// src/redux/itinerarySlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import itinerariesAPI from "./itinerariesAPI";

const actionTypes = {
  GET_ITINERARIES: "itineraries/getItineraries",
  ADD_ITINERARY: "itineraries/addItinerary",
  DELETE_ITINERARY: "itineraries/deleteItinerary",
};

export const getItinerariesAsync = createAsyncThunk(
  actionTypes.GET_ITINERARIES,
  async (userId) => {
    return await itinerariesAPI.getItineraries(userId);
  }
);

export const addItineraryAsync = createAsyncThunk(
  actionTypes.ADD_ITINERARY,
  async ({ userId, itinerary }) => {
    return await itinerariesAPI.addItinerary(userId, itinerary);
  }
);

export const deleteItineraryAsync = createAsyncThunk(
  actionTypes.DELETE_ITINERARY,
  async (itinerary) => {
    return await itinerariesAPI.deleteItinerary(itinerary);
  }
);

const itinerarySlice = createSlice({
  name: "itineraries",
  initialState: {
    value: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(getItinerariesAsync.fulfilled, (state, action) => {
        state.value = action.payload;
      })
      .addCase(addItineraryAsync.fulfilled, (state, action) => {
        state.value.push(action.payload);
      })
      .addCase(deleteItineraryAsync.fulfilled, (state, action) => {
        const membersList = state.value;
        const removedMembersList = membersList.filter((member) => {
          return member.id != action.payload;
        });
        state.value = removedMembersList;
      });
  },
});

export default itinerarySlice.reducer;
export const selectItineraries = (state) => state.itineraries.value;
