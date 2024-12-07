import axios from "../../Utils/axios";
import React, { useEffect, useState, useCallback } from "react";
import { CgSearch } from "react-icons/cg";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

const TopNav = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState("");
  const [searches, setSearches] = useState([]);
  const getSearch = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setSearches(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSearch();
  }, [query]);

  return (
    <>
      <div
        className={`ease-linear duration-200 py-1 h-[8vh] relative  bg-[#191b21] text-white px-6 rounded-[20px] flex items-center justify-between ${
          isFocused ? "w-[48vw]" : "w-[36vw]"
        }`}
      >
        <CgSearch className={` text-xl ${!isFocused && "mr-4"}`} />
        <input
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          type="text"
          className={` ${
            isFocused ? "w-[89%]" : "w-[94%]"
          } outline-none border-[2px] border-[#191b21] focus:border-[#2c2e35] bg-[#22242a] px-4 rounded-[14px] h-full`}
          placeholder="Search"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {isFocused && (
          <IoClose
            onMouseDown={() => setQuery("")}
            className={` text-xl ${!isFocused && "ml-3"}`}
          />
        )}

        <div className="absolute z-20 flex bg-[#191b21] top-nav-component overflow-y-auto text-white flex-col gap-1 rounded-md max-h-[50vh] top-[9vh] left-16 w-[40vw]">
          {searches.map((item, index) => (
            <Link
              key={index}
              className=" flex gap-8 items-center bg-[#1e2025] px-3 py-3 rounded-md"
            >
              {item.poster_path || item.backdrop_path || item.profile_path ? (
                <img
                  className="h-20 w-20 object-cover"
                  src={`https://image.tmdb.org/t/p/w500${
                    item.poster_path || item.backdrop_path
                  }`}
                  alt={
                    item.original_title ||
                    item.name ||
                    item.original_name ||
                    item.title
                  }
                />
              ) : (
                <div className="h-20 w-20 0 flex ">
                  <img
                    className=" h-full w-full object-cover"
                    src="https://th.bing.com/th/id/OIP.H1gHhKVbteqm1U5SrwpPgwAAAA?rs=1&pid=ImgDetMain"
                    alt=""
                  />
                </div>
              )}
              {item.original_title ||
                item.name ||
                item.original_name ||
                item.title}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default TopNav;
