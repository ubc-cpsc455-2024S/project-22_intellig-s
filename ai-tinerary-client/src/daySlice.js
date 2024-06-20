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
      state.days = [...state.days, ...action.payload];
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
