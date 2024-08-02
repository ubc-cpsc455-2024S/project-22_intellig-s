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

export const generateItineraryAsync = createAsyncThunk(
  actionTypes.ADD_ITINERARY,
  async (itineraryPayload) => {
    return await itinerariesAPI.addItinerary(itineraryPayload);
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
  reducers: {
    incrementItineraryEndDate(state, action) {
      const itinerary = state.itineraryList.find(
        (itinerary) => itinerary.id === action.payload.itineraryId
      );

      const endDate = new Date(itinerary.endDate);
      itinerary.endDate = endDate.setDate(endDate.getDate() + 1);
    },
    decrementItineraryEndDate(state, action) {
      const itinerary = state.itineraryList.find(
        (itinerary) => itinerary.id === action.payload.itineraryId
      );

      const endDate = new Date(itinerary.endDate);
      itinerary.endDate = endDate.setDate(endDate.getDate() - 1);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getItinerariesAsync.fulfilled, (state, action) => {
        state.itineraryList = action.payload;
      })
      .addCase(generateItineraryAsync.pending, (state) => {
        state.status = "generating";
      })
      .addCase(generateItineraryAsync.rejected, (state) => {
        state.status = "failed";
        alert("Generating new itinerary failed, please try again");
      })
      .addCase(generateItineraryAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.itineraryList.unshift(action.payload);
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

export const { incrementItineraryEndDate, decrementItineraryEndDate } =
  itinerarySlice.actions;

export default itinerarySlice.reducer;
