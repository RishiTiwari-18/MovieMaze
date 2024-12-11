import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { asyncMovie, removeMovie } from "../Store/Actions/movieAction";
import { IoMdArrowRoundBack } from "react-icons/io";
import { LiaImdb } from "react-icons/lia";
import { FaWikipediaW } from "react-icons/fa";
import { PiGlobeSimple } from "react-icons/pi";
import { FaStar } from "react-icons/fa6";
import Loading from "./Partials/Loading";
import { SiAppletv } from "react-icons/si";
import { FaGooglePlay } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { SiPrime } from "react-icons/si";
import { SiNetflix } from "react-icons/si";
import { TbBrandDisney } from "react-icons/tb";
import HorizontalCards from "./Partials/HorizontalCards";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

const MovieDetails = () => {
  const navigate = useNavigate();
  const { info } = useSelector((state) => state.movie);
  console.log(info);

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncMovie(id));

    return () => {
      dispatch(removeMovie());
    };
  }, [dispatch, id]);

  return info.detail || info.externalid || info.videos ? (
    <div
      style={{
        background: `url(https://image.tmdb.org/t/p/original${info.detail.poster_path})  no-repeat`,
        backgroundPosition: "center 40%",
        backgroundSize: "cover",
      }}
      className="h-fit w-full "
    >
      <div
        style={{
          backdropFilter: "blur(20px)",
        }}
        className=" text-white bg-[#0000007f] pb-[5vw] w-full"
      >
        <nav className="py-6 px-8 items-center flex gap-6">
          <div
            onClick={() => navigate(-1)}
            className=" p-1 mr-8 text-xl bg-[#ffffff29] rounded-full hover:scale-95 hover:text-zinc-300  w-fit"
          >
            <IoMdArrowRoundBack />
          </div>
          <a
            target="_blank"
            href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}
          >
            <LiaImdb className="text-2xl hover:text-zinc-300 " />
          </a>
          <a
            target="_blank"
            href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
          >
            <FaWikipediaW className="text-xl hover:text-zinc-300" />
          </a>
          <a target="_blank" href={info.detail.homepage}>
            <PiGlobeSimple className="text-xl hover:text-zinc-300" />
          </a>
        </nav>

        <div className="px-[10vw] pt-4">
          <h1 className="text-2xl text-white mb-2">
            {info.detail.title || info.detail.original_title}
          </h1>
          <div className="py-2 text-zinc-300 flex items-center justify-between">
            <div className="flex gap-4">
              <h3 className="text-xs font-sans">
                {info.detail.release_date.split("-")[0]}
              </h3>
              <h3 className="text-xs font-sans">{info.detail.runtime} min</h3>
            </div>
            <div className="flex gap-3">
              <h3 className="text-xs font-sans flex items-center gap-1.5 bg-[#ffffff49] px-2.5 rounded-md text-white py-1 ">
                <FaStar className="text-[#FFD700]" />
                {info.detail.vote_average.toFixed(1)} /10
              </h3>
            </div>
          </div>
          <div className="flex gap-6 mt-2">
            <div className=" h-[28vw] w-[25%] overflow-hidden  rounded-lg ">
              <img
                className="h-full w-full object-cover"
                src={`https://image.tmdb.org/t/p/original${info.detail.poster_path}`}
                alt=""
              />
            </div>
            <div className=" h-[28vw] w-[75%] overflow-hidden rounded-lg ">
              {info.videos ? <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${info.videos.key}?controls=0&modestbranding=1&rel=0`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe> :               <img
              className="h-full w-full object-cover"
              src={`https://image.tmdb.org/t/p/original${info.detail.backdrop_path}`}
              alt=""
            />}
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-lg mb-2">Genre</h2>
            <div className="flex items-center gap-3">
              {info.detail.genres.map((item, index) => (
                <h3
                  key={index}
                  className="text-xs font-sans flex items-center gap-1.5 bg-[#ffffff49] px-2.5 rounded-md text-white py-1 "
                >
                  {item.name}
                </h3>
              ))}
            </div>

            <h2 className="text-lg mb-1 mt-6">Plot</h2>
            <p className="flex items-center text-sm font-sans gap-3">
              {info.detail.overview}
            </p>

            {info.watchProviders && (
              <>
                {info.watchProviders.buy && (
                  <>
                    <h2 className="text-lg mb-2 mt-6">Buy</h2>
                    <div className="flex items-center  gap-3">
                      {info.watchProviders.buy.map((item, index) => (
                        <div
                          key={index}
                          className="text-xs font-sans flex items-center gap-1.5 bg-[#ffffff49] px-2.5 rounded-md text-white py-1 "
                        >
                          {item.provider_name == "Apple TV" && (
                            <SiAppletv className="text-2xl" />
                          )}
                          {item.provider_name == "Google Play Movies" && (
                            <FaGooglePlay className="text-2xl" />
                          )}
                          {item.provider_name == "YouTube" && (
                            <FaYoutube className="text-2xl  " />
                          )}
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {info.watchProviders.rent && (
                  <>
                    <h2 className="text-lg mb-2 mt-6">Rent</h2>
                    <div className="flex items-center  gap-3">
                      {info.watchProviders.rent.map((item, index) => (
                        <div
                          key={index}
                          className="text-xs font-sans flex items-center gap-1.5 bg-[#ffffff49] px-2.5 rounded-md text-white py-1 "
                        >
                          {item.provider_name == "Apple TV" && (
                            <SiAppletv className="text-2xl" />
                          )}
                          {item.provider_name == "Google Play Movies" && (
                            <FaGooglePlay className="text-2xl" />
                          )}
                          {item.provider_name == "YouTube" && (
                            <FaYoutube className="text-2xl  " />
                          )}
                          {item.provider_name == "Amazon Video" && (
                            <SiPrime className="text-2xl " />
                          )}
                          {item.provider_name == "Hotstar" && (
                            <TbBrandDisney className="text-2xl  " />
                          )}
                          {item.provider_name == "Zee5" && (
                            <img
                              className="h-6"
                              src={`https://image.tmdb.org/t/p/original${item.logo_path}`}
                              alt=""
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {info.watchProviders.flatrate && (
                  <>
                    <h2 className="text-lg mb-2 mt-6">Stream</h2>
                    <div className="flex items-center  gap-3">
                      {info.watchProviders.flatrate.map((item, index) => (
                        <div
                          key={index}
                          className="text-xs font-sans flex items-center gap-1.5 bg-[#ffffff49] px-2.5 rounded-md text-white py-1 "
                        >
                          {item.provider_name == "Amazon Video" && (
                            <SiPrime className="text-2xl]" />
                          )}
                          {item.provider_name == "Amazon Prime Video" && (
                            <SiPrime className="text-2xl]" />
                          )}
                          {item.provider_name == "Netflix" && (
                            <SiNetflix className="text-2xl " />
                          )}
                          {item.provider_name == "Hotstar" && (
                            <TbBrandDisney className="text-2xl " />
                          )}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </>
            )}

            <div className="w-full text-white mb-8 h-[50vh]">
              <div className="flex items-center justify-between">
                <h1 className=" text-xl py-6 mt-6">Recommendations</h1>
              </div>

              <Swiper
                spaceBetween={10}
                slidesPerView={5.5}
              >
                {info.recommendations.map((item, index) => (
                  <SwiperSlide key={index}>
                    <Link to={`/movie/details/${item.id}`}>
                      <div className="h-72 w-52 flex-shrink-0 overflow-hidden rounded-md bg-red-50">
                        <img
                          className="h-full hover:scale-105 ease-linear duration-200  w-full object-cover"
                          src={`https://image.tmdb.org/t/p/original${
                            item.poster_path || item.backdrop_path
                          }`}
                        />
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default MovieDetails;
