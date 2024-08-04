// src/redux/itinerarySlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import itinerariesAPI from "./itinerariesAPI";
import axios from "axios";

const actionTypes = {
  GET_ITINERARIES: "itineraries/getItineraries",
  ADD_ITINERARY: "itineraries/addItinerary",
  DELETE_ITINERARY: "itineraries/deleteItinerary",
  GET_ITINERARY_CALENDAR: "itineraries/getItineraryCalendar",
  GET_ITINERARY_PDF: "itineraries/getItineraryPdf",
};

export const getItinerariesAsync = createAsyncThunk(
  actionTypes.GET_ITINERARIES,
  async (_, { getState }) => {
    const {
      auth: { token },
    } = getState();
    return await itinerariesAPI.getItineraries(token);
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

export const getItineraryCalendar = createAsyncThunk(
  actionTypes.GET_ITINERARY_CALENDAR,
  async (itineraryId, { getState }) => {
    const {
      auth: { token },
      itineraries: { itineraryList },
    } = getState();

    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/itineraries/cal/${itineraryId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
      }
    );

    const itineraryTitle = itineraryList.find(
      (itinerary) => itinerary.id === itineraryId
    ).location;

    const url = window.URL.createObjectURL(response.data, {
      type: "text/calendar",
    });

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", url);
    linkElement.setAttribute("download", `${itineraryTitle}.ics`);
    linkElement.click();
    URL.revokeObjectURL(url);
  }
);

export const getItineraryPdf = createAsyncThunk(
  actionTypes.GET_ITINERARY_PDF,
  async (itineraryId, { getState }) => {
    const {
      auth: { token },
      itineraries: { itineraryList },
    } = getState();

    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/itineraries/pdf/${itineraryId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
      }
    );

    const itineraryTitle = itineraryList.find(
      (itinerary) => itinerary.id === itineraryId
    ).location;

    const url = window.URL.createObjectURL(response.data, {
      type: "application/pdf",
    });

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", `${url}`);
    linkElement.setAttribute("download", `${itineraryTitle}.pdf`);
    linkElement.click();
    URL.revokeObjectURL(url);
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
      })
      .addCase(getItineraryCalendar.pending, (state) => {
        state.status = "downloading";
      })
      .addCase(getItineraryCalendar.rejected, (state) => {
        state.status = "failed";
        alert("Downloading calendar invitation failed, please try again");
      })
      .addCase(getItineraryCalendar.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(getItineraryPdf.pending, (state) => {
        state.status = "downloading";
      })
      .addCase(getItineraryPdf.rejected, (state) => {
        state.status = "failed";
        alert("Downloading PDF failed, please try again");
      })
      .addCase(getItineraryPdf.fulfilled, (state) => {
        state.status = "succeeded";
      });
  },
});

export const { incrementItineraryEndDate, decrementItineraryEndDate } =
  itinerarySlice.actions;

export default itinerarySlice.reducer;
