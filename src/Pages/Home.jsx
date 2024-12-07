import React, { useEffect, useState, useMemo, Suspense } from "react";
import SideNav from "./Partials/SideNav";
import TopNav from "./Partials/TopNav";
import axios from "../Utils/axios";
import Header from "./Partials/Header";

const LazyHorizontalCards = React.lazy(() =>
  import("./Partials/HorizontalCards")
);

const Home = () => {
  document.title = "MovieMaze |  HomePage";
  const generData = [
    { title: "Latest Releases", apiEndpoint: "/movie/now_playing" },
    { title: "Action Movies", apiEndpoint: "/discover/movie?with_genres=28" },
    {
      title: "Adventure Movies",
      apiEndpoint: "/discover/movie?with_genres=12",
    },
    {
      title: "Animation Movies",
      apiEndpoint: "/discover/movie?with_genres=16",
    },
    { title: "Comedy Movies", apiEndpoint: "/discover/movie?with_genres=35" },
    { title: "Crime Movies", apiEndpoint: "/discover/movie?with_genres=80" },
    { title: "Documentary", apiEndpoint: "/discover/movie?with_genres=99" },
    { title: "Drama TV Shows", apiEndpoint: "/discover/tv?with_genres=18" },
    { title: "Fantasy Movies", apiEndpoint: "/discover/movie?with_genres=14" },
    { title: "Horror Movies", apiEndpoint: "/discover/movie?with_genres=27" },
    {
      title: "Romantic Movies",
      apiEndpoint: "/discover/movie?with_genres=10749",
    },
    {
      title: "Science Fiction Movies",
      apiEndpoint: "/discover/movie?with_genres=878",
    },
    {
      title: "Kids' Cartoons (Family Movies)",
      apiEndpoint: "/discover/movie?with_genres=10751",
    },
    { title: "Mystery TV Shows", apiEndpoint: "/discover/tv?with_genres=9648" },
    {
      title: "Reality TV Shows",
      apiEndpoint: "/discover/tv?with_genres=10764",
    },
    {
      title: "Sci-Fi & Fantasy TV Shows",
      apiEndpoint: "/discover/tv?with_genres=10765",
    },
    {
      title: "Anime TV Shows",
      apiEndpoint: "/discover/tv?with_genres=16&with_keywords=210024",
    },
    { title: "Thriller Movies", apiEndpoint: "/discover/movie?with_genres=53" },
    { title: "History Movies", apiEndpoint: "/discover/movie?with_genres=36" },
  ];

  const [wallpaper, setWallpaper] = useState([]);

  const getHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get("/trending/all/day");
      setWallpaper(data.results.slice(4, 12));
    } catch (error) {
      console.error("Error fetching wallpaper:", error);
    }
  };

  useEffect(() => {
    getHeaderWallpaper();
  }, []);

  const memoizedWallpaper = useMemo(() => wallpaper, [wallpaper]);

  return (
    <>
      <SideNav />

      <div className=" h-full  overflow-auto relative w-[100%]">
        <div className=" fixed w-full z-10">
          <div className="bg-gradient-to-b from-[#00000095] to-transparent w-full h-[11vh] py-3  flex item bg-center justify-center">
            <TopNav />
          </div>
        </div>
        <Header wallpaper={memoizedWallpaper} />
        <Suspense fallback={<div>Loading...</div>}>
          {generData.map(({ title, apiEndpoint }, index) => (
            <LazyHorizontalCards
              key={index}
              title={title}
              apiEndpoint={apiEndpoint}
            />
          ))}
        </Suspense>
      </div>
    </>
  );
};

export default Home;
