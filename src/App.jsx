import React, { useEffect, useState } from "react";
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
  // Alert users to use a VPN if they can't see any data
  alert("Please use a VPN if you can't see any data because the API used to get the data is not available in India.");

  const [isLaptop, setIsLaptop] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsLaptop(window.innerWidth >= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!isLaptop) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-[#0f1014] text-white">
        <h1 className=" text-2xl">Please open on a desktop device</h1>
      </div>
    );
  }

  return (
    <div className={`h-screen w-screen flex ${"font-[nudica]" || "font-sans"} bg-[#0f1014]`}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/movie" element={<Movies />} />
        <Route path="/movie/details/:id" element={<MovieDetails />} />
        <Route path="/tv" element={<TvShows />} />
        <Route path="/tv/details/:id" element={<TvDetails />} />
        <Route path="/people" element={<People />} />
        <Route path="/person/details/:id" element={<PeopleDetail/>} />
      </Routes>
    </div>
  );
};

export default App;
