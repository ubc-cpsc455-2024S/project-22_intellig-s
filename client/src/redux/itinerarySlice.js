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
  async () => {
    return await itinerariesAPI.getItineraries();
  }
);

export const addItineraryAsync = createAsyncThunk(
  actionTypes.ADD_ITINERARY,
  async (itinerary) => {
    return await itinerariesAPI.addItinerary(itinerary);
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
    itineraryList: [],
    status: "idle",
  },
  extraReducers: (builder) => {
    builder
      .addCase(getItinerariesAsync.fulfilled, (state, action) => {
        state.itineraryList = action.payload;
      })
      .addCase(addItineraryAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addItineraryAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.itineraryList.push(action.payload);
      })
      .addCase(deleteItineraryAsync.fulfilled, (state, action) => {
        const membersList = state.itineraryList;
        const removedMembersList = membersList.filter((member) => {
          return member.id != action.payload;
        });
        state.itineraryList = removedMembersList;
      });
  },
});

export default itinerarySlice.reducer;
