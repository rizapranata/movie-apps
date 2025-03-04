import React, { useEffect, useState } from 'react'
import GlobalApi from '../Services/GlobalApi';
import { Link } from "react-router-dom";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

function Discover() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    getDiscoverMovies();
    getGenresMovie();
  }, []);

  const getDiscoverMovies = () => {
    GlobalApi.getDiscover.then(res => {
      setMovies(res.data.results);
    })
  }

  const getGenresMovie = () => {
    GlobalApi.getGenres.then(res => {
      setGenres(res.data.genres);
    });
  }

  const initGenre = (genresIds) => {
    return genres.filter((genre) => genresIds.includes(genre.id));;
  }

  return (
    <div className="bg-primary text-white py-10 sm:px-5 md:px-[20px] sm:px-[20px] md:px-40 lg:px-50 xl:px-60">
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="w-20 h-1 bg-red-500 mt-1"></div>
          <h2 className="text-2xl font-semibold text-white">Discover Movies</h2>
        </div>

        <div className="flex space-x-2">
          <button className="bg-red-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
            Popularity
          </button>
          <button className="bg-gray-700 text-white px-4 py-1 rounded-full text-sm font-semibold">
            Release Date
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-8">
        {movies.map((movie) => {
          const year = movie.release_date.split('-')[0];
          return (
            <Link key={movie.id} to={`/movie/${movie.id}`} className="relative group cursor-pointer">
              <img
                src={IMAGE_BASE_URL + movie.backdrop_path}
                className="shadow-md lg:w-full h-[350px] object-cover"
              />

              <span className="absolute top-0 right-0 bg-green-600 text-xs font-bold text-white px-2 py-1">
                {movie.vote_average}
              </span>

              <div className="absolute inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-yellow-400 text-lg font-bold flex items-center">
                  ★ {movie.vote_average}
                </span>
                <p className="text-gray-300 text-sm mt-1">{initGenre(movie.genre_ids).map(data => data.name).join(", ")}</p>
                <button
                  className="mt-3 bg-red-500 text-white px-4 py-1 rounded-full text-sm font-semibold"
                  onClick={(e) => e.preventDefault()} // Hindari reload saat klik tombol
                >
                  VIEW
                </button>
              </div>

              <div className="mt-2">
                <h3 className="text-base font-semibold">{movie.title}</h3>
                <p className="text-gray-400 text-sm">{year}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Discover
