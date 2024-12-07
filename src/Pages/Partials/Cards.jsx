import React from "react";
import { Link } from "react-router-dom";

const Cards = ({ data }) => {
  return (
    <div className=" w-full  px-[8vw] py-3 grid grid-cols-5 bg-secondary gap-y-10">
      {data.map(({ poster_path,profile_path }, index) => (
        <Link
          key={index}
          className="h-80 w-56 flex-shrink-0 overflow-hidden rounded-md bg-red-50"
        >
          <img
            className="h-full hover:scale-105 ease-linear duration-200  w-full object-cover"
            src={`https://image.tmdb.org/t/p/original${poster_path || profile_path}`}
          />
        </Link>
      ))}
    </div>
  );
};

export default Cards;
