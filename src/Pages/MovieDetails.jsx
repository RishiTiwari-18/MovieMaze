import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { asyncMovie, removeMovie } from "../Store/Actions/movieAction";
import { IoMdArrowRoundBack } from "react-icons/io";
import { LiaImdb } from "react-icons/lia";
import { FaWikipediaW, FaStar, FaGooglePlay, FaYoutube } from "react-icons/fa";
import { PiGlobeSimple } from "react-icons/pi";
import { SiAppletv, SiPrime, SiNetflix } from "react-icons/si";
import { TbBrandDisney } from "react-icons/tb";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import Loading from "./Partials/Loading";

const MovieDetails = () => {
  const navigate = useNavigate();
  const { info } = useSelector((state) => state.movie);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncMovie(id));
    return () => {
      dispatch(removeMovie());
    };
  }, [dispatch, id]);

  if (!info.detail && !info.externalid && !info.videos) {
    return <Loading />;
  }

  const renderProviderIcon = (providerName) => {
    switch (providerName) {
      case "Apple TV":
        return <SiAppletv className="text-2xl" />;
      case "Google Play Movies":
        return <FaGooglePlay className="text-2xl" />;
      case "YouTube":
        return <FaYoutube className="text-2xl" />;
      case "Amazon Video":
      case "Amazon Prime Video":
        return <SiPrime className="text-2xl" />;
      case "Netflix":
        return <SiNetflix className="text-2xl" />;
      case "Hotstar":
        return <TbBrandDisney className="text-2xl" />;
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        background: `url(https://image.tmdb.org/t/p/original${info.detail.poster_path}) no-repeat center 40% / cover`,
      }}
      className="h-fit w-full"
    >
      <div className="text-white bg-[#0000007f] pb-[5vw] w-full" style={{ backdropFilter: "blur(20px)" }}>
        <nav className="py-6 px-8 items-center flex gap-6">
          <div onClick={() => navigate(-1)} className="p-1 mr-8 text-xl bg-[#ffffff29] rounded-full hover:scale-95 hover:text-zinc-300 w-fit">
            <IoMdArrowRoundBack />
          </div>
          <a target="_blank" href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}>
            <LiaImdb className="text-2xl hover:text-zinc-300" />
          </a>
          <a target="_blank" href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}>
            <FaWikipediaW className="text-xl hover:text-zinc-300" />
          </a>
          <a target="_blank" href={info.detail.homepage}>
            <PiGlobeSimple className="text-xl hover:text-zinc-300" />
          </a>
        </nav>

        <div className="px-[10vw] pt-4">
          <h1 className="text-2xl text-white mb-2">{info.detail.title || info.detail.original_title}</h1>
          <div className="py-2 text-zinc-300 flex items-center justify-between">
            <div className="flex gap-4">
              <h3 className="text-xs font-sans">{info.detail.release_date.split("-")[0]}</h3>
              <h3 className="text-xs font-sans">{info.detail.runtime} min</h3>
            </div>
            <div className="flex gap-3">
              <h3 className="text-xs font-sans flex items-center gap-1.5 bg-[#ffffff49] px-2.5 rounded-md text-white py-1">
                <FaStar className="text-[#FFD700]" />
                {info.detail.vote_average.toFixed(1)} /10
              </h3>
            </div>
          </div>
          <div className="flex gap-6 mt-2">
            <div className="h-[28vw] w-[25%] overflow-hidden rounded-lg">
              <img className="h-full w-full object-cover" src={`https://image.tmdb.org/t/p/original${info.detail.poster_path}`} alt="" />
            </div>
            <div className="h-[28vw] w-[75%] overflow-hidden rounded-lg">
              {info.videos ? (
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${info.videos.key}?controls=0&modestbranding=1&rel=0`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <img className="h-full w-full object-cover" src={`https://image.tmdb.org/t/p/original${info.detail.backdrop_path}`} alt="" />
              )}
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-lg mb-2">Genre</h2>
            <div className="flex items-center gap-3">
              {info.detail.genres.map((item, index) => (
                <h3 key={index} className="text-xs font-sans flex items-center gap-1.5 bg-[#ffffff49] px-2.5 rounded-md text-white py-1">
                  {item.name}
                </h3>
              ))}
            </div>

            <h2 className="text-lg mb-1 mt-6">Plot</h2>
            <p className="flex items-center text-sm font-sans gap-3">{info.detail.overview}</p>

            {info.watchProviders && (
              <>
                {["buy", "rent", "flatrate"].map((type) => (
                  info.watchProviders[type] && (
                    <div key={type}>
                      <h2 className="text-lg mb-2 mt-6">{type.charAt(0).toUpperCase() + type.slice(1)  == "Flatrate" &&  "Stream"}</h2>
                      <div className="flex items-center gap-3">
                        {info.watchProviders[type].map((item, index) => (
                          <div key={index} className="text-xs font-sans flex items-center gap-1.5 bg-[#ffffff49] px-2.5 rounded-md text-white py-1">
                            {renderProviderIcon(item.provider_name)}
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
                {(info.recommendations.length > 0 ? info.recommendations : info.similar).map((item, index) => (
                  <SwiperSlide key={index}>
                    <Link to={`/movie/details/${item.id}`}>
                      <div className="h-72 w-52 flex-shrink-0 overflow-hidden rounded-md bg-red-50">
                        <img className="h-full hover:scale-105 ease-linear duration-200 w-full object-cover" loading="lazy" src={`https://image.tmdb.org/t/p/original${item.poster_path || item.backdrop_path}`} />
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

export default MovieDetails;
