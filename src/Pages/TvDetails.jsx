import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { asynctv, removetv } from "../Store/Actions/tvActions";
import { IoMdArrowRoundBack } from "react-icons/io";
import { LiaImdb } from "react-icons/lia";
import { FaWikipediaW, FaStar, FaGooglePlay, FaYoutube } from "react-icons/fa";
import { PiGlobeSimple } from "react-icons/pi";
import { SiAppletv, SiPrime, SiNetflix } from "react-icons/si";
import { TbBrandDisney } from "react-icons/tb";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import Loading from "./Partials/Loading";

const IconLink = ({ href, children }) => (
  <a target="_blank" href={href} className="text-xl hover:text-zinc-300">
    {children}
  </a>
);

const ProviderIcon = ({ providerName }) => {
  const icons = {
    "Apple TV": <SiAppletv className="text-2xl" />,
    "Google Play Movies": <FaGooglePlay className="text-2xl" />,
    "YouTube": <FaYoutube className="text-2xl" />,
    "Amazon Video": <SiPrime className="text-2xl" />,
    "Amazon Prime Video": <SiPrime className="text-2xl" />,
    "Netflix": <SiNetflix className="text-2xl" />,
    "Hotstar": <TbBrandDisney className="text-2xl" />,
  };
  return icons[providerName] || null;
};

const TvDetails = () => {
  const navigate = useNavigate();
  const { info } = useSelector((state) => state.tv);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asynctv(id));
    return () => {
      dispatch(removetv());
    };
  }, [dispatch, id]);

  if (!info.detail && !info.externalid && !info.videos) {
    return <Loading />;
  }

  const { detail, externalid, videos, watchProviders, recommendations } = info;
  

  return (
    <div
      style={{
        background: `url(https://image.tmdb.org/t/p/original${detail.poster_path}) no-repeat`,
        backgroundPosition: "center 40%",
        backgroundSize: "cover",
      }}
      className="h-fit w-full"
    >
      <div
        style={{ backdropFilter: "blur(20px)" }}
        className="text-white bg-[#0000007f] pb-[5vw] w-full"
      >
        <nav className="py-6 px-8 items-center flex gap-6">
          <div
            onClick={() => navigate(-1)}
            className="p-1 mr-8 text-xl bg-[#ffffff29] rounded-full hover:scale-95 hover:text-zinc-300 w-fit"
          >
            <IoMdArrowRoundBack />
          </div>
          <IconLink href={`https://www.imdb.com/title/${externalid.imdb_id}/`}>
            <LiaImdb className="text-2xl" />
          </IconLink>
          <IconLink href={`https://www.wikidata.org/wiki/${externalid.wikidata_id}`}>
            <FaWikipediaW className="text-xl" />
          </IconLink>
          <IconLink href={detail.homepage}>
            <PiGlobeSimple className="text-xl" />
          </IconLink>
        </nav>

        <div className="px-[10vw] pt-4">
          <h1 className="text-2xl text-white mb-2">
            {detail.name || detail.original_name}
          </h1>
          <div className="py-2 text-zinc-300 flex items-center justify-between">
            <div className="flex">
              <h3 className="text-xs font-sans">{detail.first_air_date.split("-")[0]}</h3>
              <h3 className="text-xs font-sans">-{detail.last_air_date.split("-")[0]}</h3>
              <h3 className="text-xs font-sans ml-4">{detail.number_of_seasons} seasons</h3>
              <h3 className="text-xs font-sans ml-4">{detail.episode_run_time[0]} min</h3>
            </div>
            <div className="flex gap-3">
              <h3 className="text-xs font-sans flex items-center gap-1.5 bg-[#ffffff49] px-2.5 rounded-md text-white py-1">
                <FaStar className="text-[#FFD700]" />
                {detail.vote_average.toFixed(1)} /10
              </h3>
            </div>
          </div>
          <div className="flex gap-6 mt-2">
            <div className="h-[28vw] w-[25%] overflow-hidden rounded-lg">
              <img
                className="h-full w-full object-cover"
                src={`https://image.tmdb.org/t/p/original${detail.poster_path}`}
                alt=""
              />
            </div>
            <div className="h-[28vw] w-[75%] overflow-hidden rounded-lg">
              {videos ? (
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${videos.key}?controls=0&modestbranding=1&rel=0`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <img
                  className="h-full w-full object-cover"
                  src={`https://image.tmdb.org/t/p/original${detail.backdrop_path}`}
                  alt=""
                />
              )}
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-lg mb-2">Genre</h2>
            <div className="flex items-center gap-3">
              {detail.genres.map((item, index) => (
                <h3
                  key={index}
                  className="text-xs font-sans flex items-center gap-1.5 bg-[#ffffff49] px-2.5 rounded-md text-white py-1"
                >
                  {item.name}
                </h3>
              ))}
            </div>

            <h2 className="text-lg mb-2 mt-6">Seasons</h2>
            <div className="flex items-center flex-wrap gap-3">
              {detail.seasons.map((item, index) => (
                <h3
                  key={index}
                  className="text-xs font-sans flex items-center gap-1.5 bg-[#ffffff49] px-2.5 rounded-md text-white py-1"
                >
                  {item.name}
                </h3>
              ))}
            </div>
            {info.detail.overview == " " && (
                <>
                  <h2 className="text-lg mb-2 mt-6">Plot</h2>
                  <p className="text-sm">{info.detail.overview}</p>
                </>
              )}

            {watchProviders && (
              <>
                {["buy", "rent", "flatrate"].map((type) => (
                  watchProviders[type] && (
                    <div key={type}>
                      <h2 className="text-lg mb-2 mt-6">{type.charAt(0).toUpperCase() + type.slice(1) == "Flatrate" &&  "Stream"}</h2>
                      <div className="flex items-center gap-3">
                        {watchProviders[type].map((item, index) => (
                          <div
                            key={index}
                            className="text-xs font-sans flex items-center gap-1.5 bg-[#ffffff49] px-2.5 rounded-md text-white py-1"
                          >
                            {ProviderIcon({ providerName: item.provider_name }) || (
                              <img
                                className="h-6 w-6 object-contain"
                                src={`https://image.tmdb.org/t/p/original${item.logo_path}`}
                                alt={item.provider_name}
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                ))}
              </>
            )}

            <div className="w-full text-white mb-8 h-[50vh]">
              <div className="flex items-center justify-between">
                <h1 className="text-xl py-6 mt-6">Recommendations</h1>
              </div>

              <Swiper spaceBetween={10} slidesPerView={5.5}>
                {recommendations.map((item, index) => (
                  <SwiperSlide key={index}>
                    <Link to={`/tv/details/${item.id}`}>
                      <div className="h-72 w-52 flex-shrink-0 overflow-hidden rounded-md bg-red-50">
                        <img
                          className="h-full hover:scale-105 ease-linear duration-200 w-full object-cover"
                          src={`https://image.tmdb.org/t/p/original${item.poster_path || item.backdrop_path}`}
                          alt=""
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
  );
};

export default TvDetails;
