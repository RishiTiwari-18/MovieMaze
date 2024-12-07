import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Trending from "./Pages/Trending";
import Popular from "./Pages/Popular";
import Movies from "./Pages/Movies";
import TvShows from "./Pages/TvShows";
import People from "./Pages/People";
const App = () => {
  return (
    <div className="h-screen w-screen flex font-[nudica] bg-[#0f1014]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending/>}/>
        <Route path="/popular" element={<Popular/>} />
        <Route path="/movies" element={<Movies/>} />
        <Route path="/tv-shows" element={<TvShows/>}/>
        <Route path="/peoples" element={<People/>}/>
      </Routes>
    </div>
  );
};

export default App;
