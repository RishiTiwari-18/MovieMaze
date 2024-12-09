import React, { useEffect, useMemo, useState, useCallback } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import DropDown from "./Partials/DropDown";
import TopNav from "./Partials/TopNav";
import axios from "../Utils/axios";
import { debounce } from "lodash";
import InfiniteScroll from "react-infinite-scroll-component";

const People = () => {
  document.title = "MovieMaze | People";
  const [category, setCategory] = useState("popular");
  const [people, setPeople] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const getPopularPeople = useCallback(
    debounce(async () => {
      try {
        const { data } = await axios.get(`/person/${category}?page=${page}`);
        setPeople((prev) =>
          page === 1 ? data.results : [...prev, ...data.results]
        );
        setError(null);
        setHasMore(data.results.length > 0);
      } catch (error) {
        console.error("Error fetching popular people:", error);
        setError("Failed to fetch popular people.");
        setHasMore(false);
      }
    }, 300),
    [page, category]
  );

  useEffect(() => {
    getPopularPeople();
    return () => {
      getPopularPeople.cancel();
    };
  }, [getPopularPeople]);

  const memoizedPeople = useMemo(() => people, [people]);

  const navigate = useNavigate();

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setPage(1);
  };

  return people.length > 0 ? (
    <div className="h-screen text-white w-screen">
      <div className="flex items-center px-10 py-3 mb-14 justify-between">
        <Link onClick={() => navigate(-1)} className="flex items-center gap-4">
          <FaArrowLeft />
          <h1 className="text-xl">People</h1>
        </Link>
        <TopNav />
        <div className="flex items-center gap-2">
          <DropDown
            title="Category"
            options={["popular"]}
            onChange={handleCategoryChange}
          />
        </div>
      </div>

      {error && <div className="text-red-500">{error}</div>}
      <InfiniteScroll
        dataLength={people.length}
        hasMore={hasMore}
        next={() => setPage((prev) => prev + 1)}
        loader={<h1 className="text-2xl ml-32">Loading...</h1>}
      >
        <div className=" w-full  px-[8vw] py-3 grid grid-cols-5 bg-secondary gap-y-10">
          {memoizedPeople.map(
            (
              {
                poster_path,
                profile_path,
                name,
                original_name,
              },
              index
            ) => (
              <Link
                key={index}
                className="h-[350px] p-2 w-56 flex-shrink-0 overflow-hidden rounded-md"
              >
                <div className="h-[87%] rounded-md overflow-hidden w-full">
                  <img
                    className="h-full hover:scale-105 ease-linear duration-200  w-full object-cover"
                    src={`https://image.tmdb.org/t/p/original${
                      poster_path || profile_path
                    }`}
                  />
                </div>

                <div className="flex items-end h-[13%] justify-between">
                  <h1 className="text-lg  text-white">
                    {name || original_name}
                  </h1>
                </div>
              </Link>
            )
          )}
        </div>
      </InfiniteScroll>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default People;
