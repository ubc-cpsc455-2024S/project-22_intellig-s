import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  dayLists: {}, // This will store days grouped by itineraryId
  status: "idle",
  error: null,
};

// Async thunks for CRUD operations

// Fetch days for a specific itinerary
export const fetchDays = createAsyncThunk(
  "days/fetchDays",
  async (itineraryId) => {
    const response = await axios.get(
      `http://localhost:5000/days/${itineraryId}`
    );
    console.log("In fetchDays: ", response.data);
    return { itineraryId, days: response.data };
  }
);

// Add a new day to a specific itinerary
export const addNewDay = createAsyncThunk(
  "days/addNewDay",
  async ({ itineraryId, day }) => {
    console.log("In daySlice.js", itineraryId, { day: day });
    const response = await axios.post("http://localhost:5000/days", {
      day: day,
    });
    return { itineraryId, day: response.data };
  }
);

// Update an existing day in a specific itinerary
export const updateDay = createAsyncThunk(
  "days/updateDay",
  async ({ itineraryId, dayNumber, changes }) => {
    const response = await axios.put(
      `http://localhost:5000/days/${itineraryId}/${dayNumber}`,
      changes
    );
    return { itineraryId, dayNumber, changes: response.data };
  }
);

// Remove a day from a specific itinerary
export const removeDay = createAsyncThunk(
  "days/removeDay",
  async ({ itineraryId, id }) => {
    await axios.delete(`http://localhost:5000/days/${itineraryId}/${id}`);
    return { itineraryId, id };
  }
);

// Redux slice definition
const daySlice = createSlice({
  name: "days",
  initialState,
  reducers: {
    // Non-async action to set days directly
    setDays: (state, action) => {
      const { itineraryId, days } = action.payload;
      state.dayLists[itineraryId] = [...days];
      console.log("In daySlice setDays, ", days);
    },
    // Non-async action to add a day directly
    addDay: (state, action) => {
      const { itineraryId, day } = action.payload;
      if (state.dayLists[itineraryId]) {
        state.dayLists[itineraryId].push(day);
      } else {
        state.dayLists[itineraryId] = [day];
      }
    },
    // Non-async action to update a day directly
    updateDay: (state, action) => {
      const { itineraryId, dayNumber, changes } = action.payload;
      const days = state.dayLists[itineraryId];
      const index = days.findIndex((day) => day.dayNumber === dayNumber);
      if (index !== -1) {
        days[index] = { ...days[index], ...changes };
      }
    },
    // Non-async action to remove a day directly
    removeDay: (state, action) => {
      const { itineraryId, id } = action.payload;
      state.dayLists[itineraryId] = state.dayLists[itineraryId].filter(
        (day) => day.id !== id
      );
    },
  },
  // Extra reducers for handling async actions
  extraReducers(builder) {
    builder
      .addCase(fetchDays.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDays.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { itineraryId, days } = action.payload;
        state.dayLists[itineraryId] = days;
      })
      .addCase(fetchDays.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewDay.fulfilled, (state, action) => {
        const { itineraryId, day } = action.payload;
        if (state.dayLists[itineraryId]) {
          state.dayLists[itineraryId].push(day);
        } else {
          state.dayLists[itineraryId] = [day];
        }
      })
      .addCase(updateDay.fulfilled, (state, action) => {
        const { itineraryId, dayNumber, changes } = action.payload;
        const days = state.dayLists[itineraryId];
        const index = days.findIndex((day) => day.dayNumber === dayNumber);
        if (index !== -1) {
          days[index] = { ...days[index], ...changes };
        }
      })
      .addCase(removeDay.fulfilled, (state, action) => {
        const { itineraryId, id } = action.payload;
        state.dayLists[itineraryId] = state.dayLists[itineraryId].filter(
          (day) => day.id !== id
        );
      });
  },
});

// Export actions and reducer
export const { addDay, setDays } = daySlice.actions;
export default daySlice.reducer;
