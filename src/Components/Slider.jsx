import React, { useEffect, useState } from 'react'
import GlobalApi from '../Services/GlobalApi';
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

function Slider() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    getTopRatedMovies();
    getGenresMovie();
  }, []);

  const getTopRatedMovies = () => {
    GlobalApi.getTopRated.then(res => {
      setMovies(res.data.results);
      console.log(res.data.results);
    });
  }

  const getGenresMovie = () => {
    GlobalApi.getGenres.then(res => {
      setGenres(res.data.genres);
    });
  }

  const initGenre = (genresIds) => {
    return genres.filter((genre) => genresIds.includes(genre.id));;
  }

  const handleScroll = (event) => {
    const index = Math.round(event.target.scrollLeft / event.target.clientWidth);
    setActiveIndex(index);
  };

  return (
    <div className="bg-secondary relative w-full mx-auto">
      <div
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none scroll-smooth"
        onScroll={handleScroll}
        style={{ scrollBehavior: "smooth" }}
      >
        {movies.map((movie) => {
          const year = movie.release_date.split('-')[0];
          return (
            <div
              key={movie.id}
            >
              <div className="flex justify-between text-white p-20 rounded-lg">
                <img
                  src={IMAGE_BASE_URL + movie.backdrop_path}
                  className="w-[243px] h-[364px] object-cover ml-10"
                />
                <div className="bg-black my-4 min-w-60 h-700 p-4 mr-20">
                  <span className="text-yellow-400 font-bold">★ {movie.vote_average}</span>
                  <p className="text-gray-400 text-ms">{year} • {initGenre(movie.genre_ids).map(data => data.name + " ")}</p>
                  <h2 className="text-lg font-semibold">{movie.title}</h2>
                  <p className='text-gray-400 text-xs pt-1 max-h-20 text-ellipsis'>{movie.overview}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Dots Navigation */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {movies.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-all ${activeIndex === index ? "bg-red-500 w-8" : "bg-gray-500"
              }`}
            onClick={() =>
              document
                .querySelector(".overflow-x-auto")
                .scrollTo({ left: index * window.innerWidth, behavior: "smooth" })
            }
          />
        ))}
      </div>
    </div>

  )
}

export default Slider
