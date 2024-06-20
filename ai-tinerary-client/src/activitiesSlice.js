import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0, // Ensure this matches the property name used in reducers
};

export const activitiesSlice = createSlice({
  name: "activities",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } =
  activitiesSlice.actions;

export default activitiesSlice.reducer;
