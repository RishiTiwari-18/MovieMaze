import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import DropDown from './Partials/DropDown';
import TopNav from './Partials/TopNav';
import axios from '../Utils/axios';
import Cards from './Partials/Cards';
import { debounce } from 'lodash';
import InfiniteScroll from 'react-infinite-scroll-component';

const TvShows = () => {
  document.title = 'MovieMaze | TV Shows';
  const [category, setCategory] = useState('popular');
  const [tvShows, setTvShows] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const getPopularTvShows = useCallback(
    debounce(async () => {
      try {
        const { data } = await axios.get(`/tv/${category}?page=${page}`);
        setTvShows((prev) => (page === 1 ? data.results : [...prev, ...data.results]));
        setError(null);
        setHasMore(data.results.length > 0);
      } catch (error) {
        console.error('Error fetching popular TV shows:', error);
        setError('Failed to fetch popular TV shows.');
        setHasMore(false);
      }
    }, 300),
    [page, category]
  );

  useEffect(() => {
    getPopularTvShows();
    return () => {
      getPopularTvShows.cancel();
    };
  }, [getPopularTvShows]);

  const memoizedTvShows = useMemo(() => tvShows, [tvShows]);

  const navigate = useNavigate();

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setPage(1);
  };

  console.log(getPopularTvShows);
  

  return tvShows.length > 0 ? (
    <div className="h-screen text-white w-screen">
      <div className="flex items-center px-10 py-3 mb-14 justify-between">
        <Link onClick={() => navigate(-1)} className="flex items-center gap-4">
          <FaArrowLeft />
          <h1 className="text-xl">TV Shows</h1>
        </Link>
        <TopNav />
        <div className="flex items-center gap-2">
          <DropDown title="Category" options={['popular', 'top_rated', 'airing_today', 'on_the_air']} onChange={handleCategoryChange} />
        </div>
      </div>

      {error && <div className="text-red-500">{error}</div>}
      <InfiniteScroll
        dataLength={tvShows.length}
        hasMore={hasMore}
        next={() => setPage((prev) => prev + 1)}
        loader={<h1 className="text-2xl ml-32">Loading...</h1>}
      >
        <Cards data={memoizedTvShows} />
      </InfiniteScroll>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default TvShows;