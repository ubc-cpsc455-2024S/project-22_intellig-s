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
  async (itineraryId, { getState, rejectWithValue }) => {
    const {
      auth: { token },
    } = getState();

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/days/${itineraryId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return { itineraryId, days: response.data };
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

// AI generate a new day for a specific itinerary
export const generateNewDay = createAsyncThunk(
  "days/generateNewDay",
  async ({ itineraryId }, { getState, rejectWithValue }) => {
    const {
      auth: { token },
    } = getState();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/days/generate`,
        { itineraryId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return { itineraryId, day: response.data };
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

// Remove a day from a specific itinerary
export const removeDay = createAsyncThunk(
  "days/removeDay",
  async ({ itineraryId, id }, { getState, rejectWithValue }) => {
    const {
      auth: { token },
    } = getState();

    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/days/${itineraryId}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return { itineraryId, id };
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

// Reorder all days by itinerary id
export const reorderDays = createAsyncThunk(
  "days/reorderDays",
  async ({ itineraryId, days }, { getState, rejectWithValue }) => {
    const {
      auth: { token },
    } = getState();

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/days/reorder`,
        {
          itineraryId: itineraryId,
          days: days,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return { itineraryId, days: days };
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

// Reorder all activities by day id
export const reorderActivities = createAsyncThunk(
  "days/reorderActivities",
  async ({ itineraryId, dayId, activities }, { getState, rejectWithValue }) => {
    const {
      auth: { token },
    } = getState();

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/days/activities/reorder`,
        {
          dayId: dayId,
          activities: activities,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      rejectWithValue(error);
    }
    return { itineraryId, dayId, activities };
  }
);

// Redux slice definition
const daySlice = createSlice({
  name: "days",
  initialState,
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
      .addCase(generateNewDay.pending, (state) => {
        state.status = "generating";
      })
      .addCase(generateNewDay.rejected, (state) => {
        state.status = "failed";
        alert("Generating new day failed, please try again");
      })
      .addCase(generateNewDay.fulfilled, (state, action) => {
        const { itineraryId, day } = action.payload;
        state.status = "succeeded";
        state.dayLists[itineraryId].push(day);
      })
      .addCase(removeDay.pending, (state) => {
        state.status = "deleting";
      })
      .addCase(removeDay.rejected, (state) => {
        state.status = "failed";
        alert("Day deletion failed, please try again.");
      })
      .addCase(removeDay.fulfilled, (state, action) => {
        const { itineraryId, id } = action.payload;
        const startDate = new Date(
          state.dayLists[itineraryId].find((day) => day.dayNumber === 1).date
        );

        state.dayLists[itineraryId] = state.dayLists[itineraryId]
          .filter((day) => day.id !== id)
          .map((day, index) => {
            const newDay = {
              ...day,
              dayNumber: index + 1,
              date: new Date(startDate).toISOString(),
            };
            startDate.setDate(startDate.getDate() + 1);
            return newDay;
          });
        state.status = "succeeded";
      })
      .addCase(reorderDays.fulfilled, (state, action) => {
        const { itineraryId, days } = action.payload;
        state.dayLists[itineraryId] = days;
      })
      .addCase(reorderActivities.fulfilled, (state, action) => {
        const { itineraryId, dayId, activities } = action.payload;
        state.dayLists[itineraryId].find((day) => day.id === dayId).activities =
          activities;
      });
  },
});

// Export actions and reducer
export const { addDay, setDays } = daySlice.actions;
export default daySlice.reducer;
