import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { asyncMovie, removeMovie } from '../Store/Actions/movieAction';
import { IoMdArrowRoundBack } from "react-icons/io";
import { LiaImdb } from "react-icons/lia";
import { FaWikipediaW } from "react-icons/fa";
import { PiGlobeSimple } from "react-icons/pi";


const MovieDetails = () => {
  const navigate = useNavigate()

  const {id} = useParams();
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(asyncMovie(id));
    
    return () => {
      dispatch(removeMovie());
    }
  }, [dispatch, id]);

  return (
    <div className='h-screen w-screen text-white'>
      <nav className='py-6 px-8'>
        <div onClick={() => navigate(-1)} className=" p-1  text-xl items-center flex gap-6 w-fit">
          <IoMdArrowRoundBack  className='mr-8' />
          <LiaImdb className='text-2xl' />
          <FaWikipediaW className='text-2xl' />
          <PiGlobeSimple className='text-2xl' />
        </div>
      </nav>
    </div>
  )
}

export default MovieDetails