import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dayLists: {},
};

export const daySlice = createSlice({
  name: "days",
  initialState,
  reducers: {
    setDays: (state, action) => {
      console.log("In daySlice, payload: ",action.payload);
      console.log("In daySlice, state.days: ",state.dayLists);
      const { id, days } = action.payload;
      if (!state.dayLists[id]) {
        state.dayLists[id] = days;
      }
    },
    addDay: (state, action) => {
      const { id, day } = action.payload;
      if (state.dayLists[id]) {
        state.dayLists[id].push(day);
      } else {
        state.dayLists[id] = [day];
      }
    },
    updateDay: (state, action) => {
      const { itineraryId, dayId, changes } = action.payload;
      const days = state.dayLists[itineraryId];
      const index = days.findIndex((day) => day.id === dayId);
      if (index !== -1) {
        days[index] = { ...days[index], ...changes };
      }
    },
  },
});

export const { setDays, addDays, updateDay } = daySlice.actions;

export default daySlice.reducer;
