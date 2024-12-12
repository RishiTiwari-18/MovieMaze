import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import DropDown from './Partials/DropDown';
import TopNav from './Partials/TopNav';
import axios from '../Utils/axios';
import Cards from './Partials/Cards';
import { debounce } from 'lodash';
import InfiniteScroll from 'react-infinite-scroll-component';

const Popular = () => {
    document.title = "MovieMaze |  Popular";
  const [category, setCategory] = useState('movie');
  const [trending, setTrending] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);


  const getPopular = useCallback(
    debounce(async () => {
      try {
        const { data } = await axios.get(`/${category}/popular?page=${page}`);
        setTrending((prev) => (page === 1 ? data.results : [...prev, ...data.results]));
        setError(null);
      } catch (error) {
        console.error("Error fetching popular:", error);
        setError('Failed to fetch popular data.');
      }
    }, 300),
    [category, page]
  );

  useEffect(() => {
    getPopular();
    return () => {
      getPopular.cancel();
    };
  }, [getPopular]);

  const memoizedTrending = useMemo(() => trending, [trending]);

  const navigate = useNavigate();

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setTrending([]);
    setPage(1);
  };

  return (
    <div className="h-screen text-white w-screen">
      <div className="flex items-center px-10 py-3 mb-14 justify-between">
        <Link onClick={() => navigate(-1)} className="flex items-center gap-4">
          <FaArrowLeft />
          <h1 className="text-xl">Popular</h1>
        </Link>
        <TopNav />
        <div className="flex items-center gap-2">
          <DropDown title="Category" options={['tv', 'movie']} onChange={handleCategoryChange} />
        </div>
      </div>

      {error && <div className="text-red-500">{error}</div>}
      <InfiniteScroll
        dataLength={trending.length}
        hasMore={true}
        next={() => setPage((prev) => prev + 1)}
        loader={<h1 className='text-2xl ml-32'>Loading...</h1>}
      >
        <Cards data={memoizedTrending} title={category}  />
      </InfiniteScroll>
    </div>
  );
};

export default Popular;