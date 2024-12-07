import React from "react";
import { Link } from "react-router-dom";
import { BiSolidStar } from "react-icons/bi";
import { BsCalendarDateFill } from "react-icons/bs";

const Cards = ({ data }) => {

  return (
    <div className=" w-full  px-[8vw] py-3 grid grid-cols-5 bg-secondary gap-y-10">
      {data.map(
        (
          {
            poster_path,
            profile_path,
            vote_average,
            first_air_date,
            release_date,
            popularity
          },
          index
        ) => (
          <Link
            key={index}
            className="h-[350px] p-2 w-56 flex-shrink-0 overflow-hidden rounded-md"
          >
            <div className="h-[88%] rounded-md overflow-hidden w-full">
              <img
                className="h-full hover:scale-105 ease-linear duration-200  w-full object-cover"
                src={`https://image.tmdb.org/t/p/original${
                  poster_path || profile_path
                }`}
              />
            </div>

            <div className="flex items-end h-[12%] justify-between">
              <span className={` ${vote_average < 5 ? "bg-[#eeb90c89]" : "bg-[#0cee3989]"} w-fit flex gap-1 items-center px-1.5 rounded-md text-xs py-0.5`}>
                <BiSolidStar />
                {vote_average == 0 && popularity.toFixed() / 10 || vote_average.toFixed(1) }
              </span>
              <span className="bg-[#ffffff40] w-fit flex gap-1 items-center px-1.5 rounded-md text-xs py-0.5">
                <BsCalendarDateFill />
                {first_air_date || release_date}
              </span>
            </div>
          </Link>
        )
      )}
    </div>
  );
};

export default Cards;
