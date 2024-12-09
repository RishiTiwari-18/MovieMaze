import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: [],
};

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    loadMovie: (state, action) => {
      state.info = action.payload;
    },
    removeMovie: (state, action) => {
      state.info = [];
    },
  },
});

export const {loadMovie, removeMovie} = movieSlice.actions;

export default movieSlice.reducer;
