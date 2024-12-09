import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "./Reducers/movieSlice";
import tvSlice from "./Reducers/tvSlice";
import peopleSlice from "./Reducers/peopleSlice";

export const store = configureStore({
    reducer:{
        movie: movieSlice,
        tv: tvSlice,
        people: peopleSlice,
    }
})
