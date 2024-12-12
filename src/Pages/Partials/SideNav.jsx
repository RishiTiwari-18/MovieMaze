import React, { useState } from 'react'
import { SiMediafire } from "react-icons/si";
import { Link } from 'react-router-dom';
import { FaStar, FaFilm, FaTv, } from 'react-icons/fa';
import { BsFire } from "react-icons/bs";
import { IoPeopleSharp } from "react-icons/io5";
import { PiInfoFill } from "react-icons/pi";
import { IoCall } from "react-icons/io5";

const SideNav = () => {
  const [onHover, setOnHover] = useState(null)
  const links = [
    { name: 'Trending', path: '/trending', icon: <BsFire/> },
    { name: 'Popular', path: '/popular', icon: <FaStar /> },
    { name: 'Movies', path: '/movie', icon: <FaFilm /> },
    { name: 'Tv Shows', path: '/tv', icon: <FaTv /> },
    { name: 'Peoples', path: '/peoples', icon: <IoPeopleSharp /> },
  ];

  return (
    <aside
    onMouseEnter={() => setOnHover(true)}
    onMouseLeave={() => setOnHover(false)}
    className={`h-full text-white px-3 py-6 transition-shadow z-50 duration-300 ${onHover ? "shadow-[35px_0_70px_rgba(1,1,1,1)]" : ""}`}>
        <h1 className='flex font-[font] relative tracking-tight text-lg items-center'>
        <SiMediafire className='text-primary tracking-tighter text-4xl'/>
        <span className={`absolute w-20 z-50 ease-linear duration-200 ${onHover ? "left-[125%] opacity-100" : "left-[0%] opacity-0"}`}>MovieMaze</span>
        </h1>    

        <nav className=' mt-12'>
            {links.map((link, index) => (
                <Link key={index} to={link.path} className='flex relative  hover:bg-opacity-30 hover:text-[#8a55cc] text-white text-lg px-4 py-5 rounded-md'>
                    <span className='flex-shrink-0'>{link.icon}</span>
                    <span className={`absolute w-20 h-full top-4 z-50 ease-linear duration-200 ${onHover ? "left-[120%] opacity-100 " : "left-[0%] opacity-0"}`}>
                    {link.name}
                    </span>
                </Link>
            ))}
        </nav>

       
    </aside>
  )
}

export default SideNav