import React from "react";
import { BsCalendarDateFill } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import { RiTvFill } from "react-icons/ri";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";

const Header = ({ wallpaper }) => {
  if (!wallpaper) return <div className=" text-white">Loading</div>;

  const shouldLoop = wallpaper.length > 1;

  return (
    <div className="h-[80vh] z-0 rounded-bl-md overflow-hidden relative w-full">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        loop={shouldLoop}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper relative h-full w-full"
      >
        {wallpaper.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="absolute w-full px-[3%] py-[3%] flex flex-col justify-end h-full bg-gradient-to-tr from-[#0000008f] to-transparent">
              <h1 className=" text-[42px] text-white">
                {item.name ||
                  item.original_name ||
                  item.original_title ||
                  item.title}
              </h1>
              <div className="flex gap-4 text-zinc-300 items-center">
                <span className="bg-[#00000048] flex items-center gap-2 px-1.5 rounded-md text-xs py-0.5"> <BsCalendarDateFill/> {item.first_air_date || item.release_date}</span>
                <span className="bg-[#00000048] flex items-center gap-2 px-1.5 rounded-md text-xs py-0.5"><RiTvFill/> {item.media_type}</span>
              </div>
              <p className=" w-[45%] font-normal text-white font-sans mt-3">
                {item.overview}
              </p>
            </div>
            <img
              className="w-full h-full object-cover object-top"
              src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
              alt=""
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Header;
