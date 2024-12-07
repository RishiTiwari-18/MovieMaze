import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import DropDown from './Partials/DropDown';
import TopNav from './Partials/TopNav';
import axios from '../Utils/axios';
import Cards from './Partials/Cards';
import { debounce } from 'lodash';
import InfiniteScroll from 'react-infinite-scroll-component';

const Trending = () => {
  document.title = "MovieMaze |  Trending"
  const [category, setCategory] = useState('all');
  const [duration, setDuration] = useState('day');
  const [trending, setTrending] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);


  const getTrending = useCallback(
    debounce(async () => {
      try {
        const { data } = await axios.get(`/trending/${category}/${duration}?page=${page}`);
        setTrending((prev) => (page === 1 ? data.results : [...prev, ...data.results]));
        setError(null);
      } catch (error) {
        console.error("Error fetching trending:", error);
        setError('Failed to fetch trending data.');
      }
    }, 300),
    [category, duration, page]
  );

  useEffect(() => {
    getTrending();
    return () => {
      getTrending.cancel();
    };
  }, [getTrending]);

  const memoizedTrending = useMemo(() => trending, [trending]);

  const navigate = useNavigate();

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setTrending([]);
    setPage(1);
  };

  const handleDurationChange = (newDuration) => {
    setDuration(newDuration);
    setTrending([]);
    setPage(1);
  };

  return (
    <div className="h-screen text-white w-screen">
      <div className="flex items-center px-10 py-3 mb-14 justify-between">
        <Link onClick={() => navigate(-1)} className="flex items-center gap-4">
          <FaArrowLeft />
          <h1 className="text-xl">Trending</h1>
        </Link>
        <TopNav />
        <div className="flex items-center gap-2">
          <DropDown title="Category" options={['tv', 'movie', 'all']} onChange={handleCategoryChange} />
          <DropDown title="Time" options={['day', 'week']} onChange={handleDurationChange} />
        </div>
      </div>

      {error && <div className="text-red-500">{error}</div>}
      <InfiniteScroll
        dataLength={trending.length}
        hasMore={true}
        next={() => setPage((prev) => prev + 1)}
        loader={<h1 className='text-2xl ml-32'>Loading...</h1>}
      >
        <Cards data={memoizedTrending} />
      </InfiniteScroll>
    </div>
  );
};

export default Trending;
