import axios from "../../Utils/axios";
import React, { useEffect, useState, useCallback } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

const HorizontalCards = React.memo(({ apiEndpoint, title }) => {
  const [latestMovie, setLatestMovie] = useState([]);

  const getLatestMovie = useCallback(async () => {
    try {
      const { data } = await axios.get(apiEndpoint);
      setLatestMovie(data.results);
    } catch (error) {
      console.log("Error fetching latest movie:", error);
    }
  }, [apiEndpoint]);

  useEffect(() => {
    getLatestMovie();
  }, [getLatestMovie]);

  console.log(latestMovie);
  

  return (
    <div className="w-full text-white mb-8 h-[50vh]">
      <div className="flex items-center justify-between">
      <h1 className=" text-xl py-6 mt-6">{title}</h1>
      </div>

      <Swiper
        spaceBetween={10}
        slidesPerView={6.5}
        scrollbar={{ draggable: true }}
      >
        {latestMovie.map(({ poster_path ,backdrop_path}, index) => (
          <SwiperSlide key={index}>
            <div className="h-72 w-52 flex-shrink-0 overflow-hidden rounded-md bg-red-50">
              <img className="h-full hover:scale-105 ease-linear duration-200  w-full object-cover" src={`https://image.tmdb.org/t/p/original${poster_path || backdrop_path}`} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
});

export default HorizontalCards;
