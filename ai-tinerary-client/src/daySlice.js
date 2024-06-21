import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  days: [],
};

export const daySlice = createSlice({
  name: "days",
  initialState,
  reducers: {
    setDays: (state, action) => {
      state.days = action.payload;
    },
    addDays: (state, action) => {
      action.payload.forEach(newDay => {
        const existingIndex = state.days.findIndex(day => day.id === newDay.id);
        if (existingIndex !== -1) {
          // Day with the same id already exists, choose to update or ignore
          // For example, update the existing day
          state.days[existingIndex] = { ...state.days[existingIndex], ...newDay };
        } else {
          // Day does not exist, add it to the state
          state.days.push(newDay);
        }
      });
    },
    updateDay: (state, action) => {
      const { id, changes } = action.payload;
      const index = state.days.findIndex((day) => day.id === id);
      if (index !== -1) {
        state.days[index] = { ...state.days[index], ...changes };
      }
    },
  },
});

export const { setDays, addDays, updateDay } = daySlice.actions;

export default daySlice.reducer;
