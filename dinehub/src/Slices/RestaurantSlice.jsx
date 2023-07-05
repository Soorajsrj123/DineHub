import { createSlice } from "@reduxjs/toolkit";

const RestaurntSlice = createSlice({
  name: "search",
  initialState: {
    searchHotels: null,
    homeHotel: null,
  },
  reducers: {
    setsearchHotels(state, action) {
      state.searchHotels = action.payload;
    },
    removesearchHotels(state, action) {
      state.searchHotels = null;
    },
    setHomeHotel(state, action) {
      state.homeHotel = action.payload;
    },
    removeHomeHotel(state, action) {
      state.homeHotel = null;
    },
  },
});

export const {
  setsearchHotels,
  removesearchHotels,
  setHomeHotel,
  removeHomeHotel,
} = RestaurntSlice.actions;
export default RestaurntSlice.reducer;
