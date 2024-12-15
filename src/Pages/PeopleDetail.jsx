import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { asyncpeople, removepeople } from "../Store/Actions/peopleAction";
import Loading from "./Partials/Loading";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaFacebook, FaStar, FaWikipediaW } from "react-icons/fa";
import { BsCalendarDateFill, BsInstagram } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import { BiSolidStar } from "react-icons/bi";
import { LiaImdb } from "react-icons/lia";

const PeopleDetail = React.memo(() => {
  const navigate = useNavigate();
  const { info } = useSelector((state) => state.people);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncpeople(id));
    return () => {
      dispatch(removepeople());
    };
  }, [dispatch, id]);

  const handleNavigateBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  if (!info.detail && !info.externalid && !info.videos) {
    return <Loading />;
  }

  console.log(info);

  return (
    <div
      style={{
        background: `url(https://image.tmdb.org/t/p/original${info.detail.profile_path}) no-repeat center 40% / cover`,
      }}
      className="h-fit w-full"
    >
      <div
        className="text-white bg-[#000000a5] pb-[5vw] w-full"
        style={{ backdropFilter: "blur(20px)" }}
      >
        <nav className="py-6 px-8 items-center flex gap-6">
          <div
            onClick={handleNavigateBack}
            className="p-1 mr-8 text-xl bg-[#ffffff29] rounded-full hover:scale-95 hover:text-zinc-300 w-fit"
          >
            <IoMdArrowRoundBack />
          </div>

          {info.externalid.instagram_id && (
            <a
              target="_blank"
              href={`https://www.instagram.com/${info.externalid.instagram_id}/?__pwa=1`}
            >
              <BsInstagram className="text-lg hover:text-zinc-300" />
            </a>
          )}
          
          {info.externalid.facebook_id && (
            <a
              target="_blank"
              href={`https://www.facebook.com/${info.externalid.facebook_id}/`}
            >
              <FaFacebook className="text-lg hover:text-zinc-300" />
            </a>
          )}

          {info.externalid.imdb_id && (
            <a
              target="_blank"
              href={`https://www.imdb.com/name/${info.externalid.imdb_id}`}
            >
              <LiaImdb className="text-3xl hover:text-zinc-300" />
            </a>
          )}

          {info.externalid.wikidata_id && (
            <a
              target="_blank"
              href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
            >
              <FaWikipediaW className="text-xl hover:text-zinc-300" />
            </a>
          )}
        </nav>

        <div className="px-[10vw] pt-4">
          <h1 className="text-2xl text-white mb-2">{info.detail.name}</h1>
          <div className="py-2 text-zinc-300 flex items-center justify-between">
            <div className="flex gap-4">
              <h3 className="text-xs font-sans">
                {info.detail.known_for_department}
              </h3>
              <h3 className="text-xs font-sans">{info.detail.gender === 2 ? "Male" : "Female"}</h3>
              <h3 className="text-xs font-sans">{info.detail.birthday}</h3>
            </div>
            <div className="flex gap-3">
              <h3 className="text-xs font-sans flex items-center gap-1.5 bg-[#ffffff49] px-2.5 rounded-md text-white py-1">
                <FaStar className="text-[#FFD700]" />
                {info.detail.popularity.toFixed(1)}%
              </h3>
            </div>
          </div>
          <div className="flex  justify-between mt-2">
            <div className="h-[28vw] w-[25%] overflow-hidden rounded-lg">
              <img
                className="h-full w-full object-cover"
                src={`https://image.tmdb.org/t/p/original${info.detail.profile_path}`}
                alt=""
              />
            </div>
                <div className="h-[24.8vw] w-[72%]">
                <h3 className="text-xl mb-5">Biography</h3>
            <div className=" h-full w-full pr-6 overflow-y-auto">
                <p className="font-sans" >{info.detail.biography}</p>
            </div>
                </div>
          </div>

         <div className="mt-20">
          <h1 className="text-xl text-white mb-2" >Known for</h1>

         <Swiper spaceBetween={20} slidesPerView={5.2} className="mt-6" >
            {info.combinedcredits.cast.length > 0 ? (
              [...new Map(info.combinedcredits.cast.map(item => [item.id, item])).values()].map((item, index) =>
                item.poster_path ? (
                  <SwiperSlide key={index}>
                    <Link to={`/${item.media_type}/details/${item.id}`} className="">
                      <img
                        className=" rounded-lg"
                        src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                        alt=""
                      />
                      <div className="flex items-center justify-between pt-5  gap-3">
                        <span
                          className={` ${
                            item.vote_average < 5
                              ? "bg-[#eeb90c89]"
                              : "bg-[#0cee3989]"
                          } w-fit flex gap-1 items-center px-1.5 rounded-md text-xs py-0.5`}
                        >
                          <BiSolidStar />
                          {(item.vote_average == 0 &&
                            item.popularity.toFixed() / 10) ||
                            item.vote_average.toFixed(1)}
                        </span>
                        <span className="bg-[#ffffff40] w-fit flex gap-1 items-center px-1.5 rounded-md text-xs py-0.5">
                          <BsCalendarDateFill />
                          {item.first_air_date || item.release_date}
                        </span>
                      </div>
                    </Link>
                  </SwiperSlide>
                ) : null
              )
            ) : (
              [...new Map(info.combinedcredits.crew.map(item => [item.id, item])).values()].map((item, index) =>
                item.poster_path ? (
                  <SwiperSlide key={index}>
                    <Link to={`/${item.media_type}/details/${item.id}`} className="">
                      <img
                        className=" rounded-lg"
                        src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                        alt=""
                      />
                      <div className="flex items-center justify-between pt-5  gap-3">
                        <span
                          className={` ${
                            item.vote_average < 5
                              ? "bg-[#eeb90c89]"
                              : "bg-[#0cee3989]"
                          } w-fit flex gap-1 items-center px-1.5 rounded-md text-xs py-0.5`}
                        >
                          <BiSolidStar />
                          {(item.vote_average == 0 &&
                            item.popularity.toFixed() / 10) ||
                            item.vote_average.toFixed(1)}
                        </span>
                        <span className="bg-[#ffffff40] w-fit flex gap-1 items-center px-1.5 rounded-md text-xs py-0.5">
                          <BsCalendarDateFill />
                          {item.first_air_date || item.release_date}
                        </span>
                      </div>
                    </Link>
                  </SwiperSlide>
                ) : null
              )
            )}
          </Swiper>
         </div>
        </div>
      </div>
    </div>
  );
});

export default PeopleDetail;
