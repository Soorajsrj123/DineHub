import { createSlice } from "@reduxjs/toolkit";

const dishSlice = createSlice({
  name: "dishes",
  initialState: {
    dishes: [],
  },
  reducers: {
    setDishes(state, action) {
      state.dishes = action.payload;
    },
  },
});

export const { setDishes } = dishSlice.actions;

export default dishSlice.reducer;
