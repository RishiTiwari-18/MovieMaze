import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Trending from "./Pages/Trending";
import Popular from "./Pages/Popular";
import Movies from "./Pages/Movies";
import MovieDetails from "./Pages/MovieDetails";
import TvShows from "./Pages/TvShows";
import TvDetails from "./Pages/TvDetails";
import People from "./Pages/People";
import PeopleDetail from "./Pages/PeopleDetail";

const App = () => {
  return (
    <div className="h-screen w-screen flex font-[nudica] bg-[#0f1014]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/movie" element={<Movies />} />
        <Route path="/movie/details/:id" element={<MovieDetails />} />
        <Route path="/tv" element={<TvShows />} />
        <Route path="/tv/details/:id" element={<TvDetails />} />
        <Route path="/peoples" element={<People />} />
        <Route path="/peoples/details/:id" element={<PeopleDetail />} />
      </Routes>
    </div>
  );
};

export default App;
