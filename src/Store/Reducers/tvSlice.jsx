import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: [],
};

export const tvSlice = createSlice({
  name: "tv",
  initialState,
  reducers: {
    loadtv: (state, action) => {
      state.info = action.payload;
    },
    removetv: (state, action) => {
      state.info = [];
    },
  },
});

export const {loadtv, removetv} = tvSlice.actions;

export default tvSlice.reducer;
