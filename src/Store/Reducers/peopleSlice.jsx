import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: [],
};

export const peopleSlice = createSlice({
  name: "people",
  initialState,
  reducers: {
    loadpeople: (state, action) => {
      state.info = action.payload;
    },
    removepeople: (state, action) => {
      state.info = [];
    },
  },
});

export const { loadpeople, removepeople} = peopleSlice.actions;

export default peopleSlice.reducer;
