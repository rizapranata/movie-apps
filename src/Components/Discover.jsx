import React, { useEffect, useState } from 'react'
import GlobalApi from '../Services/GlobalApi';
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

function Discover() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getDiscoverMovies();
  }, []);

  const getDiscoverMovies = () => {
    GlobalApi.getDiscover.then(res => {
      setMovies(res.data.results);
      console.log(res.data.results);
    })
  }

  return (
    <div className="bg-primary text-white py-10 sm:px-5 md:px-[20px] mx:px-[20px] ms:px-30 ms:px-40 lg:px-60">
      <h2 className="text-2xl font-semibold mb-6 border-l-4 border-red-500 pl-4">
        Discover Movies
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {movies.map((movie) => {
          const year = movie.release_date.split('-')[0];          
          return (
            <div key={movie.id} className="relative">
              <img
                src={IMAGE_BASE_URL + movie.backdrop_path}
                className="shadow-md w-[220px] h-[330px] object-cover"
              />

              <span className="absolute top-0 md:right-12 bg-green-600 text-xs font-bold text-white px-2 py-1">
                {movie.vote_average}
              </span>

              <div className="mt-2">
                <h3 className="text-sm font-semibold">{movie.title}</h3>
                <p className="text-gray-400 text-xs">{year}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default Discover
